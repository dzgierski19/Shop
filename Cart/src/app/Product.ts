import { CATEGORIES, Categories } from "./Categories";
import { DISCOUNTS, Discounts } from "./Discounts";
import { v4 as uuidv4 } from "uuid";

export interface IProduct {
  name: string;
  category: Categories;
  id: string;
  price: number;
  discount?: Discounts;
  setNewName: (name: string) => void;
  setNewPrice: (price: number) => void;
  setNewCategory: (category: Categories) => void;
  calculatePriceWithDiscount: (price: number) => number;
}

export class Product implements IProduct {
  name: string;
  category: Categories;
  readonly id: string;
  price: number;
  discount?: Discounts;

  constructor(
    name: string,
    category: Categories,
    price: number,
    discount?: Discounts
  ) {
    this.isPriceMoreThanZero(price);
    this.isProductEmptyString(name);
    this.name = name;
    this.category = category;
    this.id = uuidv4();
    this.price = price;
    this.discount = discount;
  }

  isProductEmptyString = (name: string) => {
    if (name.length === 0) {
      throw new Error("Please type something :)");
    }
  };

  isPriceMoreThanZero = (price: number) => {
    if (price < 0) {
      throw new Error("Price can't be less than 0");
    }
  };

  setNewName = (name: string) => {
    this.name = name;
  };
  setNewPrice = (price: number) => {
    this.price = price;
  };
  setNewCategory = (category: Categories) => {
    this.category = category;
  };
  calculatePriceWithDiscount = () => {
    if (this.discount > 0) {
      return this.price - this.price * (this.discount / 100);
    }
    return this.price;
  };
}

const levisMaleShoes = new Product(
  "Levi's shoes",
  CATEGORIES.MALE,
  100,
  DISCOUNTS.TWENTY_PERCENT_DISCOUNT
);
