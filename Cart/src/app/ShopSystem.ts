import { Basket, IBasket } from "./Basket";
import { Categories } from "./Categories";
import { BonusCodes, availableBonusCodes } from "./BonusCodes";
import { IProduct, Product } from "./Product";
import { List, ProductList, levisMaleShoes, shoePolish } from "./ProductsList";

class BasketList extends List<Basket> {}

export interface IShopSystem {
  baskets: BasketList;
  finalizedBaskets?: BasketList;
  shopProducts: ProductList;
  addProductToShop: (
    productID: string,
    product: IProduct,
    amount: number
  ) => void;
  deleteProductFromShop: (productID: string, amount: number) => void;
  // isProductAvailableinShop: (productID: string) => boolean;
  changeProductCategory: (id: string, category: Categories) => void;
  addNewBasket: () => void;
  addProductToBasket: (
    productID: string,
    amount: number,
    basketID: string
  ) => void;
  deleteProductFromBasket: (
    productID: string,
    basketID: string,
    amount: number
  ) => void;
  addBonusCode: (basketID: string, bonusCode: BonusCodes) => void;

  showListOfUsedBonusCodes: () => BonusCodes[];
  showListOfUnusedBonusCodes: () => BonusCodes[];
  showProducts: () => ProductList;
  finalizeBasket: (basketID: string) => void;
  listFinalizedBasket: () => BasketList;
  resetInstance: () => void;
}

export class ShopSystem implements IShopSystem {
  private static instance: ShopSystem;
  baskets: BasketList;
  finalizedBaskets?: BasketList;
  shopProducts: ProductList;

  private constructor() {
    this.baskets = new BasketList();
    this.finalizedBaskets = new BasketList();
    this.shopProducts = new ProductList();
  }

  public static getInstance(): ShopSystem {
    if (!ShopSystem.instance) {
      ShopSystem.instance = new ShopSystem();
    }
    return ShopSystem.instance;
  }

  addProductToShop(productID: string, product: Product, amount: number): void {
    this.shopProducts.addProductWithAmount(productID, product, amount);
  }
  deleteProductFromShop(productID: string, amount: number): void {
    this.shopProducts.deleteProductWithAmount(productID, amount);
  }
  // isProductAvailableinShop(productID: string): boolean {
  //   this.isProductAvailableInShopSystem(productID);
  //   return true;
  // }
  changeProductCategory = (id: string, category: Categories): void => {
    this.shopProducts.findItem(id).product.category = category;
  };

  addNewBasket(): void {
    this.baskets.addItem(new Basket().id, new Basket());
  }

  addProductToBasket(
    productID: string,
    amount: number,
    basketID: string
  ): void {
    this.isProductAvailableInShopSystem(productID);
    const basket = this.baskets.findItem(basketID);
    const { amount: productAmount, product: foundProduct } =
      this.shopProducts.findItem(productID);
    if (amount > productAmount) {
      throw new Error(`We have ${amount} of ${foundProduct.name} available.`);
    }
    basket.addProduct(foundProduct.id, foundProduct, amount);
  }

  deleteProductFromBasket(
    productID: string,
    basketID: string,
    amount: number
  ): void {
    this.isProductAvailableInShopSystem(productID);
    this.isBasketAvailable(basketID);
    const basket = this.baskets.items.get(basketID);
    basket.deleteProduct(productID, amount);
  }

  addBonusCode(basketID: string, bonusCode: BonusCodes): void {
    this.isBasketAvailable(basketID);
    const basket = this.baskets.findItem(basketID);
    basket.bonusCode = bonusCode;
    this.isBonusCodeAvailable(basket.bonusCode);
    basket.extraDiscount = availableBonusCodes.get(basket.bonusCode).value;
  }

  showListOfUsedBonusCodes(): BonusCodes[] {
    const listOfUsedBonusCodes = [];
    availableBonusCodes.forEach((value, key) => {
      if (value.wasUsed) {
        return listOfUsedBonusCodes.push(key);
      }
    });
    return listOfUsedBonusCodes;
  }

  showListOfUnusedBonusCodes(): BonusCodes[] {
    const listOfUnusedBonusCodes = [];
    availableBonusCodes.forEach((value, key) => {
      if (!value.wasUsed) {
        return listOfUnusedBonusCodes.push(key);
      }
    });
    return listOfUnusedBonusCodes;
  }

  showProducts(): ProductList {
    return this.shopProducts;
  }

  finalizeBasket(basketID: string): void {
    this.isBasketAvailable(basketID);
    const basket = this.baskets.findItem(basketID);
    basket.finalize();
    if (basket.bonusCode) {
      console.log("aaaaa" + basket.bonusCode);
      this.isBonusCodeAvailable(basket.bonusCode);
    }
    this.differAmountOfProductsBetweenBasketAndShopProducts(basket);
    this.finalizedBaskets.addItem(basketID, basket);
    const finalizedBasket = this.finalizedBaskets.findItem(basketID);
    if (finalizedBasket.bonusCode) {
      availableBonusCodes.get(finalizedBasket.bonusCode).wasUsed = true;
    }
    this.deleteBasket(basketID);
  }

  listFinalizedBasket(): BasketList {
    return this.finalizedBaskets;
  }

  private deleteBasket(basketID: string) {
    this.isBasketAvailable(basketID);
    this.baskets.items.delete(basketID);
  }

  private differAmountOfProductsBetweenBasketAndShopProducts(basket: Basket) {
    basket.productsList.items.forEach((element) => {
      let product = this.shopProducts.findItem(element.product.id);
      if (!product) {
        throw new Error(
          `Product: ${element.product.name} is not available in our shop at this time.`
        );
      }
      product.amount -= element.amount;
      if (product.amount < 0) {
        throw new Error(
          `${element.product.name} product is not available in the amount: ${
            element.amount
          }, we need to add amount: ${-product.amount} to our ShopList.`
        );
      }
      if (product.amount === 0) {
        this.shopProducts.deleteItem(element.product.id);
      }
    });
  }

  resetInstance(): void {
    ShopSystem.instance = null;
  }

  private isBonusCodeAvailable(bonusCode: BonusCodes): void {
    if (availableBonusCodes.get(bonusCode).wasUsed === true) {
      throw new Error(`${bonusCode} is already used or is expired`);
    }
  }

  private isProductAvailableInShopSystem(productID: string): void {
    if (!this.shopProducts.findItem(productID)) {
      throw new Error(
        `Product with ID: ${productID} is not available in our shop. Please remove Product from basket`
      );
    }
  }

  private isBasketAvailable(basketID: string): void {
    if (!basketID) {
      throw new Error("This basket wasn't created.");
    }
    if (!this.baskets.findItem(basketID)) {
      throw new Error(`Please add basket with id: ${basketID} to ShopSystem`);
    }
  }
}

const shopSystem1 = ShopSystem.getInstance();

shopSystem1.addNewBasket();

shopSystem1.addProductToShop(levisMaleShoes.id, levisMaleShoes, 5);
shopSystem1.addProductToBasket(
  levisMaleShoes.id,
  5,
  [...shopSystem1.baskets.items.keys()][0]
);
shopSystem1.addBonusCode(
  [...shopSystem1.baskets.items.keys()][0],
  "FIRST_SHOPPING"
);

shopSystem1.finalizeBasket([...shopSystem1.baskets.items.keys()][0]);

// shopSystem1.deleteProductFromShop(levisMaleShoes.id, 7);
