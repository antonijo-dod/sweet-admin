import { TMeta } from './meta';

export type TCategory = {
  id: number;
  name: string;
  slug: string;
};

export type TCategories = {
  data: TCategory[];
  meta: TMeta;
};
