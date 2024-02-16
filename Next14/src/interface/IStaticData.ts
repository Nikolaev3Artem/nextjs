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
