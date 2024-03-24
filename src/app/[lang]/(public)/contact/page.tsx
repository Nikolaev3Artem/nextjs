import { Locale } from '@/i18n.config';
import axios from 'axios';
import { Hero } from '@/components/published/Hero';
import { Wrapper } from '@/components/common/Wrapper';
import { Contact } from '@/components/common/Contact';
import { getContactDictionaries } from '@/lib/dictionary';

import { IContactText } from '@/interface/IEditorText';

const getContact = async (lang: Locale) => {
  try {
    const response = await axios.get<IContactText[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/contacts/`,
    );

    if (response.status === 200) {
      return {
        banner: {
          id: response.data[response.data.length - 1].id,
          h1: response.data[response.data.length - 1].main_title,
          alt: response.data[response.data.length - 1].title,
          img: response.data[response.data.length - 1].img,
          description: response.data[response.data.length - 1].main_desc,
          is_active: true,
        },
        section: {
          id: response.data[response.data.length - 1].id,
          title: response.data[response.data.length - 1].title,
          icon: response.data[response.data.length - 1].icon,
          address: response.data[response.data.length - 1].address,
          email: response.data[response.data.length - 1].email,
          contacts: response.data[response.data.length - 1].contacts,

          weekdays_work: response.data[response.data.length - 1].weekdays_work,
          weekdays_time: response.data[response.data.length - 1].weekdays_time,
          weekends: response.data[response.data.length - 1].weekends,
          lunch_time: response.data[response.data.length - 1].lunch_time,
        },
      };
    } else return { banner: {}, section: {} };
  } catch (error) {
    return { banner: {}, section: {} };
  }
};

export default async function ContactPage({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const lang = params.lang;
  const staticData = await getContactDictionaries(lang);

  const contact = await getContact(lang);
  const defaultImg = '/images/contact_bg_default.jpg';

  return (
    <>
      <Hero
        banner={contact.banner}
        defaultImg={defaultImg}
        staticData={staticData}
      />
      <Wrapper>
        <Contact
          contact={contact.section}
          staticData={staticData}
          lang={lang}
        />
      </Wrapper>
    </>
  );
}
