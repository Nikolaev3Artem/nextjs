export interface IBanner {
  id?: number;
  h1?: string;
  description?: string;
  alt?: string;
  is_active?: boolean;
  img?: string;
  isMain?: boolean;
  defaultImg?: string;
}

export interface IGetBanner {
  results: IBanner[];
}
