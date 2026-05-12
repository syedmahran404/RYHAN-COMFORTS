import type { Metadata } from 'next';
import { SOFA_PROTOTYPE } from '@/lib/data/catalog';
import { ConfiguratorShell } from '@/features/configurator/ConfiguratorShell';

export const metadata: Metadata = {
  title: 'Sofa Configurator',
  description:
    'Design your bespoke sofa in real time — fabric, colour, foam density, seating and silhouette, with live pricing.'
};

export default function SofaConfiguratorPage() {
  return <ConfiguratorShell product={SOFA_PROTOTYPE} />;
}
