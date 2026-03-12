import { Metadata } from 'next';
import MarchesPublicsContent from './MarchesPublicsContent';

export const metadata: Metadata = {
  title: 'Marchés Publics Numériques | GABON BIZ',
  description: 'Accédez à tous les appels d\'offres publics du Gabon. Soumettez vos offres en ligne, en toute transparence et sécurité.',
};

export default function MarchesPublicsPage() {
  return <MarchesPublicsContent />;
}
