import Stripe from 'stripe';

export const handler = async (event: any) => {
  // 1. Validar Método
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  // 2. Validar Chave do Stripe
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('MISSING_STRIPE_KEY: Configure STRIPE_SECRET_KEY in Netlify Environment Variables.');
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Stripe configuration missing on server. Please add STRIPE_SECRET_KEY to Netlify.' }) 
    };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });

  try {
    if (!event.body) throw new Error('Empty request body');
    const { items } = JSON.parse(event.body);

    if (!items || !Array.isArray(items)) {
      throw new Error('Invalid items array in request');
    }

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title || 'Digital Asset',
          description: item.description || 'Premium Digital Content',
          images: [item.image?.startsWith('http') ? item.image : `https://joshsegatt.com${item.image}`],
        },
        unit_amount: Math.round((item.priceValue || 0) * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `https://joshsegatt.com/store?success=true`,
      cancel_url: `https://joshsegatt.com/store?canceled=true`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err: any) {
    console.error('Stripe Error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Server Error: ${err.message}` }),
    };
  }
};
