// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ response: 'No message provided.' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: [
          { role: 'system', content: 'You are a helpful voice assistant.' },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();

    const reply = data?.choices?.[0]?.message?.content ?? 'Sorry, I could not understand.';
    res.status(200).json({ response: reply });
  } catch (err) {
    console.error('Chat API error:', err);
    res.status(500).json({ response: 'Something went wrong.' });
  }
}
