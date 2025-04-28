import * as dotenv from 'dotenv';
dotenv.config();

import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;

// Configuration OAuth2 - utilisez les mêmes identifiants partout

const oauth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URL,
);

// Vous devez d'abord obtenir un refresh token valide
const getAuthUrl = () => {
  const scopes = ['https://mail.google.com/'];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent', // Pour forcer la génération d'un nouveau refresh token
  });

  console.log("Visitez cette URL pour autoriser l'application:", url);
};

// Appelez cette fonction pour obtenir l'URL d'autorisation
// getAuthUrl();

// Après avoir visité l'URL et obtenu le code d'autorisation, utilisez ce code pour obtenir un refresh token
async function getRefreshToken(code: string) {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Refresh Token:', tokens.refresh_token);
    return tokens.refresh_token;
  } catch (error) {
    console.error("Erreur lors de l'obtention du refresh token:", error);
  }
}

// getRefreshToken("code");
// Une fois que vous avez le refresh token, utilisez-le dans votre fonction d'envoi d'e-mail
export async function sendMail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    // Obtenir un access token
    const accessToken = await oauth2Client.getAccessToken();

    // Configurer le transporteur
    const transporter = nodemailer.createTransport({
      service: 'gmail', // This should work with the right imports
      auth: {
        type: 'OAuth2',
        user: 'ESIMaint@esi.dz',
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    } as nodemailer.TransportOptions);

    // Envoyer l'email
    const result = await transporter.sendMail({
      from: 'ESIMaint@esi.dz',
      sender: 'ESIMaint',
      to: to,
      subject: subject,
      text: text,
      html: html,
    });

    console.log('Email envoyé: ', result);
  } catch (error) {
    console.log(
      "Erreur lors de l'envoi de l'email: ",
      JSON.parse(JSON.stringify(error)),
    );
  }
}
