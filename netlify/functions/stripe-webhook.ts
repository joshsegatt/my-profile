import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const stripeEvent = JSON.parse(event.body);

    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object;
      const customerEmail = session.customer_details?.email;
      
      if (customerEmail) {
        // Envio de e-mail (O template deve estar acessível no servidor ou ser embutido como string)
        const domain = 'https://joshsegatt.com';
        
        // Versão string do template para garantir que o Netlify encontre no deploy
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

        await resend.emails.send({
          from: 'Josh Segatt <vault@joshsegatt.com>',
          to: customerEmail,
          subject: 'PROPRIETARY ASSETS DEPLOYED - Action Required',
          html: htmlBody,
        });
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
