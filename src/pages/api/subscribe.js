// File path: /pages/api/subscribe.js (for Next.js)
// If using another framework, adjust the file path accordingly

import { google } from 'googleapis';

// Configuration for Google Sheets
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';  // Replace with your actual spreadsheet ID
const SHEET_NAME = 'Subscribers';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Basic validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Valid email is required' });
    }

    // Set up auth client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: SCOPES,
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    // Get current datetime
    const now = new Date().toISOString();

    // Append to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:B`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[email, now]],
      },
    });

    return res.status(200).json({ 
      message: 'Email successfully added to newsletter list',
      result: response.data
    });
  } catch (error) {
    console.error('Error adding email to sheet:', error);
    return res.status(500).json({ 
      message: 'Failed to add email to newsletter list',
      error: error.message 
    });
  }
}