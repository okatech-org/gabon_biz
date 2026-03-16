// ─── Conversation Export ─────────────────────────────────────────
// Export chat history as downloadable text or markdown files.

import type { StoredMessage } from './conversation-store';

/**
 * Export conversation as a formatted text file.
 */
export function exportAsText(messages: StoredMessage[], page: string = '/'): void {
  const header = [
    '═══════════════════════════════════════════════',
    '  GABON BIZ — Conversation avec iAsted',
    `  Date : ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
    `  Heure : ${new Date().toLocaleTimeString('fr-FR')}`,
    `  Page : ${page}`,
    `  Messages : ${messages.length}`,
    '═══════════════════════════════════════════════',
    '',
  ].join('\n');

  const body = messages
    .map((m) => {
      const time = new Date(m.timestamp).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      const sender = m.role === 'user' ? '👤 Vous' : '🤖 iAsted';
      // Strip emojis from mic prefix for cleaner export
      const content = m.content.replace(/^🎙️\s*/, '');
      return `[${time}] ${sender} :\n${content}\n`;
    })
    .join('\n');

  const footer =
    '\n───────────────────────────────────────────────\nExporté depuis GABON BIZ — gabon-biz.web.app\n';

  downloadFile(`conversation-iasted-${formatDate()}.txt`, header + body + footer, 'text/plain');
}

/**
 * Export conversation as a markdown file.
 */
export function exportAsMarkdown(messages: StoredMessage[], page: string = '/'): void {
  const header = [
    '# 💬 Conversation avec iAsted',
    '',
    `> **Date** : ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
    `> **Page** : \`${page}\``,
    `> **Messages** : ${messages.length}`,
    '',
    '---',
    '',
  ].join('\n');

  const body = messages
    .map((m) => {
      const time = new Date(m.timestamp).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      const sender = m.role === 'user' ? '**👤 Vous**' : '**🤖 iAsted**';
      const content = m.content.replace(/^🎙️\s*/, '');
      return `### ${sender} — ${time}\n\n${content}\n`;
    })
    .join('\n---\n\n');

  const footer = '\n---\n\n*Exporté depuis [GABON BIZ](https://gabon-biz.web.app)*\n';

  downloadFile(`conversation-iasted-${formatDate()}.md`, header + body + footer, 'text/markdown');
}

function formatDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function downloadFile(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
