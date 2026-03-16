// ─── Server-side Knowledge Store ─────────────────────────────────
// Logs interactions for analytics and learning.
// Stored in a JSON file on the server for simplicity (would use a database in production).

import fs from 'fs';
import path from 'path';

const KNOWLEDGE_DIR = path.join(process.cwd(), '.iasted-knowledge');
const INTERACTIONS_FILE = path.join(KNOWLEDGE_DIR, 'interactions.jsonl');
const ANALYTICS_FILE = path.join(KNOWLEDGE_DIR, 'analytics.json');

// Ensure directory exists
function ensureDir() {
  if (!fs.existsSync(KNOWLEDGE_DIR)) {
    fs.mkdirSync(KNOWLEDGE_DIR, { recursive: true });
  }
}

export interface InteractionLog {
  timestamp: string;
  sessionId: string;
  userMessage: string;
  agentResponse: string;
  page: string;
  lang: string;
  functionsCalled: string[];
  feedback?: 'up' | 'down';
  responseTimeMs?: number;
}

export interface AnalyticsData {
  totalInteractions: number;
  topQuestions: { question: string; count: number }[];
  topPages: { page: string; count: number }[];
  topFunctions: { name: string; count: number }[];
  feedbackStats: { up: number; down: number; total: number };
  languageDistribution: Record<string, number>;
  hourlyDistribution: number[]; // 24 hours
  lastUpdated: string;
}

/**
 * Log a single interaction (append to JSONL file).
 */
export function logInteraction(interaction: InteractionLog): void {
  try {
    ensureDir();
    const line = JSON.stringify(interaction) + '\n';
    fs.appendFileSync(INTERACTIONS_FILE, line, 'utf-8');
    // Update analytics asynchronously (don't block response)
    setImmediate(() => updateAnalytics(interaction));
  } catch (err) {
    console.error('[iAsted] [knowledge] Failed to log interaction:', err);
  }
}

/**
 * Get current analytics data.
 */
export function getAnalytics(): AnalyticsData {
  try {
    ensureDir();
    if (fs.existsSync(ANALYTICS_FILE)) {
      return JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf-8'));
    }
  } catch {
    // ignore
  }
  return {
    totalInteractions: 0,
    topQuestions: [],
    topPages: [],
    topFunctions: [],
    feedbackStats: { up: 0, down: 0, total: 0 },
    languageDistribution: {},
    hourlyDistribution: new Array(24).fill(0),
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Get recent interactions (for context injection).
 */
export function getRecentInteractions(limit: number = 50): InteractionLog[] {
  try {
    ensureDir();
    if (!fs.existsSync(INTERACTIONS_FILE)) return [];
    const lines = fs.readFileSync(INTERACTIONS_FILE, 'utf-8').split('\n').filter(Boolean);
    return lines
      .slice(-limit)
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean) as InteractionLog[];
  } catch {
    return [];
  }
}

/**
 * Get frequently asked questions (for learning).
 */
export function getFrequentQuestions(limit: number = 10): { question: string; count: number }[] {
  const analytics = getAnalytics();
  return analytics.topQuestions.slice(0, limit);
}

/**
 * Update analytics incrementally.
 */
function updateAnalytics(interaction: InteractionLog): void {
  try {
    const analytics = getAnalytics();

    analytics.totalInteractions++;
    analytics.lastUpdated = new Date().toISOString();

    // Normalize question for grouping
    const normalizedQ = interaction.userMessage
      .toLowerCase()
      .replace(/[?!.,;:]/g, '')
      .trim()
      .slice(0, 100);

    if (normalizedQ.length > 5) {
      const existing = analytics.topQuestions.find((q) => q.question === normalizedQ);
      if (existing) {
        existing.count++;
      } else {
        analytics.topQuestions.push({ question: normalizedQ, count: 1 });
      }
      // Sort and keep top 50
      analytics.topQuestions.sort((a, b) => b.count - a.count);
      analytics.topQuestions = analytics.topQuestions.slice(0, 50);
    }

    // Pages
    if (interaction.page) {
      const existingPage = analytics.topPages.find((p) => p.page === interaction.page);
      if (existingPage) existingPage.count++;
      else analytics.topPages.push({ page: interaction.page, count: 1 });
      analytics.topPages.sort((a, b) => b.count - a.count);
      analytics.topPages = analytics.topPages.slice(0, 20);
    }

    // Functions
    for (const fn of interaction.functionsCalled) {
      const existingFn = analytics.topFunctions.find((f) => f.name === fn);
      if (existingFn) existingFn.count++;
      else analytics.topFunctions.push({ name: fn, count: 1 });
    }
    analytics.topFunctions.sort((a, b) => b.count - a.count);

    // Feedback
    if (interaction.feedback === 'up') analytics.feedbackStats.up++;
    if (interaction.feedback === 'down') analytics.feedbackStats.down++;
    analytics.feedbackStats.total++;

    // Language
    const lang = interaction.lang || 'fr';
    analytics.languageDistribution[lang] = (analytics.languageDistribution[lang] || 0) + 1;

    // Hourly distribution
    const hour = new Date(interaction.timestamp).getHours();
    if (hour >= 0 && hour < 24) analytics.hourlyDistribution[hour]++;

    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(analytics, null, 2), 'utf-8');
  } catch (err) {
    console.error('[iAsted] [knowledge] Failed to update analytics:', err);
  }
}
