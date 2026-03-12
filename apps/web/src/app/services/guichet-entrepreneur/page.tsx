import { Metadata } from 'next';
import GuichetEntrepreneurContent from './GuichetEntrepreneurContent';

export const metadata: Metadata = {
  title: 'Guichet Unique Entrepreneur | GABON BIZ',
  description: 'Créez votre entreprise au Gabon en 48h, 100% en ligne. Obtenez votre RCCM et NIF automatiquement.',
};

export default function GuichetEntrepreneurPage() {
  return <GuichetEntrepreneurContent />;
}
