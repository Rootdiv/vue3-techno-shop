export type Categories = {
  notebook: string;
  smartphone: string;
  smartwatch: string;
  tablets: string;
  monoblok: string;
  smart: string;
  monitor: string;
  ebook: string;
};

export interface ICategoriesState {
  categories: Categories;
}
