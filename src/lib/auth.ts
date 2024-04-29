'use server';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { IProfile, IToken, IUser } from '@/interface/IUser';
import { Locale } from '@/i18n.config';

interface LoginProps {
  email: string;
  password: string;
  showPassword?: boolean;
}

interface CustomerProps {
  results: IProfile[];
}

interface AdminProps {
  results: IUser[];
}

export async function login(values: LoginProps) {
  const response = await axios.post<IToken>(
    `${process.env.NEXT_PUBLIC_BASE_URL}auth/jwt/create/`,
    {
      headers: {
        'TopContent-Type': 'application/json',
      },
      email: values.email,
      password: values.password,
    },
  );

  const expires = new Date(Date.now() + 1000 * 10000);
  const session = {
    access: response.data.access,
    refresh: response.data.refresh,
  };
  const sessionDataString = JSON.stringify(session);
  cookies().set('session', sessionDataString, { expires, httpOnly: true });
  return 200;
}

export async function logout() {
  cookies().set('session', '', { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await JSON.parse(session);
}

export async function getCustomerStatus() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  try {
    const access = JSON.parse(session).access;

    const { data } = await axios.get<CustomerProps>(
      `${process.env.NEXT_PUBLIC_BASE_URL}uk/api/customer/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + access,
        },
      },
    );
    console.log(data.results);
    return data.results[0]?.user?.is_staff;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getAdminStatus() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  try {
    const access = JSON.parse(session).access;

    const { data } = await axios.get<AdminProps>(
      `${process.env.NEXT_PUBLIC_BASE_URL}uk/api/admin/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + access,
        },
      },
    );
    console.log(data.results);
    return data.results[0].is_superuser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getUserInfo() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  try {
    const access = JSON.parse(session).access;

    const { data } = await axios.get<IUser>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/me/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + access,
        },
      },
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await JSON.parse(session);

  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();

  res.cookies.set({
    name: 'session',
    value: JSON.stringify(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
