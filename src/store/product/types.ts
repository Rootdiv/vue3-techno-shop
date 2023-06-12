import { Product, Status } from '@/store/types';

export interface IProductState extends Product {
  status: Status;
}
