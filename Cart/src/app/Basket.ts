import { BONUSCODES, BonusCodes } from "./BonusCodes";
import { IProduct, Product } from "./Product";
import {
  List,
  ProductList,
  ProductWithAmount,
  adidasChildrenShoesWithAmount,
  nikeFemaleShoesWithAmount,
  shoePolishWithAmount,
} from "./ProductsList";
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
  deleteProduct: (id: string) => void;
  addProduct: (id: string, product: IProduct) => void;
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

  addProduct(id: string, product: ProductWithAmount): void {
    this.productsList.addProduct(id, product);
  }

  deleteProduct(id: string): void {
    this.productsList.deleteProduct(id);
  }

  calculateBasketPriceWithoutDiscount(): number {
    let basketPriceWithoutDiscount = 0;
    this.productsList.items.forEach((element) => {
      basketPriceWithoutDiscount += element.price;
    });
    return basketPriceWithoutDiscount;
  }

  calculateBasketPriceAfterDiscount(): number {
    let basketPriceAfterDiscount = 0;
    this.productsList.items.forEach((element) => {
      if (!element.discount) {
        return (basketPriceAfterDiscount += element.price);
      }
      basketPriceAfterDiscount +=
        element.price - element.price * (element.discount / 100);
    });
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

myBasket.addProduct(shoePolishWithAmount.id, shoePolishWithAmount);

myBasket.addProduct(nikeFemaleShoesWithAmount.id, nikeFemaleShoesWithAmount);

myBasket.addProduct(
  adidasChildrenShoesWithAmount.id,
  adidasChildrenShoesWithAmount
);

console.log(myBasket);

console.log(myBasket.calculateDiscount());

myBasket.setDiscount(55);
myBasket.finalize();
console.log(myBasket);

// const myBasket2 = new Basket(productsFromProductsList);

//forEach

//zmienić na map
