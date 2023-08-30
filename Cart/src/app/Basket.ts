import { BONUSCODES, BonusCodes, availableBonusCodes } from "./BonusCodes";
import { IProduct, Product } from "./Product";
import {
  List,
  ProductList,
  adidasChildrenShoes,
  gucciShoes,
  levisMaleShoes,
  nikeFemaleShoes,
  shoePolish,
} from "./ProductsList";
import { v4 as uuidv4 } from "uuid";

export interface IBasket {
  readonly id: string;
  productsList: ProductList;
  bonusCode?: BonusCodes;
  extraDiscount?: number;
  finalizedAt?: Date;
  calculateBasketPriceWithoutDiscount: () => number;
  calculateBasketPriceAfterDiscount: () => number;
  calculateDiscount: () => number;
  deleteProduct: (id: string, amount: number) => void;
  addProduct: (id: string, product: Product, amount: number) => void;
  addBonusCode: (bonusCode: BonusCodes) => void;
  finalize: () => void;
}

export class Basket implements IBasket {
  readonly id = uuidv4();
  productsList: ProductList;
  bonusCode?: BonusCodes;
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

  addBonusCode(bonusCode: BonusCodes): void {
    this.bonusCode = bonusCode;
    this.setDiscount(availableBonusCodes.get(bonusCode).value);
  }

  finalize() {
    this.isBasketEmpty();
    this.finalizedAt = new Date();
  }

  private setDiscount(discount: number): void {
    this.isDiscountInRange(discount);
    this.extraDiscount = discount;
  }

  private isBasketEmpty(): void {
    if (this.productsList.items.size === 0) {
      throw new Error(
        `You can't finalize empty Basket. Please add some products to basket : ${this.id} !`
      );
    }
  }

  private isDiscountInRange(discount: number) {
    if (discount < 0 || discount > 100) {
      throw new Error("Wrong discount provided, discount must be in range");
    }
    return discount;
  }
}

export const myBasket = new Basket();

myBasket.addProduct(shoePolish.id, shoePolish, 5);
