import { IProduct, Product } from "../app/Product";
import {
  ProductList,
  ProductWithAmount,
  levisMaleShoes,
  shoePolish,
} from "../app/ProductsList";

describe("ProductsList test suite", () => {
  let exampleProductList: ProductList;
  let exampleProduct: ProductWithAmount;

  beforeEach(() => {
    exampleProductList = new ProductList();
    exampleProductList.addProductWithAmount(
      levisMaleShoes.id,
      levisMaleShoes,
      5
    );
    exampleProduct = exampleProductList.items.get(levisMaleShoes.id);
  });

  it("should contain new added product if product is not available in ProductList ", () => {
    expect(exampleProduct.amount).toBe(5);
  });
  it("should change product amount when adding product if product is already in ProductList", () => {
    exampleProductList.addProductWithAmount(
      exampleProduct.product.id,
      exampleProduct.product,
      5
    );
    expect(exampleProduct.amount).toBe(10);
  });
  it("should change product amount when deleting product if product is already in ProductList", () => {
    exampleProductList.deleteProductWithAmount(exampleProduct.product.id, 3);
  });
  it("should delete product from ProductList if product with the same amount is already in ProductList", () => {
    exampleProductList.deleteProductWithAmount(exampleProduct.product.id, 5);
    expect(exampleProduct).toBeFalsy;
  });
  describe("should throw Error when: ", () => {
    it("amount that we want to delete is higher than actual amount of Product", () => {
      function expectError() {
        exampleProductList.deleteProductWithAmount(
          exampleProduct.product.id,
          6
        );
      }
      expect(expectError).toThrow();
    });
    it("product that we want to delete is not available in ProductList", () => {
      const exampleNotAvailableInProductList = shoePolish.id;
      function expectError() {
        exampleProductList.deleteProductWithAmount(
          exampleNotAvailableInProductList,
          6
        );
      }
      expect(expectError).toThrow();
    });
  });
});
