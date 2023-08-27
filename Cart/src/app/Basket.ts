import { BONUSCODES, BonusCodes } from "./BonusCodes";
import { IProduct, Product } from "./Product";
import { List, ProductList, nikeFemaleShoes, shoePolish } from "./ProductsList";
import { v4 as uuidv4 } from "uuid";

export interface IBasket {
  readonly id: string;
  productsList: ProductList;
  extraDiscount?: number;
  finalizedAt?: Date;
  calculateBasketPriceWithoutDiscount: () => number;
  calculateBasketPriceAfterDiscount: () => number;
  calculateDiscount: () => number;
  // getProducts: () => IProduct[];
  deleteProduct: (id: string, amount: number) => void;
  addProduct: (id: string, product: Product, amount: number) => void;
  setDiscount: (discount: number) => void;
  finalize: () => void;
}

export class Basket implements IBasket {
  readonly id = uuidv4();
  productsList: ProductList;
  extraDiscount?: number;
  finalizedAt?: Date;
  constructor() {
    this.productsList = new ProductList();
  }

  addProduct(id: string, product: Product, amount: number): void {
    this.productsList.addProductWithAmount(id, product, amount);
  }

  deleteProduct(id: string, amount: number): void {
    this.productsList.deleteProductWithAmount(id, amount);
  }

  calculateBasketPriceWithoutDiscount(): number {
    let basketPriceWithoutDiscount = 0;
    this.productsList.items.forEach((element) => {
      basketPriceWithoutDiscount += element.product.price * element.amount;
    });
    return basketPriceWithoutDiscount;
  }

  calculateBasketPriceAfterDiscount(): number {
    let basketPriceAfterDiscount = 0;
    this.productsList.items.forEach((element) => {
      basketPriceAfterDiscount +=
        element.product.calculatePrice() * element.amount;
    });
    if (this.extraDiscount) {
      return (basketPriceAfterDiscount =
        basketPriceAfterDiscount -
        basketPriceAfterDiscount * (this.extraDiscount / 100));
    }
    return basketPriceAfterDiscount;
  }

  calculateDiscount(): number {
    return Number(
      (
        1 -
        this.calculateBasketPriceAfterDiscount() /
          this.calculateBasketPriceWithoutDiscount()
      ).toFixed(2)
    );
  }

  // getProducts(): IProduct[] {
  //   return this.products;
  // }

  setDiscount(discount: number): void {
    this.isDiscountInRange(discount);
    this.extraDiscount = discount;
  }

  finalize() {
    this.finalizedAt = new Date();
  }

  private isDiscountInRange(discount: number) {
    if (discount < 0 || discount > 100) {
      throw new Error("Wrong discount provided, discount must be in range");
    }
    return discount;
  }
}

const myBasket = new Basket();

myBasket.addProduct(shoePolish.id, shoePolish, 5);

myBasket.addProduct(nikeFemaleShoes.id, nikeFemaleShoes, 5);

myBasket.setDiscount(5);
myBasket.finalize();

// console.dir(myBasket, { depth: null });
