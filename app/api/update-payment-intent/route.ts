import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const {
      amount,
      strapiUserId,
      personalInfo,
      shippingInfo,
      orderId,
      cart,
      paymentIntentId,
    } = await request.json();

    const searchResult = await stripe.customers.search({
      query: `metadata["strapiUserId"]:'${strapiUserId}'`,
    });
    console.log('update', searchResult.data);

    let customerId: string;
    if (searchResult.data.length > 0) {
      customerId = searchResult.data[0].id;

      await stripe.customers.update(customerId, {
        email: personalInfo?.email,
        name: `${personalInfo?.name ?? ''} ${personalInfo?.surname ?? ''}`.trim(),
        phone: personalInfo?.phoneNumber,
        address: {
          line1: shippingInfo?.address,
          city: shippingInfo?.city,
          postal_code: shippingInfo?.zipCode,
          state: shippingInfo?.state,
          country: shippingInfo?.country,
        },
      });
    } else {
      const newCustomer = await stripe.customers.create({
        email: personalInfo?.email,
        name: `${personalInfo?.name ?? ''} ${personalInfo?.surname ?? ''}`.trim(),
        phone: personalInfo?.phoneNumber,
        address: {
          line1: shippingInfo?.address,
          city: shippingInfo?.city,
          postal_code: shippingInfo?.zipCode,
          state: shippingInfo?.state,
          country: shippingInfo?.country,
        },
        metadata: { strapiUserId },
      });
      customerId = newCustomer.id;
    }

    let paymentIntent;

    if (paymentIntentId) {
      paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
        amount,
        customer: customerId,
        metadata: {
          strapiUserId,
          orderId,
          cart,
          name: personalInfo?.name,
          surname: personalInfo?.surname,
          email: personalInfo?.email,
          phone: personalInfo?.phoneNumber,
          address: shippingInfo?.address,
          city: shippingInfo?.city,
          zip: shippingInfo?.zipCode,
          state: shippingInfo?.state,
          country: shippingInfo?.country,
        },
        shipping: {
          name: `${personalInfo?.name ?? ''} ${personalInfo?.surname ?? ''}`.trim(),
          phone: personalInfo?.phoneNumber,
          address: {
            line1: shippingInfo?.address,
            city: shippingInfo?.city,
            postal_code: shippingInfo?.zipCode,
            state: shippingInfo?.state,
            country: shippingInfo?.country,
          },
        },
      });
    } else {
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        customer: customerId,
        metadata: {
          strapiUserId,
          orderId,
          cart,
          name: personalInfo?.name,
          surname: personalInfo?.surname,
          email: personalInfo?.email,
          phone: personalInfo?.phoneNumber,
          address: shippingInfo?.address,
          city: shippingInfo?.city,
          zip: shippingInfo?.zipCode,
          state: shippingInfo?.state,
          country: shippingInfo?.country,
        },
        shipping: {
          name: `${personalInfo?.name ?? ''} ${personalInfo?.surname ?? ''}`.trim(),
          phone: personalInfo?.phoneNumber,
          address: {
            line1: shippingInfo?.address,
            city: shippingInfo?.city,
            postal_code: shippingInfo?.zipCode,
            state: shippingInfo?.state,
            country: shippingInfo?.country,
          },
        },
      });
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (error) {
    console.error('Internal Error:', error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
