import { Metadata } from 'next';
import IncubateurContent from './IncubateurContent';

export const metadata: Metadata = {
  title: 'Incubateur SING 2.0 | GABON BIZ',
  description: 'Programmes d\'accompagnement sur mesure pour transformer vos idées en entreprises à succès.',
};

export default function IncubateurPage() {
  return <IncubateurContent />;
}
