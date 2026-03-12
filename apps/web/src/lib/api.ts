// GABON BIZ — Centralized API Service
// Handles all backend communication

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

async function api<T = any>(path: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Erreur réseau' }));
    throw new Error(error.message || `Erreur ${res.status}`);
  }

  return res.json();
}

// ============================================
// M1 — Entreprises
// ============================================
export const entreprisesApi = {
  list: (params?: Record<string, string>) =>
    api(`/api/entreprises?${new URLSearchParams(params || {})}`),
  create: (data: any) =>
    api('/api/entreprises', { method: 'POST', body: data }),
  get: (id: string) =>
    api(`/api/entreprises/${id}`),
  update: (id: string, data: any) =>
    api(`/api/entreprises/${id}`, { method: 'PUT', body: data }),
  stats: () =>
    api('/api/entreprises/stats'),
  myEntreprises: () =>
    api('/api/entreprises/mes-entreprises'),
};

// ============================================
// M2 — Marchés Publics
// ============================================
export const marchesApi = {
  list: (params?: Record<string, string>) =>
    api(`/api/marches?${new URLSearchParams(params || {})}`),
  ouverts: () =>
    api('/api/marches/ouverts'),
  get: (id: string) =>
    api(`/api/marches/${id}`),
  stats: () =>
    api('/api/marches/stats'),
};

export const soumissionsApi = {
  submit: (data: any) =>
    api('/api/soumissions', { method: 'POST', body: data }),
  maListe: () =>
    api('/api/soumissions/mes-soumissions'),
  get: (id: string) =>
    api(`/api/soumissions/${id}`),
};

// ============================================
// M3 — Innovation Hub
// ============================================
export const solutionsApi = {
  list: (params?: Record<string, string>) =>
    api(`/api/solutions?${new URLSearchParams(params || {})}`),
  get: (id: string) =>
    api(`/api/solutions/${id}`),
  rate: (id: string, score: number, comment?: string) =>
    api(`/api/solutions/${id}/rate`, { method: 'POST', body: { score, comment } }),
};

// ============================================
// M4 — Incubateur
// ============================================
export const cohortesApi = {
  list: () =>
    api('/api/cohortes'),
  get: (id: string) =>
    api(`/api/cohortes/${id}`),
  postuler: (id: string) =>
    api(`/api/cohortes/${id}/postuler`, { method: 'POST' }),
};

// ============================================
// M5 — Investir
// ============================================
export const investisseursApi = {
  list: (params?: Record<string, string>) =>
    api(`/api/investisseurs?${new URLSearchParams(params || {})}`),
  get: (id: string) =>
    api(`/api/investisseurs/${id}`),
  matching: (id: string) =>
    api(`/api/investisseurs/${id}/matching`),
  stats: () =>
    api('/api/investisseurs/stats'),
};

// ============================================
// M6 — Observatoire
// ============================================
export const indicateursApi = {
  list: (params?: Record<string, string>) =>
    api(`/api/indicateurs?${new URLSearchParams(params || {})}`),
  dashboard: () =>
    api('/api/indicateurs/dashboard'),
};

// ============================================
// M7 — Filières
// ============================================
export const filieresApi = {
  list: () =>
    api('/api/filieres'),
  get: (id: string) =>
    api(`/api/filieres/${id}`),
  stats: () =>
    api('/api/filieres/stats'),
};

// ============================================
// Transversal
// ============================================
export const notificationsApi = {
  list: (params?: Record<string, string>) =>
    api(`/api/notifications?${new URLSearchParams(params || {})}`),
  markRead: (id: string) =>
    api(`/api/notifications/${id}/read`, { method: 'PATCH' }),
  markAllRead: () =>
    api('/api/notifications/read-all', { method: 'PATCH' }),
  unreadCount: () =>
    api('/api/notifications/unread-count'),
};

export const messagerieApi = {
  conversations: () =>
    api('/api/messages/conversations'),
  thread: (threadId: string) =>
    api(`/api/messages/thread/${threadId}`),
  send: (data: { recipientNip: string; content: string }) =>
    api('/api/messages', { method: 'POST', body: data }),
};

export default api;
