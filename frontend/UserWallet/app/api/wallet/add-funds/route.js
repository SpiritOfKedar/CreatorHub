import { addFunds } from '../../../../api/addFunds';

/**
 * Route handler for adding funds.
 * @param {import('next/server').NextRequest} req
 */
export async function POST(req) {
  return addFunds(req);
}
