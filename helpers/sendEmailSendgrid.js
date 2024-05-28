import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(data) {
  const email = { ...data, from: process.env.MAILING_SENDER_EMAIL };
  await sgMail.send(email);
  return true;
}

export default sendEmail;
