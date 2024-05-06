import axios from 'axios';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { enqueueSnackbar } from 'notistack';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const status = formData.get('response_status');
    const order_id_row = formData.get('order_id');
    const order_id = [];

    const matches = order_id_row?.toString()?.match(/\b\d+\b/g);

    if (matches) {
      order_id.push(...matches);
    } else {
      console.log('order_id не знайдено.');
    }

    // const session = await getSession();
    const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
    if (status === 'success') {
      const redirectUrl = new URL(` ${process.env.NEXT_PUBLIC_URL}uk/my-order`);

      // change tickets status to PAYED
      const formData = new FormData();
      formData.append('status', 'PAYED');

      if (order_id) {
        const requests = order_id.map(id =>
          axios.put(`${BASE_URL}/uk/api/ticket/${id}`, formData),
        );
        const responses = await Promise.all(requests);
        if (responses.every(response => response.status === 200)) {
          return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}`, 302);
        } else {
          return NextResponse.redirect(redirectUrl, 302);
        }
      }
      // return NextResponse.redirect(redirectUrl, 302);
    }
    if (status === 'failure') {
      const referer = req.headers.get('referer');
    }
  } catch (error) {
    return NextResponse.error();
  }
}
