import { Basket } from "../app/Basket";
import { CATEGORIES } from "../app/Categories";
import { Product } from "../app/Product";
import { levisMaleShoes } from "../app/ProductsList";

describe("Basket test suite", () => {
  const exampleBasket = new Basket();
  const exampleProduct = new Product(
    "example Product",
    CATEGORIES.PREMIUM,
    2000,
    50
  );
  exampleBasket.addProduct(levisMaleShoes.id, levisMaleShoes, 5);
  exampleBasket.addProduct();
});
