import { NextResponse } from 'next/server';
import { getAuthenticatedUserId } from './auth';
import { connectWalletDB } from '../utils/db';
import WalletModel from '../models/WalletModel';
import { validateDeductAmount } from '../utils/walletHelpers';

/**
 * POST /api/wallet/deduct-funds
 * @param {import('next/server').NextRequest} req
 * @returns {Promise<import('next/server').NextResponse>}
 */
export async function deductFunds(req) {
  try {
    const userId = getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const amount = Number(body?.amount);
    const contentId = body?.contentId ? String(body.contentId) : null;

    const validation = validateDeductAmount(amount);
    if (!validation.valid) {
      return NextResponse.json({ message: validation.message }, { status: 400 });
    }

    await connectWalletDB();

    const transaction = {
      amount,
      type: 'debit',
      status: 'success',
      referenceId: contentId,
      createdAt: new Date()
    };

    const updatedWallet = await WalletModel.findOneAndUpdate(
      {
        userId,
        balance: { $gte: amount }
      },
      {
        $inc: { balance: -amount },
        $push: { transactions: transaction },
        $set: { updatedAt: new Date() }
      },
      { new: true }
    ).lean();

    if (!updatedWallet) {
      return NextResponse.json(
        { message: 'Insufficient wallet balance. Please add funds.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        unlocked: true,
        balance: updatedWallet.balance,
        transaction
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: 'Unable to deduct funds right now.' },
      { status: 500 }
    );
  }
}
