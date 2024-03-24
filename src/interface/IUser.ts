import { ITickets } from './IJourney';

export interface IUser {
  id?: number;
  last_login?: any;
  is_superuser: boolean;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: number;
  email: string;
  groups: any[];
  user_permissions: any[];
  tickets?: ITickets[];
}

export interface IProfile {
  id?: number;
  last_name?: string;
  first_name?: string;
  third_name?: string;
  birth_date?: string;
  date?: any;
  email?: string;
  delivery?: any;
  phone?: string;
  company?: boolean;
  city?: string;
  logo?: string;
  name_company?: string;
  physical_address_company?: string;
  legal_address_company?: string;
  site?: string;
  ipn?: any;
  phone_accountant?: any;
  bonus?: any;
  discount?: any;
  user?: IUser;
}

export interface IToken {
  access: string;
  refresh: string;
}
