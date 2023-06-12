import { Status, Product } from '@/store/types';

export interface IRecommendedState {
  items: Product[];
  status: Status;
}
