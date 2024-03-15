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
}

export interface IProfile {
  id?: number;
  last_name?: string;
  first_name?: any;
  date?: any;
  email?: string;
  delivery?: any;
  phone?: any;
  company?: boolean;
  city?: any;
  logo?: any;
  name_company?: any;
  physical_address_company?: any;
  legal_address_company?: any;
  site?: any;
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
