// proxy.ts
// Middleware para Next.js 16 (renombrado de middleware.ts a proxy.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get('cip_session')?.value;
  const { pathname } = request.nextUrl;

  // Proteger la ruta del Dashboard
  if (pathname.startsWith('/portal/dashboard')) {
    if (!sessionToken) {
      // Si no hay token de sesión, redirigir al login
      const loginUrl = new URL('/portal', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Decodificar los datos del token usando atob (seguro en runtime de Edge)
      const parts = sessionToken.split('.');
      if (parts.length !== 2) {
        throw new Error('Token inválido');
      }

      const base64Data = parts[0];
      const decodedJson = atob(base64Data);
      const session = JSON.parse(decodedJson);

      // Comprobar expiración
      if (session.exp && Date.now() > session.exp) {
        throw new Error('Token expirado');
      }

      // El token es correcto. Pasar al siguiente middleware / render de página.
      return NextResponse.next();
    } catch (err) {
      console.warn('Sesión inválida detectada en proxy:', err);
      // Limpiar cookie corrupta y redirigir
      const response = NextResponse.redirect(new URL('/portal', request.url));
      response.cookies.delete('cip_session');
      return response;
    }
  }

  // Redirigir al dashboard si ya está autenticado e intenta ir al login
  if (pathname === '/portal' && sessionToken) {
    try {
      const parts = sessionToken.split('.');
      if (parts.length === 2) {
        const session = JSON.parse(atob(parts[0]));
        if (session.exp && Date.now() < session.exp) {
          return NextResponse.redirect(new URL('/portal/dashboard', request.url));
        }
      }
    } catch (err) {
      // Continuar normal si el token está roto
    }
  }

  return NextResponse.next();
}

export const config = {
  // Proteger el login y todas las sub-rutas de dashboard
  matcher: ['/portal', '/portal/dashboard/:path*'],
};
