import { Product } from "./Cart";
import { CATEGORIES } from "./Categories";
import { v4 as uuidv4 } from "uuid";
import { DISCOUNTS } from "./Discounts";

const levisMaleShoes = new Product(
  "Levi's Jeans",
  CATEGORIES.MALE,
  uuidv4(),
  100
);

const wranglerFemaleShoes = new Product(
  "Wrangler Jeans",
  CATEGORIES.FEMALE,
  uuidv4(),
  125,
  DISCOUNTS.TWENTY_PERCENT_DISCOUNT
);
