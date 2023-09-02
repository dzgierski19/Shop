import { CATEGORIES } from "../app/Categories";
import { IProduct, Product } from "../app/Product";
import { ProductList, shoePolish } from "../app/ProductsList";

describe("ProductsList test suite", () => {
  let exampleProductList: ProductList;
  let exampleProduct: IProduct;
  let exampleProduct2: IProduct;

  beforeEach(() => {
    exampleProductList = new ProductList();
    exampleProduct = new Product(
      "example Product",
      CATEGORIES.ACCESSORIES,
      2000
    );
    exampleProduct2 = new Product(
      "example2 Product",
      CATEGORIES.MALE,
      1500,
      30
    );
    exampleProductList.addProductWithAmount(
      exampleProduct.id,
      exampleProduct,
      5
    );
  });

  it("should contain new added product if product is not available in ProductList ", () => {
    exampleProductList.addProductWithAmount(
      exampleProduct2.id,
      exampleProduct2,
      5
    );
    const amountOfExampleProduct2 = exampleProductList.items.get(
      exampleProduct2.id
    ).amount;
    expect(amountOfExampleProduct2).toBe(5);
  });
  it("should change product amount when adding product if product is already in ProductList", () => {
    exampleProductList.addProductWithAmount(
      exampleProduct.id,
      exampleProduct,
      5
    );
    const amountOfExampleProduct = exampleProductList.items.get(
      exampleProduct.id
    ).amount;
    expect(amountOfExampleProduct).toBe(10);
  });
  it("should change product amount when deleting product if product is already in ProductList", () => {
    exampleProductList.deleteProductWithAmount(exampleProduct.id, 3);
  });
  it("should delete product from ProductList if product with the same amount is already in ProductList", () => {
    exampleProductList.deleteProductWithAmount(exampleProduct.id, 5);
    const isExampleProductAvailable = exampleProductList.items.has(
      exampleProduct.id
    );
    expect(isExampleProductAvailable).toBeFalsy();
  });
  describe("should throw Error when: ", () => {
    it("amount that we want to delete is higher than actual amount of Product", () => {
      function expectError() {
        exampleProductList.deleteProductWithAmount(exampleProduct.id, 6);
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
