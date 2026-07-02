// app/portal/page.tsx
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import LoginView from '@/views/portal/LoginView';

export const metadata = {
  title: 'Acceso Portal Clínico | CIP',
  description: 'Inicia sesión en la plataforma digital de Clínica Integral del Peso.',
};

export default async function PortalPage() {
  const session = await getSession();

  // Si ya tiene sesión activa, redirigir directo al dashboard
  if (session) {
    redirect('/portal/dashboard');
  }

  return <LoginView />;
}
