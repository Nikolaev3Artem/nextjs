import { Locale } from '@/i18n.config';
import axios from 'axios';
import { IBanner } from '@/interface/IBanner';
import { Hero } from '@/components/Hero';
import { Wrapper } from '@/components/Wrapper';
import { Parcels } from '@/components/Parcels';

const getParcelsBanner = async (lang: Locale) => {
  try {
    const response = await axios.get<IBanner[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/parcel/`,
    );

    const data = {
      uk: [
        {
          id: 1,
          h1: 'Посилки',
          alt: 'string',
          is_active: false,
          img: '/images/map-lg-1x.jpg',
          description: '',
        },
      ],
      en: [
        {
          id: 2,
          h1: 'Parsels',
          alt: 'string',
          is_active: false,
          img: '/images/map-lg-1x.jpg',
          description: '',
        },
      ],
      lt: [
        {
          id: 3,
          h1: 'Siuntos',
          alt: 'string',
          is_active: false,
          img: '/images/map-lg-1x.jpg',
          description: '',
        },
      ],
      pt: [
        {
          id: 4,
          h1: 'Encomendas',
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
          h1: 'Посилки',
          alt: 'string',
          is_active: true,
          img: '/images/parsels_bg_default.jpg',
          description: '',
        },
      ],
      en: [
        {
          id: 2,
          h1: 'Parsels',
          alt: 'string',
          is_active: true,
          img: '/images/parsels_bg_default.jpg',
          description: '',
        },
      ],
      lt: [
        {
          id: 3,
          h1: 'Encomendas',
          alt: 'string',
          is_active: true,
          img: '/images/parsels_bg_default.jpg',
          description: '',
        },
      ],
      pt: [
        {
          id: 4,
          h1: 'Sobre a empresa Legend Trans',
          alt: 'string',
          is_active: true,
          img: '/images/parsels_bg_default.jpg',
          description: '',
        },
      ],
    };
    return data[lang];
  }
};

const getParcels = async (lang: Locale) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/parcel/`,
    );

    const data = {
      uk: [
        {
          id: 1,
          title: 'Заголовок2',
          title2: 'Заголовок 3',
          text: `Шукайте випадкові слова в Україні, щоб використовувати їх у своїх проєктах, веб-сайтах, макетах, презентаціях та інших матеріалах. Цей текст наданий для тимчасового заповнення відсутнього контенту. Він не має сенсу і може містити випадкові слова, які не пов'язані між собою. Просто скопіюйте та вставте його в свої проєкти, де потрібен текст-заповнювач.`,
          text2: `Шукайте випадкові слова в Україні, щоб використовувати їх у своїх проєктах, веб-сайтах, макетах, презентаціях та інших матеріалах. Цей текст наданий для тимчасового заповнення відсутнього контенту. Він не має сенсу і може містити випадкові слова, які не пов'язані між собою. Просто скопіюйте та вставте його в свої проєкти, де потрібен текст-заповнювач.`,
        },
      ],
      en: [
        {
          id: 2,
          title: 'Head2',
          title2: 'Head2',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolor ea id itaque neque reiciendis sit veniam, voluptatum. Aliquid culpa debitis dolor dolorum, explicabo fugiat modi molestiae molestias necessitatibus quaerat quidem, repudiandae tempore veniam veritatis voluptatem! Commodi exercitationem fugit iusto non quas repellat repellendus rerum voluptate. Doloremque fugiat, ipsum laudantium numquam odit officiis pariatur reprehenderit vero! Minima molestias quaerat reiciendis rem temporibus! Consectetur corporis cumque ducimus eos minima ut voluptatum!',
          text2:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolor ea id itaque neque reiciendis sit veniam, voluptatum. Aliquid culpa debitis dolor dolorum, explicabo fugiat modi molestiae molestias necessitatibus quaerat quidem, repudiandae tempore veniam veritatis voluptatem! Commodi exercitationem fugit iusto non quas repellat repellendus rerum voluptate. Doloremque fugiat, ipsum laudantium numquam odit officiis pariatur reprehenderit vero! Minima molestias quaerat reiciendis rem temporibus! Consectetur corporis cumque ducimus eos minima ut voluptatum!',
        },
      ],
      lt: [
        {
          id: 3,
          title: 'Head2',
          title2: 'Head2',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolor ea id itaque neque reiciendis sit veniam, voluptatum. Aliquid culpa debitis dolor dolorum, explicabo fugiat modi molestiae molestias necessitatibus quaerat quidem, repudiandae tempore veniam veritatis voluptatem! Commodi exercitationem fugit iusto non quas repellat repellendus rerum voluptate. Doloremque fugiat, ipsum laudantium numquam odit officiis pariatur reprehenderit vero! Minima molestias quaerat reiciendis rem temporibus! Consectetur corporis cumque ducimus eos minima ut voluptatum!',
          text2:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolor ea id itaque neque reiciendis sit veniam, voluptatum. Aliquid culpa debitis dolor dolorum, explicabo fugiat modi molestiae molestias necessitatibus quaerat quidem, repudiandae tempore veniam veritatis voluptatem! Commodi exercitationem fugit iusto non quas repellat repellendus rerum voluptate. Doloremque fugiat, ipsum laudantium numquam odit officiis pariatur reprehenderit vero! Minima molestias quaerat reiciendis rem temporibus! Consectetur corporis cumque ducimus eos minima ut voluptatum!',
        },
      ],
      pt: [
        {
          id: 4,
          title: 'Head2',
          title2: 'Head2',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolor ea id itaque neque reiciendis sit veniam, voluptatum. Aliquid culpa debitis dolor dolorum, explicabo fugiat modi molestiae molestias necessitatibus quaerat quidem, repudiandae tempore veniam veritatis voluptatem! Commodi exercitationem fugit iusto non quas repellat repellendus rerum voluptate. Doloremque fugiat, ipsum laudantium numquam odit officiis pariatur reprehenderit vero! Minima molestias quaerat reiciendis rem temporibus! Consectetur corporis cumque ducimus eos minima ut voluptatum!',
          text2:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolor ea id itaque neque reiciendis sit veniam, voluptatum. Aliquid culpa debitis dolor dolorum, explicabo fugiat modi molestiae molestias necessitatibus quaerat quidem, repudiandae tempore veniam veritatis voluptatem! Commodi exercitationem fugit iusto non quas repellat repellendus rerum voluptate. Doloremque fugiat, ipsum laudantium numquam odit officiis pariatur reprehenderit vero! Minima molestias quaerat reiciendis rem temporibus! Consectetur corporis cumque ducimus eos minima ut voluptatum!',
        },
      ],
    };
    return data[lang];
  } catch (error) {
    console.log(error);
    const data = {
      uk: [
        {
          id: 1,
          title: 'Заголовок2',
          title2: 'Заголовок 3',
          text: `Шукайте випадкові слова в Україні, щоб використовувати їх у своїх проєктах, веб-сайтах, макетах, презентаціях та інших матеріалах. Цей текст наданий для тимчасового заповнення відсутнього контенту. Він не має сенсу і може містити випадкові слова, які не пов'язані між собою. Просто скопіюйте та вставте його в свої проєкти, де потрібен текст-заповнювач.`,
          text2: `Шукайте випадкові слова в Україні, щоб використовувати їх у своїх проєктах, веб-сайтах, макетах, презентаціях та інших матеріалах. Цей текст наданий для тимчасового заповнення відсутнього контенту. Він не має сенсу і може містити випадкові слова, які не пов'язані між собою. Просто скопіюйте та вставте його в свої проєкти, де потрібен текст-заповнювач.`,
        },
      ],
      en: [
        {
          id: 2,
          title: 'Head2',
          title2: 'Head2',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolor ea id itaque neque reiciendis sit veniam, voluptatum. Aliquid culpa debitis dolor dolorum, explicabo fugiat modi molestiae molestias necessitatibus quaerat quidem, repudiandae tempore veniam veritatis voluptatem! Commodi exercitationem fugit iusto non quas repellat repellendus rerum voluptate. Doloremque fugiat, ipsum laudantium numquam odit officiis pariatur reprehenderit vero! Minima molestias quaerat reiciendis rem temporibus! Consectetur corporis cumque ducimus eos minima ut voluptatum!',
          text2:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolor ea id itaque neque reiciendis sit veniam, voluptatum. Aliquid culpa debitis dolor dolorum, explicabo fugiat modi molestiae molestias necessitatibus quaerat quidem, repudiandae tempore veniam veritatis voluptatem! Commodi exercitationem fugit iusto non quas repellat repellendus rerum voluptate. Doloremque fugiat, ipsum laudantium numquam odit officiis pariatur reprehenderit vero! Minima molestias quaerat reiciendis rem temporibus! Consectetur corporis cumque ducimus eos minima ut voluptatum!',
        },
      ],
      lt: [
        {
          id: 3,
          title: 'Head2',
          title2: 'Head2',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolor ea id itaque neque reiciendis sit veniam, voluptatum. Aliquid culpa debitis dolor dolorum, explicabo fugiat modi molestiae molestias necessitatibus quaerat quidem, repudiandae tempore veniam veritatis voluptatem! Commodi exercitationem fugit iusto non quas repellat repellendus rerum voluptate. Doloremque fugiat, ipsum laudantium numquam odit officiis pariatur reprehenderit vero! Minima molestias quaerat reiciendis rem temporibus! Consectetur corporis cumque ducimus eos minima ut voluptatum!',
          text2:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolor ea id itaque neque reiciendis sit veniam, voluptatum. Aliquid culpa debitis dolor dolorum, explicabo fugiat modi molestiae molestias necessitatibus quaerat quidem, repudiandae tempore veniam veritatis voluptatem! Commodi exercitationem fugit iusto non quas repellat repellendus rerum voluptate. Doloremque fugiat, ipsum laudantium numquam odit officiis pariatur reprehenderit vero! Minima molestias quaerat reiciendis rem temporibus! Consectetur corporis cumque ducimus eos minima ut voluptatum!',
        },
      ],
      pt: [
        {
          title: 'Head2',
          title2: 'Head2',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolor ea id itaque neque reiciendis sit veniam, voluptatum. Aliquid culpa debitis dolor dolorum, explicabo fugiat modi molestiae molestias necessitatibus quaerat quidem, repudiandae tempore veniam veritatis voluptatem! Commodi exercitationem fugit iusto non quas repellat repellendus rerum voluptate. Doloremque fugiat, ipsum laudantium numquam odit officiis pariatur reprehenderit vero! Minima molestias quaerat reiciendis rem temporibus! Consectetur corporis cumque ducimus eos minima ut voluptatum!',
          text2:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolor ea id itaque neque reiciendis sit veniam, voluptatum. Aliquid culpa debitis dolor dolorum, explicabo fugiat modi molestiae molestias necessitatibus quaerat quidem, repudiandae tempore veniam veritatis voluptatem! Commodi exercitationem fugit iusto non quas repellat repellendus rerum voluptate. Doloremque fugiat, ipsum laudantium numquam odit officiis pariatur reprehenderit vero! Minima molestias quaerat reiciendis rem temporibus! Consectetur corporis cumque ducimus eos minima ut voluptatum!',
        },
      ],
    };
    return data[lang];
  }
};

export default async function ParcelsPage({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const lang = params.lang;

  const banner = await getParcelsBanner(lang);
  const parcels = await getParcels(lang);
  const defaultImg = '/images/parsels_bg_default.jpg';

  return (
    <>
      <Hero banner={banner} defaultImg={defaultImg} />
      <Wrapper>
        <Parcels parcels={parcels[0]} />
      </Wrapper>
    </>
  );
}
