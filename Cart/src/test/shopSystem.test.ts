import { CATEGORIES } from "../app/Categories";
import { levisMaleShoes } from "../app/ProductsList";
import { ShopSystem, IShopSystem } from "../app/ShopSystem";
import { exampleProduct, exampleProduct2 } from "./Basket.test";

describe("shopList test suite", () => {
  let exampleShopSystem: IShopSystem;
  let newBasketID: string;
  beforeEach(() => {
    exampleShopSystem = ShopSystem.getInstance();
    exampleShopSystem.addNewBasket();
    newBasketID = [...exampleShopSystem.baskets.items.keys()][0];
    exampleShopSystem.addProductToShop(exampleProduct.id, exampleProduct, 6);
    exampleShopSystem.addProductToShop(exampleProduct2.id, exampleProduct2, 4);
  });

  afterEach(() => {
    exampleShopSystem.resetInstance();
  });

  it("should change product category", () => {
    exampleShopSystem.changeProductCategory(exampleProduct.id, CATEGORIES.MALE);
    const exampleProductCategory = exampleShopSystem.shopProducts.items.get(
      exampleProduct.id
    ).product.category;
    expect(exampleProductCategory).toBe("MALE");
  });
  it("should add product to basket, if its amount is available in ShopProducts", () => {
    exampleShopSystem.addProductToBasket(exampleProduct.id, 5, newBasketID);
    const amountOfExampleProductInBasket =
      exampleShopSystem.shopProducts.items.get(exampleProduct.id).amount;
    expect(amountOfExampleProductInBasket).toBe(10);
  });
  it("should add product to basket, if its amount is available in ShopProducts and change its amount in ShopProducts when basket is finalized", () => {
    exampleShopSystem.addProductToBasket(exampleProduct.id, 5, newBasketID);
    exampleShopSystem.finalizeBasket(newBasketID);
    const amountOfExampleProductInShopSystem =
      exampleShopSystem.shopProducts.items.get(exampleProduct.id).amount;
    expect(amountOfExampleProductInShopSystem).toBe(1);
  });
  it("should add basket finalized basket ", () => {
    exampleShopSystem.addProductToBasket(exampleProduct.id, 6, newBasketID);
    exampleShopSystem.finalizeBasket(newBasketID);
    const isBasketAvailableInFinalizedList =
      exampleShopSystem.finalizedBaskets.items.has(newBasketID);
    expect(isBasketAvailableInFinalizedList).toBeTruthy();
  });
  describe("should throw error, when: ", () => {
    it("amount of Product added to basket is higher than in ShopProducts", () => {
      function expectError() {
        exampleShopSystem.addProductToBasket(
          exampleProduct.id,
          20,
          newBasketID
        );
      }
      expect(expectError).toThrow();
    });

    it("amount of Product we want to delete is higher than available", () => {
      function expectError() {
        exampleShopSystem.deleteProductFromShop(exampleProduct.id, 7);
      }
      expect(expectError).toThrow();
    });
    it("product that is not available in ShopSystem is added to basket", () => {
      function expectError() {
        exampleShopSystem.addProductToBasket(levisMaleShoes.id, 6, newBasketID);
      }
      expect(expectError).toThrow();
    });
    it("there is more than one basket with the same product, when summed amount is higher than available in ShopProducts and we want to finalize both", () => {
      function expectError() {
        exampleShopSystem.addNewBasket();
        exampleShopSystem.addProductToBasket(exampleProduct.id, 6, newBasketID);
        exampleShopSystem.addProductToBasket(
          exampleProduct.id,
          6,
          [...exampleShopSystem.baskets.items.keys()][1]
        );
        exampleShopSystem.finalizeBasket(newBasketID);
        exampleShopSystem.finalizeBasket(
          [...exampleShopSystem.baskets.items.keys()][0]
        );
      }
      expect(expectError).toThrow();
    });
  });
});
