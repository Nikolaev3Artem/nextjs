import { Locale } from '@/i18n.config';
import axios from 'axios';
import { IBanner } from '@/interface/IBanner';
import { Hero } from '@/components/Hero';
import { Wrapper } from '@/components/Wrapper';
import { Contact } from '@/components/Contact';
import { getContactDictionaries } from '@/lib/dictionary';

const getContactBanner = async (lang: Locale) => {
  try {
    const response = await axios.get<IBanner[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/contact/`,
    );

    const data = {
      uk: [
        {
          id: 1,
          h1: 'Контакти',
          alt: 'string',
          is_active: false,
          img: '/images/map-lg-1x.jpg',
          description: '',
        },
      ],
      en: [
        {
          id: 2,
          h1: 'Contact',
          alt: 'string',
          is_active: false,
          img: '/images/map-lg-1x.jpg',
          description: '',
        },
      ],
      lt: [
        {
          id: 3,
          h1: 'Kontaktai',
          alt: 'string',
          is_active: false,
          img: '/images/map-lg-1x.jpg',
          description: '',
        },
      ],
      pt: [
        {
          id: 4,
          h1: 'Contactos',
          alt: 'string',
          is_active: false,
          img: '/images/map-lg-1x.jpg',
          description: '',
        },
      ],
    };
    return data[lang];
  } catch (error) {
    // console.log(error);
    const data = {
      uk: [
        {
          id: 1,
          h1: 'Контакти',
          alt: 'string',
          is_active: true,
          img: '',
          description: '',
        },
      ],
      en: [
        {
          id: 2,
          h1: 'Contact',
          alt: 'string',
          is_active: true,
          img: '',
          description: '',
        },
      ],
      lt: [
        {
          id: 3,
          h1: 'Kontaktai',
          alt: 'string',
          is_active: true,
          img: '',
          description: '',
        },
      ],
      pt: [
        {
          id: 4,
          h1: 'Contactos',
          alt: 'string',
          is_active: true,
          img: '',
          description: '',
        },
      ],
    };
    return data[lang];
  }
};

const getContact = async (lang: Locale) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/contact/`,
    );
    console.log(response.data);
    const data = {
      uk: [
        {
          id: 1,
          title: 'Наша адреса',
          icon: 'uk',
          address: 'Вул. Стрийська, 109, Львів, Львівська область, Україна',
          email: 'lehendatrans@gmail.com',
          phone: [
            {
              id: 1,
              number: '0985554422',
              support: { isTelegram: true, isViber: true, isWhatsUp: true },
            },
            {
              id: 2,
              number: '0985554422',
              support: { isTelegram: false, isViber: true, isWhatsUp: true },
            },

            {
              id: 3,
              number: '0985554422',
              support: { isTelegram: true, isViber: true, isWhatsUp: false },
            },
          ],
          schedule: {
            weekdays: { days: 'ПН-ПТ', time: '10:00 - 18:00' },
            weekend: { days: 'СБ-НД', time: null },
            lunchtime: { days: null, time: '13:00 - 14:00' },
          },
        },
      ],
      en: [
        {
          id: 1,
          title: 'Our address',
          icon: 'uk',
          address: 'Stryiska str, 109, Lviv, Lviv District, Ukraine',
          email: 'lehendatrans@gmail.com',
          phone: [
            {
              id: 1,
              number: '0985554422',
              support: { isTelegram: false, isViber: true, isWhatsUp: true },
            },
            {
              id: 2,
              number: '0985554422',
              support: { isTelegram: false, isViber: true, isWhatsUp: true },
            },

            {
              id: 3,
              number: '0985554422',
              support: { isTelegram: false, isViber: true, isWhatsUp: true },
            },
          ],
          schedule: {
            weekdays: { days: 'MON-FRI', time: '10:00 - 18:00' },
            weekend: { days: 'SAT-SUN', time: null },
            lunchtime: { days: null, time: '13:00 - 14:00' },
          },
        },
      ],
      lt: [
        {
          id: 1,
          title: 'Adresas',
          icon: 'uk',
          address: 'Stryiska str, 109, Lviv, Lviv District, Ukraine',
          email: 'lehendatrans@gmail.com',
          phone: [
            {
              id: 1,
              number: '0985554422',
              support: { isTelegram: false, isViber: true, isWhatsUp: true },
            },
            {
              id: 2,
              number: '0985554422',
              support: { isTelegram: false, isViber: true, isWhatsUp: true },
            },

            {
              id: 3,
              number: '0985554422',
              support: { isTelegram: false, isViber: true, isWhatsUp: true },
            },
          ],
          schedule: {
            weekdays: { days: 'PR-PN', time: '10:00 - 18:00' },
            weekend: { days: 'Š-SK', time: null },
            lunchtime: { days: null, time: '13:00 - 14:00' },
          },
        },
      ],
      pt: [
        {
          id: 1,
          title: 'Nosso endereço',
          icon: 'uk',
          address: 'Stryiska str, 109, Lviv, Lviv District, Ukraine',
          email: 'lehendatrans@gmail.com',
          phone: [
            {
              id: 1,
              number: '0985554422',
              support: { isTelegram: false, isViber: true, isWhatsUp: true },
            },
            {
              id: 2,
              number: '0985554422',
              support: { isTelegram: false, isViber: true, isWhatsUp: true },
            },

            {
              id: 3,
              number: '0985554422',
              support: { isTelegram: false, isViber: true, isWhatsUp: true },
            },
          ],
          schedule: {
            weekdays: { days: 'SEG-SEX', time: '10:00 - 18:00' },
            weekend: { days: 'SÁB-DOM', time: null },
            lunchtime: { days: null, time: '13:00 - 14:00' },
          },
        },
      ],
    };
    // return data[lang];
    return response.data;
  } catch (error) {
    // console.log(error);
    const data = {
      uk: [
        {
          id: 1,
          title: 'Наша адреса',
          icon: 'uk',
          address: 'Вул. Стрийська, 109, Львів, Львівська область, Україна',
          email: 'lehendatrans@gmail.com',
          phone: [
            {
              id: 1,
              number: '0985554422',
              support: { isTelegram: true, isViber: true, isWhatsUp: true },
            },
            {
              id: 2,
              number: '0985554422',
              support: { isTelegram: false, isViber: true, isWhatsUp: true },
            },

            {
              id: 3,
              number: '0985554422',
              support: { isTelegram: true, isViber: true, isWhatsUp: true },
            },
          ],
          schedule: {
            weekdays: { days: 'ПН-ПТ', time: '10:00 - 18:00' },
            weekend: { days: 'СБ-НД', time: null },
            lunchtime: { days: null, time: '13:00 - 14:00' },
          },
        },
      ],
      en: [
        {
          id: 1,
          title: 'Our address',
          icon: 'en',
          address: 'Stryiska str, 109, Lviv, Lviv District, Ukraine',
          email: 'lehendatrans@gmail.com',
          phone: [
            {
              id: 1,
              number: '0985554422',
              support: { isTelegram: true, isViber: true, isWhatsUp: true },
            },
            {
              id: 2,
              number: '0985554422',
              support: { isTelegram: false, isViber: true, isWhatsUp: true },
            },

            {
              id: 3,
              number: '0985554422',
              support: { isTelegram: true, isViber: true, isWhatsUp: false },
            },
          ],
          schedule: {
            weekdays: { days: 'MON-FRI', time: '10:00 - 18:00' },
            weekend: { days: 'SAT-SUN', time: null },
            lunchtime: { days: null, time: '13:00 - 14:00' },
          },
        },
      ],
      lt: [
        {
          id: 1,
          title: 'Adresas',
          icon: 'lt',
          address: 'Stryiska str, 109, Lviv, Lviv District, Ukraine',
          email: 'lehendatrans@gmail.com',
          phone: [
            {
              id: 1,
              number: '0985554422',
              support: { isTelegram: true, isViber: true, isWhatsUp: false },
            },
            {
              id: 2,
              number: '0985554422',
              support: { isTelegram: true, isViber: true, isWhatsUp: false },
            },

            {
              id: 3,
              number: '0985554422',
              support: { isTelegram: true, isViber: true, isWhatsUp: false },
            },
          ],
          schedule: {
            weekdays: { days: 'PR-PN', time: '10:00 - 18:00' },
            weekend: { days: 'Š-SK', time: null },
            lunchtime: { days: null, time: '13:00 - 14:00' },
          },
        },
      ],
      pt: [
        {
          id: 1,
          title: 'Nosso endereço',
          icon: 'pt',
          address: 'Stryiska str, 109, Lviv, Lviv District, Ukraine',
          email: 'lehendatrans@gmail.com',
          phone: [
            {
              id: 1,
              number: '0985554422',
              support: { isTelegram: true, isViber: true, isWhatsUp: false },
            },
            {
              id: 2,
              number: '0985554422',
              support: { isTelegram: true, isViber: true, isWhatsUp: false },
            },

            {
              id: 3,
              number: '0985554422',
              support: { isTelegram: true, isViber: true, isWhatsUp: false },
            },
          ],
          schedule: {
            weekdays: { days: 'SEG-SEX', time: '10:00 - 18:00' },
            weekend: { days: 'SÁB-DOM', time: null },
            lunchtime: { days: null, time: '13:00 - 14:00' },
          },
        },
      ],
    };
    return data[lang];
  }
};

export default async function ContactPage({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const lang = params.lang;
  const staticData = await getContactDictionaries(lang);
  const banner = await getContactBanner(lang);
  const contact = await getContact(lang);
  const defaultImg = '/images/contact_bg_default.jpg';

  return (
    <>
      <Hero banner={banner} defaultImg={defaultImg} />
      <Wrapper>
        <Contact contact={contact[0]} staticData={staticData} />
      </Wrapper>
    </>
  );
}
