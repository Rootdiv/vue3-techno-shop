import { Product, Status } from '@/store/types';
import { IAddressState } from '@/store/address/types';

export type SendGoodsType = {
  orderGoods: {
    goods: Product;
    count: number;
  }[];
  delivery: number;
  discount: number;
  totalPrice: number;
  address: Omit<IAddressState, 'save'>;
};

export type sendCartType = {
  delivery: number;
  discount: number;
};

export type ProductsCountList = {
  id: string;
  price: number;
  count: number;
};

export interface ICartState {
  productsCountList: ProductsCountList[];
  cartProducts: Product[];
  cartIdList: string[];
  status: Status;
  agreeSend: boolean;
  sended: string;
}
