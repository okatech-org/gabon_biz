// GABON BIZ — Demo Page (Server Component for metadata)

import type { Metadata } from 'next';
import DemoPageContent from './DemoPageContent';

export const metadata: Metadata = {
  title: 'Démonstration | GABON BIZ — Explorez la plateforme',
  description: 'Testez GABON BIZ gratuitement avec des comptes de démonstration. 10 profils disponibles : entrepreneur, startup, investisseur, agent public et plus.',
  openGraph: {
    title: 'Essayez GABON BIZ — Mode Démonstration',
    description: "10 profils de démonstration pour explorer l'écosystème économique numérique du Gabon.",
    type: 'website',
  },
};

export default function DemoPage() {
  return <DemoPageContent />;
}
