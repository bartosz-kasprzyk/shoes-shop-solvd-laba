'use server';

import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/nextauth/authOptions';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function getUserTransactions() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Not authenticated');

  const strapiUserId = session.user.id;

  const transactions = await stripe.paymentIntents.search({
    limit: 50,
    query: `metadata['strapiUserId']:'${strapiUserId}' AND status:'succeeded'`,
  });

  return transactions.data;
}
