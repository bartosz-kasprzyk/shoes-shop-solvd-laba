import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const { amount, strapiUserId, cartId } = await request.json();
  try {
    const idempotencyKey = `${strapiUserId}-${amount}-${cartId}`;
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount,
        currency: 'usd',
        metadata: {
          strapiUserId,
          cartId,
        },
      },
      { idempotencyKey },
    );
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Internal Error:', error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 },
    );
  }
}
