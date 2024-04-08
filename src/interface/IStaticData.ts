export interface headerStaticDataProp {
  logo: { label: string };
  pages: HeaderStaticLinksProp[];
  settings: HeaderStaticLinksProp[];
  registration: string;
  dashboard: string;
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
    hour: string;
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
  seat_booking: {
    title: string;
    seats: { name: string; title: string }[];
    selected_seats: string;
    float: string;
  };
  cancel_btn: {
    title: string;
  };
  select_btn: {
    title: string;
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
  snack_bar: {
    error: string;
    success: string;
  };
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
  navDashboard: dashBoardNavStaticData[];
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

export interface orderStaticData {
  title: string;
  no_tickets: string;
  passengers: string;
  orderForm: {
    passenger: string;
    floor: string;
    seat: string;
    name: string;
    surname: string;
    phone: string;
    email: string;
    adult: string;
    child: string;
    comment: string;
    extra_luggage: string;
    base_bag: string;
    extra_bag: string;
    extra_weight: string;
    our_bag: string;
    price: string;
    select_button: {
      title: string;
    };
    add_button: {
      title: string;
    };
    remove_button: {
      title: string;
    };
    bus: string;
    duration: string;
    journey: string;
    total: string;
    reserve_button: { title: string };
    payment_button: {
      title: string;
    };
  };
}

export interface dashboardAboutStaticData {
  about: string;
  home: string;
  back: string;

  form: {
    errors: {
      size: string;
      formats: string;
      title_more60: string;
      text_more60: string;
      alt_more30: string;
    };
    text: {
      h1: string;
      label: string;
      description: string;
      alt: string;
      banner: string;
    };
    save_btn: {
      text: string;
    };
  };
  snackBar: {
    success: string;
  };
  preview: string;
}

export interface dashboardRuleStaticData {
  rule: string;
  back: string;

  form: {
    errors: {
      size: string;
      formats: string;
      title_more60: string;
      text_more60: string;
      alt_more30: string;
    };
    text: {
      h1: string;
      label: string;
      description: string;
      alt: string;
      banner: string;
      text1: string;
      text2: string;
      title1: string;
      title2: string;
    };
    save_btn: {
      text: string;
    };
  };
  snackBar: {
    success: string;
    error: string;
  };
  preview: string;
}

export interface TabProps {
  id: number;
  lang: string;
  name: string;
  icon: string;
}

export interface dashboardRentStaticData {
  rent: string;
  new_rent: string;
  back: string;
  searchForm: {
    label: string;
    rent_button_form: {
      text: string;
    };
  };
  rentTable: {
    name: string;
    photo: string;
    services: string;
    seats: string;
    floor: string;
    status: string;
    snackBar: {
      remove_success: string;
      remove_error: string;
    };
  };
}

export interface dashboardBusStaticData {
  bus: string;
  new_bus: string;
  back: string;
  searchForm: {
    label: string;
    new_button_form: {
      text: string;
    };
  };
  busTable: {
    name: string;
    number: string;
    services: string;
    plate: string;
    all: string;
    rows: string;
    reduce: string;
    seats_first_floor: string;
    wc: string;
    rentable: string;
    seats_second_floor: string;
    poster: string;
    images: string;
    active: string;
    alt: string;
    features: string;
    save: string;
    fill_form: string;
    working: string;
    not_working: string;
    float: string;
    choose: string;
    row: string;
    enter: string;
    kitchen: string;
    no: string;
    yes: string;
    snackBar: {
      remove_success: string;
      remove_error: string;
      update_success: string;
      add_success: string;
      add_error: string;
    };
  };
  errors: {
    size: string;
    formats: string;
    name_more30: string;
    plates_number10: string;
    error_number: string;
    error_text: string;
  };
}

export interface dashboardTicketsStaticData {
  tickets: string;

  back: string;
  searchForm: {
    label: string;
    date: string;
    new_button_form: {
      text: string;
    };
    status: string;
    options: string[];
  };
  ticketsTable: {
    name: string;
    number: string;
    rout: string;
    start: string;
    price: string;
    status: string;
    create: string;
    reduce: string;
    all: string;
    rows: string;
    print_label: string;
    snackBar: {
      remove_success: string;
      remove_error: string;
      update_success: string;
      add_success: string;
      add_error: string;
    };
  };
  errors: {
    size: string;
    formats: string;
    name_more30: string;
    plates_number10: string;
    error_number: string;
    error_text: string;
  };
}

export interface dashboardRoutStaticData {
  routs: string;
  new_routs: string;

  back: string;
  searchForm: {
    label: string;

    new_button_form: {
      text: string;
    };
  };
  routTable: {
    number: string;
    from: string;
    to: string;
    stops: string;
    stop: string;
    all: string;
    rows: string;
    reduce: string;
    add_stop: string;
    city: string;
    departure_time: string;
    order: string;
    arrival_time: string;
    price: string;
    rout: string;
    save: string;
    add_btn: string;
    no_stop: string;
    is_popular: string;
    snackBar: {
      remove_success: string;
      remove_error: string;
      update_success: string;
      add_success: string;
      add_error: string;
    };
  };
  errors: {
    size: string;
    formats: string;
    name_more30: string;
    plates_number10: string;
    error_number: string;
    error_text: string;
  };
}
