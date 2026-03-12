import { Metadata } from 'next';
import InvestirContent from './InvestirContent';

export const metadata: Metadata = {
  title: 'Investir au Gabon | GABON BIZ',
  description: 'Découvrez les opportunités d\'investissement au Gabon, le cadre légal et les incitations fiscales.',
};

export default function InvestirPage() {
  return <InvestirContent />;
}
