import { IAddressState } from './address/types';
import { ICartState } from './cart/types';
import { ICategoriesState } from './categories/types';
import { IGoodsState } from './goods/types';
import { IProductState } from './product/types';
import { IRecommendedState } from './recommended/types';

export type Image = {
  present: string;
  large: string[];
  small: string[];
};

export type Product = {
  id: string;
  title: string;
  price: number;
  display: number;
  color: string;
  description: string[];
  characteristic: object;
  category: string;
  categoryRus: string;
  images: Image;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type RootState = {
  goods: IGoodsState;
  categories: ICategoriesState;
  recommended: IRecommendedState;
  product: IProductState;
  cart: ICartState;
  address: IAddressState;
};
