import { Basket, IBasket } from "../app/Basket";
import { CATEGORIES } from "../app/Categories";
import { Product } from "../app/Product";

export const exampleProduct = new Product(
  "example Product",
  CATEGORIES.ACCESSORIES,
  2000
);
export const exampleProduct2 = new Product(
  "example2 Product",
  CATEGORIES.MALE,
  1500,
  30
);
describe("Basket test suite", () => {
  let exampleBasket: IBasket;
  beforeEach(() => {
    exampleBasket = new Basket();
    exampleBasket.addProduct(exampleProduct.id, exampleProduct, 10);
    exampleBasket.addProduct(exampleProduct2.id, exampleProduct2, 5);
  });
  it("should calculate basket price without discount", () => {
    expect(exampleBasket.calculateBasketPriceWithoutDiscount()).toBe(27500);
  });
  it("should calculate basket price after discount", () => {
    expect(exampleBasket.calculateBasketPriceAfterDiscount()).toBe(25250);
  });
  it("should calculate discount", () => {
    expect(exampleBasket.calculateDiscount()).toBe(0.08);
  });
  it("should add BonusCode and set its extra discount", () => {
    exampleBasket.addBonusCode("FIRST_SHOPPING");
    expect(exampleBasket.bonusCode).toBe("FIRST_SHOPPING");
    expect(exampleBasket.extraDiscount).toBe(10);
  });
  it("should finalize Basket", () => {
    exampleBasket.finalize();
    expect(exampleBasket.finalizedAt).toBeDefined();
  });
  describe("It should throw error when: ", () => {
    it("finalize empty Basket", () => {
      function expectError() {
        new Basket().finalize();
      }
      expect(expectError).toThrow();
    });
  });
});
