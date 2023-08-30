import { CATEGORIES } from "../app/Categories";
import { Product } from "../app/Product";
import { levisMaleShoes } from "../app/ProductsList";

describe("Product class test suite", () => {
  const exampleProduct = new Product(
    "test Product",
    CATEGORIES.ACCESSORIES,
    300,
    20
  );
  it("should change name, category, price and discount", () => {
    const newProductName = "changed test Product";
    const newProductCategory = CATEGORIES.PREMIUM;
    const newProductPrice = 250;
    const newProductDiscount = 50;
    exampleProduct.setNewName(newProductName);
    exampleProduct.setNewPrice(newProductPrice);
    exampleProduct.setNewCategory(newProductCategory);
    exampleProduct.setNewDiscount(newProductDiscount);
    expect(exampleProduct.name).toBe(newProductName);
    expect(exampleProduct.price).toBe(newProductPrice);
    expect(exampleProduct.category).toBe(newProductCategory);
    expect(exampleProduct.discount).toBe(newProductDiscount);
  });
  it("should return price after discount", () => {
    expect(exampleProduct.calculatePrice()).toBe(125);
  });
  describe("it throws error when ", () => {
    it("- price is less than 0", () => {
      function expectError() {
        exampleProduct.setNewPrice(-10);
      }
      expect(expectError).toThrow();
    });
    it("- name is empty string", () => {
      function expectError() {
        exampleProduct.setNewName("");
      }
      expect(expectError).toThrow();
    });
  });
});
