import { Product } from "./Cart";
import { CATEGORIES } from "./Categories";
import { v4 as uuidv4 } from "uuid";
import { DISCOUNTS } from "./Discounts";

const levisMaleShoes = new Product(
  "Levi's shoes",
  CATEGORIES.MALE,
  uuidv4(),
  100
);

const nikeFemaleShoes = new Product(
  "Nike shoes",
  CATEGORIES.FEMALE,
  uuidv4(),
  125,
  DISCOUNTS.TWENTY_PERCENT_DISCOUNT
);

const adidasChildrenShoes = new Product(
  "New Balance shoes",
  CATEGORIES.CHILDREN,
  uuidv4(),
  125,
  DISCOUNTS.FIFTY_PERCENT_DISCOUNT
);

const shoePolish = new Product(
  "shoe polish",
  CATEGORIES.ACCESSORIES,
  uuidv4(),
  30,
  DISCOUNTS.THIRTY_PERCENT_DISCOUNT
);

const gucciShoes = new Product(
  "Gucci shoes",
  CATEGORIES.PREMIUM,
  uuidv4(),
  4000
);
