import { NextResponse } from 'next/server';
import crypto from 'crypto';
import axios from 'axios';

interface OrderBody {
  [key: string]: string | number; // Define the properties and their types
}

export async function POST(req: Request) {
  const rawBody = await req.json();
  const fondy_pass = process.env.NEXT_PUBLIC_FONDY_PASS;
  const merchant_id = process.env.NEXT_PUBLIC_FONDY_MERCHANT_ID;
  const response_url = 'http://localhost:3000/uk/api/callback';
  const order_body: OrderBody = {
    order_id: rawBody.order_id,
    merchant_id: merchant_id || '',
    order_desc: rawBody.order_desc,
    amount: rawBody.amount,
    currency: rawBody.currency,
    response_url: response_url,
  };

  const order_keys = Object.keys(order_body).sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  const signature_row = order_keys.map(el => order_body[el]).join('|');
  const signature = crypto.createHash('sha1');
  signature.update(`${fondy_pass}|${signature_row}`);
  try {
    const response = await axios.post(
      'https://pay.fondy.eu/api/checkout/url/',
      {
        request: {
          order_id: order_body.order_id,
          merchant_id: order_body.merchant_id,
          order_desc: order_body.order_desc,
          amount: order_body.amount,
          currency: order_body.currency,
          signature: signature.digest('hex'),
          response_url: response_url,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (response) {
      return NextResponse.json({
        status: 'super',
        response: response.data.response,
      });
    }
  } catch (error) {
    //@ts-ignore
    return NextResponse.json({ message: error.message, status: '400' });
  }
}
