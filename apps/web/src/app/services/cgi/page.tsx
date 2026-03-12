import { Metadata } from 'next';
import CGIContent from './CGIContent';

export const metadata: Metadata = {
  title: "Centre Gabonais de l'Innovation (CGI) | GABON BIZ",
  description: "Découvrez le CGI : acculturation digitale, certifications internationales (UIT, SADA), FabLab, MediaLab. Le pivot de l'innovation numérique au Gabon.",
};

export default function CGIServicePage() {
  return <CGIContent />;
}
