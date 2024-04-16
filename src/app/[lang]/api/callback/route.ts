import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const status = formData.get('response_status');

    if (status === 'success') {
      const redirectUrl = new URL('http://localhost:3000/uk/my-order');

      // change tickets status to PAYED
      return NextResponse.redirect(redirectUrl, 302);
    }
    if (status === 'failure') {
      const referer = req.headers.get('referer');
    }
  } catch (error) {
    return NextResponse.error();
  }
}
