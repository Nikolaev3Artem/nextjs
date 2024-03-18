export interface headerStaticDataProp {
  logo: { label: string };
  pages: HeaderStaticLinksProp[];
  settings: HeaderStaticLinksProp[];
  registration: string;
  sign_in: string;
  sign_out: string;
  avatar: { alt: string };
  support: string;
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
  title: string;
  description: string;
  search_results: string;
  no_results: string;
  routs_card: {
    number: string;
    conveniences: string;
    conveniences_icon: {
      wifi: conveniencesIconProp;
      conditioning: conveniencesIconProp;
      wc: conveniencesIconProp;
      seats: conveniencesIconProp;
      socket: conveniencesIconProp;
    };
    price: string;
    routs: string;
    duration: string;
    seat: string;
    baggage: { title: string; light_luggage: string; heavy_luggage: string };
    cancellation: string;
    cancellation_btn: {
      title: string;
      href: string;
    };
    cancellation_info: { title: string; href: string; text: string };
    booking_btn: {
      title: string;
      href: string;
    };
    read_more_btn: {
      title: string;
    };
  };
}

export interface conveniencesIconProp {
  icon: string;
  name: string;
  aria: string;
}

export interface contactStaticDataProp {
  title: string;
  section_title: string;
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

export interface BusRentStaticDataPageProp {
  title: string;
  name: string;
  service: string;
  model: string;
  first_floor: string;
  second_floor: string;
  see_more_btn: string;
  order_btn: string;
  close_btn: string;
  character: string;
  photo: string;
  set_number: string;
  messages: {
    send: string;
    manager: string;
  };
  form: {
    required: string;
    pattern_message: string;
    label: string;
  };
  caption: {
    title: string;
    model: string;
    tel: string;
  };
}

export interface dashBoardStaticData {
  about: string;
  bus: string;
  city: string;
  contact: string;
  content: string;
  dashboard: string;
  flights: string;
  home: string;
  parcel: string;
  rent: string;
  rout: string;
  rule: string;
  search_ticket: string;
  settings: string;
  tickets: string;
  navigation: string;
  navUser: dashBoardNavStaticData[];
  navAdminMain: dashBoardNavStaticData[];
  navAdmin: dashBoardNavStaticData[];
}

export interface dashBoardNavStaticData {
  id: number;
  name: string;
  path: string;
  title: string;
}

export interface profileStaticData {
  title: string;
  form: {
    name: string;
    surname: string;
    patronymic: string;
    phone: string;
    email: string;
    birthday: string;
    login: string;
    password: string;
  };
  button: {
    save: {
      title: string;
    };
    edit: {
      title: string;
    };
  };
}
