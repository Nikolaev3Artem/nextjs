import axios from 'axios';
import crypto from 'crypto';

interface OrderBody {
  [key: string]: string | number; // Define the properties and their types
}

export const fondyCheck = async () => {
  const fondy_pass = 'test';

  const order_body: OrderBody = {
    order_id: 'id8',
    merchant_id: 1396424,
    order_desc: 'order123',
    amount: 20000,
    currency: 'USD',
    version: '1.0.1',
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
    const data = axios.post(
      'https://pay.fondy.eu/api/checkout/redirect/',
      {
        request: { ...order_body, signature: signature.digest('hex') },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.log(error);
  }
};
