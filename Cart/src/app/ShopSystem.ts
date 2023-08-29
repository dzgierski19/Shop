import { Basket, IBasket, myBasket } from "./Basket";
import { CATEGORIES, Categories } from "./Categories";
import { BonusCodes, BONUSCODES, availableBonusCodes } from "./BonusCodes";
import { IProduct, Product } from "./Product";
import { List, ProductList, levisMaleShoes, shoePolish } from "./ProductsList";

class BasketList extends List<IBasket> {}

interface IShopSystem {
  baskets: BasketList;
  finalizedBaskets?: BasketList;
  shopProducts: ProductList;
  addProductToShop: (
    productID: string,
    product: Product,
    amount: number
  ) => void;
  deleteProductFromShop: (productID: string, amount: number) => void;
  isProductAvailableinShop: (productID: string) => boolean;
}

class ShopSystem implements IShopSystem {
  baskets: BasketList;
  finalizedBaskets?: BasketList;
  shopProducts: ProductList;

  constructor() {
    this.baskets = new BasketList();
    this.finalizedBaskets = new BasketList();
    this.shopProducts = new ProductList();
  }

  addProductToShop(productID: string, product: Product, amount: number): void {
    this.shopProducts.addProductWithAmount(productID, product, amount);
  }
  deleteProductFromShop(productID: string, amount: number): void {
    this.shopProducts.deleteProductWithAmount(productID, amount);
  }
  isProductAvailableinShop(productID: string): boolean {
    this.isProductAvailableInShopSystem(productID);
    return true;
  }
  changeProductCategory = (id: string, category: Categories): void => {
    this.shopProducts.items.get(id).product.category = category;
  };

  addNewBasket(): void {
    this.baskets.items.set(new Basket().id, new Basket());
  }

  addCreatedBasket(basket: Basket): void {
    this.baskets.items.set(basket.id, basket);
    this.baskets.items.get(basket.id).productsList.items.forEach((element) => {
      if (!this.isProductAvailableinShop(element.product.id)) {
        throw new Error(`${element.product.name}`);
      }
    });
    // if (basket.bonusCode) {
    //   this.addBonusCode(basket.id, basket.bonusCode);
    // }
  }

  addProductToBasket(
    productID: string,
    product: Product,
    amount: number,
    basketID: string
  ): void {
    this.isProductAvailableInShopSystem(productID);
    this.isBasketAvailable(basketID);
    const basket = this.baskets.items.get(basketID);
    basket.addProduct(productID, product, amount);
    if (
      basket.productsList.items.get(productID).amount >
      this.shopProducts.items.get(productID).amount
    ) {
      throw new Error(
        `We have ${this.shopProducts.findItem(productID).amount} of ${
          this.shopProducts.findItem(productID).product.name
        } available.`
      );
    }
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

  addBonusCode(basketID: string, bonusCodeFromShopSystem?: BonusCodes): void {
    this.isBasketAvailable(basketID);
    const basket = this.baskets.items.get(basketID);
    basket.bonusCode = bonusCodeFromShopSystem;
    this.isBonusCodeProvidedInBasket(basketID);
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

  finalizeBasket(basketID: string) {
    this.isBasketAvailable(basketID);
    const basket = this.baskets.findItem(basketID);
    basket.finalize();
    this.isBonusCodeAvailable(basket.bonusCode);
    this.differAmountOfProductsBetweenBasketAndShopProducts(
      this.baskets,
      basketID
    );
    this.finalizedBaskets.items.set(basketID, basket);
    const finalizedBasket = this.finalizedBaskets.items.get(basketID);
    if (finalizedBasket.bonusCode) {
      availableBonusCodes.get(finalizedBasket.bonusCode).wasUsed = true;
    }
    this.deleteBasket(basketID);
  }

  listFinalizedBasket(): BasketList {
    return this.finalizedBaskets;
  }

  private isBonusCodeProvidedInBasket(basketID: string) {
    if (!this.baskets.items.get(basketID).bonusCode) {
      throw new Error("Please add bonus code in ShopSystem or in Basket");
    }
  }

  private deleteBasket(basketID: string) {
    this.isBasketAvailable(basketID);
    this.baskets.items.delete(basketID);
  }

  private differAmountOfProductsBetweenBasketAndShopProducts(
    list: BasketList,
    basketID: string
  ) {
    list.items.get(basketID).productsList.items.forEach((element) => {
      let actualAmountOfProduct = this.shopProducts.items.get(
        element.product.id
      ).amount;
      actualAmountOfProduct -= element.amount;
      if (actualAmountOfProduct < 0) {
        throw new Error(
          `We have only ${actualAmountOfProduct} of ${element.product.name}.`
        );
      }
      if (actualAmountOfProduct === 0) {
        this.shopProducts.deleteItem(element.product.id);
      }
    });
  }

  private isBonusCodeAvailable(bonusCode: BonusCodes): void {
    if (bonusCode) {
      if (availableBonusCodes.get(bonusCode).wasUsed === true) {
        throw new Error(`${bonusCode} is already used or is expired`);
      }
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

const shopSystem = new ShopSystem();

shopSystem.addProductToShop(shoePolish.id, shoePolish, 10);

shopSystem.addProductToShop(levisMaleShoes.id, levisMaleShoes, 20);
shopSystem.addCreatedBasket(myBasket);

shopSystem.addProductToBasket(
  levisMaleShoes.id,
  levisMaleShoes,
  20,
  [...shopSystem.baskets.items.keys()][0]
);

shopSystem.addProductToBasket(
  levisMaleShoes.id,
  levisMaleShoes,
  1,
  [...shopSystem.baskets.items.keys()][0]
);
shopSystem.finalizeBasket([...shopSystem.baskets.items.keys()][0]);

// shopSystem.finalizeBasket([...shopSystem.baskets.items.keys()][0]);

console.dir(shopSystem.listFinalizedBasket(), { depth: null });
console.log(shopSystem.shopProducts);
