import { deductFunds } from '../../../../api/deductFunds';

/**
 * Route handler for deducting funds.
 * @param {import('next/server').NextRequest} req
 */
export async function POST(req) {
  return deductFunds(req);
}
