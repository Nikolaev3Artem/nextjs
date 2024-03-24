import { IBanner } from './IBanner';

export interface IGetAbout {
  results: IAbout[];
}

export interface IAbout {
  id?: number;
  main_title?: string;
  main_desc?: string;
  title1?: string;
  text1?: string;
  title2?: string;
  text2?: string;
  img?: string;
}

export interface IBa {
  banner: {
    id?: number;
    h1?: string;
    alt?: string;
    img?: string;
    description?: string;
  };
  section: {
    title1?: string;
    text1?: string;
    title2?: string;
    text2?: string;
  };
}
