import { Product } from "./product.model";

export interface Category {
  id: number;
  categoryName: string;
  products: Array<Product>;
}