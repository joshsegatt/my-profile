import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const { items } = req.body;

      // Map cart items to Stripe line items
      const line_items = items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            description: item.description,
            images: [item.image.startsWith('http') ? item.image : `https://seusite.com${item.image}`],
          },
          unit_amount: Math.round(item.priceValue * 100), // Stripe uses cents
        },
        quantity: 1,
      }));

      // Create Checkout Sessions from body params
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'], // Add 'google_pay', 'apple_pay' in Stripe Dashboard
        line_items,
        mode: 'payment',
        success_url: `${req.headers.origin}/store?success=true`,
        cancel_url: `${req.headers.origin}/store?canceled=true`,
        // Automatically collect email for delivery
        customer_creation: 'always',
      });

      res.status(200).json({ url: session.url });
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
