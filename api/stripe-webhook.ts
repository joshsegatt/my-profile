import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

// INSTRUCTIONS:
// 1. Install dependencies: npm install resend stripe
// 2. Set environment variables in Vercel: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, RESEND_API_KEY

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const event = req.body;

    // We only care about successful checkouts
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email;
      
      if (customerEmail) {
        try {
          // Load the elite template we just created
          // Note: In production, you might want to use a string or a more robust path
          const templatePath = path.join(process.cwd(), 'public', 'assets', 'delivery', 'email_template.html');
          let htmlContent = fs.readFileSync(templatePath, 'utf8');

          // Replace placeholders with real links (your domain)
          const domain = 'https://seusite.com';
          htmlContent = htmlContent
            .replace('{{DOWNLOAD_LINK_1}}', `${domain}/assets/delivery/v177_optimizer.ps1`)
            .replace('{{DOWNLOAD_LINK_2}}', `${domain}/assets/delivery/prompt_bible.md`)
            .replace('{{DOWNLOAD_LINK_3}}', `${domain}/assets/delivery/wallpapers/wallpaper_01.png`);

          // Execute delivery protocol
          await resend.emails.send({
            from: 'Josh Segatt <vault@seusite.com>',
            to: customerEmail,
            subject: 'PROPRIETARY ASSETS DEPLOYED - Action Required',
            html: htmlContent,
          });

          console.log(`Success: Delivery email sent to ${customerEmail}`);
        } catch (error) {
          console.error('Delivery Error:', error);
        }
      }
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
