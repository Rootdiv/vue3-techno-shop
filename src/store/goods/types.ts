import { Product, Status } from '@/store/types';

export type Goods = {
  goods: Product[];
  page: number;
  pages: number;
};

export interface IGoodsState {
  items: Product[];
  page: number;
  pages: number;
  status: Status;
}
