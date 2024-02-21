export interface IEditorText {
  id?: number;
  title?: string;
  title2?: string;
  text?: string;
  text2?: string;
}

export interface IContactText {
  id: number;
  title: string;
  icon: string;
  address: string;
  email: string;
  phone: PhoneType[];
  schedule: {
    weekdays: { days: string | null; time: string | null };
    weekend: { days: string | null; time: string | null };
    lunchtime: { days: string | null; time: string | null };
  };
}

export interface PhoneType {
  id: number;
  number: string;
  support: { isTelegram: boolean; isViber: boolean; isWhatsUp: boolean };
}
