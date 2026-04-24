import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid items array' });
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

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Error:', err.message);
    return res.status(500).json({ error: `Server Error: ${err.message}` });
  }
}
