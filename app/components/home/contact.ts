// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Validate the input data
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Here, you can integrate with an email service like SendGrid, Nodemailer, etc.
    // For demonstration purposes, we'll just log the data.
    console.log('Received contact form submission:', { name, email, message });

    // Respond with a success message
    return res.status(200).json({ message: 'Form submitted successfully.' });
  } else {
    // Handle any non-POST requests
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
