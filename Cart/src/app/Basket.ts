import { EXTRADISCOUNTS, ExtraDiscounts } from "./ExtraDiscounts";
import { IProduct, Product } from "./Product";
import { products } from "./ProductsList";
import { v4 as uuidv4 } from "uuid";

export interface IBasket {
  readonly id: string;
  productsList: IProduct[];
  extraDiscount?: ExtraDiscounts;
  finalizedAt?: Date;
  calculateBasketPrice: () => number;
  calculateDiscount: () => string;
  getProducts: () => IProduct[];
  deleteProduct: (phrase: string) => IProduct[];
  addProduct: (product: Product) => number;
  numberOfProducts: () => number;
}

class Basket implements IBasket {
  private DISCOUNT_TO_VALUE_MAPPER: Record<ExtraDiscounts, number> = {
    FIRST_SHOPPING: 10,
    ROLLING_LOUD_TICKET: 20,
    SUBSCRIBING_TO_NEWSLETTER: 30,
  };

  // constructor(
  //   public readonly id = uuidv4(),
  //   public products: IProduct[] = []
  // ) {}

  readonly id = uuidv4();
  productsList: IProduct[];
  extraDiscount?: ExtraDiscounts;
  finalizedAt?: Date;

  constructor(productsList: IProduct[] = [], extraDiscount?: ExtraDiscounts) {
    this.productsList = productsList;
    this.extraDiscount = extraDiscount;
  }

  calculateBasketPrice() {
    return Number(
      this.productsList
        .reduce((acc, element) => {
          acc += element.calculatePrice();
          return acc - (acc * this.getExtraDiscount()) / 100;
        }, 0)
        .toFixed(2)
    );
  }

  calculateDiscount() {
    const priceAfterDiscount = this.calculateBasketPrice();
    const priceWithoutDiscount = this.calculateElementsPrice();
    return (
      (
        ((priceWithoutDiscount - priceAfterDiscount) / priceWithoutDiscount) *
        100
      ).toFixed(2) + "%"
    );
  }

  getProducts() {
    return this.productsList;
  }

  deleteProduct(id: string): IProduct[] {
    return this.productsList.filter((element) => element.id !== id);
  }

  addProduct(product: Product) {
    return this.productsList.push(product);
  }

  numberOfProducts() {
    return this.productsList.length;
  }

  finalize() {
    this.finalizedAt = new Date();
  }

  setDiscount(discount: number) {
    if (discount < 0 && discount > 100) {
      throw new Error("Wrong discount provided, discount must be in rane");
    }
    this.extraDiscount = discount;
  }

  private calculateElementsPrice() {
    return this.productsList.reduce((acc, element) => {
      acc += element.price;
      return acc;
    }, 0);
  }
  private getExtraDiscount() {
    return this.extraDiscount > 0 ? this.extraDiscount : 0;
  }
}

export const myBasket = new Basket(
  products,
  EXTRADISCOUNTS.ROLLING_LOUD_TICKET
);

const myBasket2 = new Basket(products, EXTRADISCOUNTS.FIRST_SHOPPING);

export const shopping = [myBasket, myBasket2];

console.log(myBasket.calculateBasketPrice());
