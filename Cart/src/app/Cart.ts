import { CATEGORIES, Categories } from "./Categories";
import { DISCOUNTS, Discounts } from "./Discounts";
import { v4 as uuidv4 } from "uuid";

export interface IProduct {
  name: string;
  category: Categories;
  id: string;
  price: number;
  discount?: Discounts;
  calculateDiscount: () => number;
  setNewName: (name: string) => void;
  setNewPrice: (price: number) => void;
  setNewCategory: (category: Categories) => void;
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
    id: string,
    price: number,
    discount?: Discounts
  ) {
    this.isPriceMoreThanZero();
    this.name = name;
    this.isProductEmptyString();
    this.category = category;
    this.id = uuidv4();
    this.price = price;
    this.discount = discount;
    this.calculateDiscount();
  }

  isProductEmptyString = () => {
    if (this.name.length === 0) {
      throw new Error("Please type something :)");
    }
  };

  isPriceMoreThanZero = () => {
    if (this.price < 0) {
      throw new Error("Price can't be less than 0");
    }
  };

  calculateDiscount = (): number => {
    if (this.discount > 0) {
      return (this.price = this.price - this.price * (this.discount / 100));
    }
    return this.price;
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
}

const maleJeans = new Product(
  "22",
  CATEGORIES.ACCESSORIES,
  uuidv4(),
  20,
  DISCOUNTS.FIFTY_PERCENT_DISCOUNT
);

console.log(maleJeans);
