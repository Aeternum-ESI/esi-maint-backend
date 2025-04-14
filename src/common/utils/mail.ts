import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  'VOTRE_CLIENT_ID',
  'VOTRE_CLIENT_SECRET',
  'VOTRE_REDIRECT_URL', // généralement http://localhost
);

export const transporter = nodemailer.createTransport({
  service: 'Gmail',

  host: 'smtp.gmail.com',
  port: 465,

  secure: true,
  auth: {
    user: 'nz_benhamiche@esi.dz',
    pass: 'duzj rgop rali rxmo',
  },
});

export const sendMail = (userEmail: string, subject: string, text: string) => {
  transporter.sendMail({
    from: 'nz_benhamiche@esi.dz',
    to: 'youcef.benhamiche@gmail.com',
    subject: `Une personne a rempli le formulaire de contact`,
    text: 'Envoyé par node mailer',
  });
};
