import { Resend } from 'resend';
import Stripe from 'stripe';

const resend = new Resend(process.env.RESEND_API_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export const config = {
  api: {
    bodyParser: false, // Necessário para validar o webhook do Stripe
  },
};

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (!sig || !webhookSecret) throw new Error('Missing signature or webhook secret');
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const customerEmail = session.customer_details?.email;

    if (customerEmail) {
      const domain = 'https://joshsegatt.com';
      const htmlBody = `
        <div style="background: #000; color: #fff; padding: 40px; font-family: sans-serif; border-radius: 20px;">
          <h1 style="color: #FFC107; font-style: italic;">STACK DEPLOYED</h1>
          <p>Your proprietary assets are ready for immediate deployment.</p>
          <div style="margin-top: 30px;">
            <a href="${domain}/assets/delivery/v177_optimizer.ps1" style="display: block; background: #FFC107; color: #000; padding: 15px; text-decoration: none; font-weight: bold; margin-bottom: 10px; border-radius: 10px; text-align: center;">DOWNLOAD V177 OPTIMIZER</a>
            <a href="${domain}/assets/delivery/prompt_bible.md" style="display: block; background: #fff; color: #000; padding: 15px; text-decoration: none; font-weight: bold; margin-bottom: 10px; border-radius: 10px; text-align: center;">DOWNLOAD PROMPT BIBLE</a>
          </div>
        </div>
      `;

      try {
        await resend.emails.send({
          from: 'Josh Segatt <noreply@joshsegatt.com>',
          to: customerEmail,
          subject: 'ACCESS GRANTED: Your Elite Digital Assets',
          html: htmlBody,
        });
        console.log('Fulfillment email sent to:', customerEmail);
      } catch (emailErr: any) {
        console.error('Email Error:', emailErr.message);
      }
    }
  }

  return res.status(200).json({ received: true });
}
