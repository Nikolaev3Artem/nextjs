export interface headerStaticDataProp {
  pages: HeaderStaticLinksProp[];
  settings: HeaderStaticLinksProp[];
  registration: string;
  sign_in: string;
  sign_out: string;
}

export interface HeaderStaticLinksProp {
  id: number;
  name: string;
  title: string;
  path: string;
}

export interface footerStaticDataProp {
  navigate: HeaderStaticLinksProp[];
  collaboration: HeaderStaticLinksProp[];
  cooperation: string;
  copyright: string;
  managers: string;
  mobile_app: string;
  nav: string;
  support: string;
}

export interface infoBuyStaticDataProp {
  card_data: string;
  card_mobile: string;
  card_search: string;
  title: string;
}

export interface PopularStaticDataProp {
  title: string;
}

export interface MainStaticDataProps {
  date_input: string;
  from: string;
  search_btn: string;
  search_title: string;
  to: string;
}

export interface contactStaticDataProp {
  title: string;
  schedule: string;
  lunchtime: string;
  weekend: string;
}

export interface loginStaticDataProp {
  email: string;
  forgot_pass: string;
  login_email: string;
  pass: string;
  phone: string;
  reg_link: string;
  service_help: string;
  pages: loginStaticDataPageProp[];
  registration: string;
  sign_in: string;
  sign_out: string;
}

export interface loginStaticDataPageProp {
  id: number;
  name: string;
  title: string;
  path: string;
}

export interface registrationStaticDataProp {
  email: string;
  login_link: string;
  name: string;
  pass: string;
  phone: string;
  reg_button: string;
  reg_email: string;
  reg_phone: string;
  service: string;
  registration: string;
  sign_in: string;
  sign_out: string;
}
