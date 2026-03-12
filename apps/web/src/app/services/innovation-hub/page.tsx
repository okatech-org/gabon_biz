import { Metadata } from 'next';
import InnovationHubContent from './InnovationHubContent';

export const metadata: Metadata = {
  title: 'Innovation Hub KIMBA 2.0 | GABON BIZ',
  description: 'Découvrez des solutions tech locales, connectez-vous avec les startups et stimulez l\'innovation.',
};

export default function InnovationHubPage() {
  return <InnovationHubContent />;
}
