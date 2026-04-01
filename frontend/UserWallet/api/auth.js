import jwt from 'jsonwebtoken';

/**
 * Reads user id from bearer token or cookie token.
 * @param {import('next/server').NextRequest} req
 * @returns {string | null}
 */
export function getAuthenticatedUserId(req) {
  try {
    const authHeader = req.headers.get('authorization');
    const bearerToken = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    const cookieToken = req.cookies.get('token')?.value || null;
    const token = bearerToken || cookieToken;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    return decoded?.id || null;
  } catch {
    return null;
  }
}
