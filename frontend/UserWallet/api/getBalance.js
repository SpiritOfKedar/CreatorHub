import { NextResponse } from 'next/server';
import { getAuthenticatedUserId } from './auth';
import { connectWalletDB } from '../utils/db';
import WalletModel from '../models/WalletModel';
import { sortTransactionsByLatest } from '../utils/walletHelpers';

/**
 * GET /api/wallet/balance
 * @param {import('next/server').NextRequest} req
 * @returns {Promise<import('next/server').NextResponse>}
 */
export async function getBalance(req) {
  try {
    const userId = getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectWalletDB();

    const wallet = await WalletModel.findOne({ userId }).lean();

    if (!wallet) {
      return NextResponse.json(
        { balance: 0, transactions: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        balance: wallet.balance,
        transactions: sortTransactionsByLatest(wallet.transactions || [])
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong while fetching wallet balance.' },
      { status: 500 }
    );
  }
}
