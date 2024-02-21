import styles from './rule.module.css';
import { Locale } from '@/i18n.config';
import axios from 'axios';
import { IBanner } from '@/interface/IBanner';
import { Hero } from '@/components/Hero';
import { Wrapper } from '@/components/Wrapper';
import { Rule } from '@/components/Rule';

const defaultData = {
  uk: [
    {
      id: 1,
      h1: 'Правила',
      alt: 'string',
      is_active: false,
      img: '/images/map-lg-1x.jpg',
      description: '',
      title: 'Заголовок2',
      title2: 'Заголовок 3',
      text: `Шукайте випадкові слова в Україні, щоб використовувати їх у своїх проєктах, веб-сайтах, макетах, презентаціях та інших матеріалах. Цей текст наданий для тимчасового заповнення відсутнього контенту. Він не має сенсу і може містити випадкові слова, які не пов'язані між собою. Просто скопіюйте та вставте його в свої проєкти, де потрібен текст-заповнювач.`,
      text2: `Шукайте випадкові слова в Україні, щоб використовувати їх у своїх проєктах, веб-сайтах, макетах, презентаціях та інших матеріалах. Цей текст наданий для тимчасового заповнення відсутнього контенту. Він не має сенсу і може містити випадкові слова, які не пов'язані між собою. Просто скопіюйте та вставте його в свої проєкти, де потрібен текст-заповнювач.`,
    },
  ],
  en: [
    {
      id: 2,
      h1: 'Rule',
      alt: 'string',
      is_active: false,
      img: '/images/map-lg-1x.jpg',
      description: '',
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
      h1: 'Taisyklės',
      alt: 'string',
      is_active: false,
      img: '/images/map-lg-1x.jpg',
      description: '',
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
      h1: 'Regras',
      alt: 'string',
      is_active: false,
      img: '/images/map-lg-1x.jpg',
      description: '',
      title: 'Head2',
      title2: 'Head2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolor ea id itaque neque reiciendis sit veniam, voluptatum. Aliquid culpa debitis dolor dolorum, explicabo fugiat modi molestiae molestias necessitatibus quaerat quidem, repudiandae tempore veniam veritatis voluptatem! Commodi exercitationem fugit iusto non quas repellat repellendus rerum voluptate. Doloremque fugiat, ipsum laudantium numquam odit officiis pariatur reprehenderit vero! Minima molestias quaerat reiciendis rem temporibus! Consectetur corporis cumque ducimus eos minima ut voluptatum!',
      text2:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolor ea id itaque neque reiciendis sit veniam, voluptatum. Aliquid culpa debitis dolor dolorum, explicabo fugiat modi molestiae molestias necessitatibus quaerat quidem, repudiandae tempore veniam veritatis voluptatem! Commodi exercitationem fugit iusto non quas repellat repellendus rerum voluptate. Doloremque fugiat, ipsum laudantium numquam odit officiis pariatur reprehenderit vero! Minima molestias quaerat reiciendis rem temporibus! Consectetur corporis cumque ducimus eos minima ut voluptatum!',
    },
  ],
};

const getRule = async (lang: Locale) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/rule/`,
    );

    if (response.status === 200) {
      return response.data;
    } else return defaultData[lang];
  } catch (error) {
    return defaultData[lang];
  }
};

export default async function RulePage({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const lang = params.lang;

  const rule = await getRule(lang);
  const defaultImg = '/images/rule_bg_default.jpg';

  return (
    <>
      <Hero banner={rule} defaultImg={defaultImg} />
      <Wrapper>
        <Rule rule={rule[0]} />
      </Wrapper>
    </>
  );
}
