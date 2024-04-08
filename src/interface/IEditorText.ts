export interface IEditorText {
  id?: number;
  title1?: string;
  title2?: string;
  text1?: string;
  text2?: string;
  main_title?: string;
  main_desc?: string;
  img?: any;
}

export interface IContactText {
  id?: number;
  title?: string;
  icon?: string;
  address?: string;
  email?: string;
  main_title?: string;
  contacts?: PhoneType[];
  weekdays_work?: string;
  weekdays_time?: string;
  weekends?: string;
  lunch_time?: string;
  description?: string;
  text?: string;
  img?: string;
  main_desc?: string;
  alt?: string;
}

export interface PhoneType {
  id: number;
  phone_number: string;
  telegram: string;
  viber: string;
  whatsup: string;
}
