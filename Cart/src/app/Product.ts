import { CATEGORIES, Categories } from "./Categories";
import { DISCOUNTS, Discounts } from "./Discounts";
import { v4 as uuidv4 } from "uuid";

export interface IProduct {
  name: string;
  category: Categories;
  readonly id: string;
  price: number;
  discount?: Discounts;

  setNewName: (name: string) => void;
  setNewPrice: (price: number) => void;
  setNewCategory: (category: Categories) => void;
  calculatePrice: () => number;
  setNewDiscount: (discount: Discounts) => void;
}

export class Product implements IProduct {
  readonly id = uuidv4();
  name: string;
  category: Categories;
  price: number;
  discount?: Discounts;
  constructor(
    name: string,
    category: Categories,
    price: number,
    discount?: Discounts
  ) {
    this.isProductEmptyString(name);
    this.isPriceMoreThanZero(price);
    // this.isDiscountInRange(discount);
    this.id = uuidv4();
    this.name = name;
    this.category = category;
    this.price = price;
    this.discount = discount;
  }

  setNewName = (name: string) => {
    this.isProductEmptyString(name);
    this.name = name.trim();
  };

  setNewPrice = (price: number) => {
    this.isPriceMoreThanZero(price);
    this.price = price;
  };

  setNewCategory = (category: Categories) => {
    this.category = category;
  };

  setNewDiscount = (discount: Discounts) => {
    // this.isDiscountInRange(discount);
    this.discount = discount;
  };
  calculatePrice = () => {
    if (this.discount) {
      return this.price - this.price * (this.discount / 100);
    }
    return this.price;
  };

  // private isDiscountInRange(discount: number): number {
  //   if (discount < 0 && discount > 100) {
  //     throw new Error("Wrong discount provided, discount must be in range");
  //   }
  //   return discount;
  // }

  private isProductEmptyString(name: string): void {
    if (name.length === 0) {
      throw new Error("Please type something");
    }
  }

  private isPriceMoreThanZero = (price: number) => {
    if (price < 0) {
      throw new Error("Price can't be less than 0");
    }
  };
}
