const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY); // Get this from resend.com

const emailService = {
  sendContactEmail: async (formData) => {
    const { name, phone, subject, message } = formData;

    return await resend.emails.send({
      from: 'Website <onboarding@resend.dev>', // Later change to your domain
      to: 'onewaveafrica@gmail.com',
      subject: `[INQUIRY]: ${subject} from ${name}`,
      html: `
        <div style="font-family: sans-serif; background-color: #0A0A0A; color: #FFFFFF; padding: 40px; border-radius: 20px;">
          <h2 style="color: #FF8C00; text-transform: uppercase; letter-spacing: 2px;">New Tactical Inquiry</h2>
          <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;">
          <p><strong>From:</strong> ${name}</p>
          <p><strong>WhatsApp/Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background-color: #1A1A1A; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <p style="color: #CCCCCC; line-height: 1.6;">${message}</p>
          </div>
          <p style="font-size: 10px; color: #555; margin-top: 30px; text-transform: uppercase;">Sent via OneWave Africa Showcase Platform</p>
        </div>
      `
    });
  }
};

module.exports = emailService;