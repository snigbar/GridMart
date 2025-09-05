import nodemailer from 'nodemailer';
import config from '../config/config';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: config.enviroment === 'production',
  auth: {
    user: 'snigbar@gmail.com',
    pass: config.appPasswordMail,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  heading: string;
  message: string;
  link: string;
}

const sendEmail = async ({ to, subject, heading, message, link }: EmailOptions) => {
  const html = `
    <div style="font-family: sans-serif; padding: 20px;">
      <h2 style="color: #4f46e5;">${heading}</h2>
      <p>${message}</p>
      <a href="${link}" style="background-color: #4f46e5; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Click Here</a>
      <p style="margin-top: 20px;">If you didn't request this, feel free to ignore it.</p>
    </div>
  `;

  const info = await transporter.sendMail({
    from: 'GridMart <snigbar@gmail.com>',
    to,
    subject,
    text: `${message} Visit: ${link}`,
    html,
  });
  return info;
};

export default sendEmail;
