import { IProduct, Product } from "./Cart";

interface IBasket {
  id: string;
  cartDiscount: number;
  cartTotalPrice: number;
  products: Product[];
}

class Basket implements IBasket {
  id: string;
  cartDiscount: number;
  cartTotalPrice: number;
  products: Product[] = [];

  constructor(
    id: string,
    cartDiscount: number,
    cartTotalPrice: number,
    products: Product[]
  ) {
    this.id = id;
    this.cartDiscount = cartDiscount;
    this.cartTotalPrice = cartTotalPrice;
    this.products = products;
  }

  sumAllProducts = (array: Product[]) => {
    return this.products.reduce((acc, curr) => this.Product.price + acc);
  };
}

const sundayShopping = new Basket();
