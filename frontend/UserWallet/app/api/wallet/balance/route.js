import { getBalance } from '../../../../api/getBalance';

/**
 * Route handler for wallet balance.
 * @param {import('next/server').NextRequest} req
 */
export async function GET(req) {
  return getBalance(req);
}
