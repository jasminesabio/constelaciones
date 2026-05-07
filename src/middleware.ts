import { defineMiddleware } from 'astro:middleware';
import crypto from 'crypto';

const PASSWORD = import.meta.env.CONSTELACIONES_PASSWORD || 'mexicocity';
const COOKIE_SECRET = 'constelaciones-secret-key'; // In production, use a strong secret from env

function hashPassword(password: string): string {
  return crypto
    .createHash('sha256')
    .update(password + COOKIE_SECRET)
    .digest('hex');
}

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // Allow /login without authentication
  if (pathname === '/login') {
    return next();
  }

  // Check for auth cookie
  const cookies = context.request.headers.get('cookie') || '';
  const cookieMatch = cookies.match(/constelaciones_auth=([^;]+)/);
  const tokenFromCookie = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
  const expectedToken = hashPassword(PASSWORD);

  if (tokenFromCookie === expectedToken) {
    // Auth is valid, proceed
    return next();
  }

  // Not authenticated, redirect to login
  return context.redirect('/login');
});
