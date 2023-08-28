import { Basket, IBasket, myBasket } from "./Basket";
import { CATEGORIES, Categories } from "./Categories";
import { BonusCodes, BONUSCODES, availableBonusCodes } from "./BonusCodes";
import { IProduct, Product } from "./Product";
import {
  List,
  ProductList,
  adidasChildrenShoes,
  levisMaleShoes,
  shoePolish,
} from "./ProductsList";

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
  // showAndCalculateNumberOfProducts: (basketId: string) => IBasket[];
  // showListOfUsedDiscountCodes: () => IBasket[];
  // changeProductCategory: (id: string, category: Categories) => IProduct[];
  // listFinalizedBaskets: () => IBasket[];
}

class ShopSystem implements IShopSystem {
  baskets: BasketList;
  finalizedBaskets?: BasketList;
  // basketsToAccept?: BasketList;
  shopProducts: ProductList;

  constructor() {
    this.baskets = new BasketList();
    this.finalizedBaskets = new BasketList();
    // this.basketsToAccept = new BasketList();
    this.shopProducts = new ProductList();
  }

  addProductToShop(productID: string, product: Product, amount: number): void {
    this.shopProducts.addProductWithAmount(productID, product, amount);
  }
  deleteProductFromShop(productID: string, amount: number): void {
    this.shopProducts.deleteProductWithAmount(productID, amount);
  }
  isProductAvailableinShop(productID: string): boolean {
    this.isProductAvailableInShopSystem(productID, this.shopProducts);
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
    this.isProductAvailableInShopSystem(productID, this.shopProducts);
    this.isBasketAvailable(basketID);
    const basket = this.baskets.items.get(basketID);
    basket.addProduct(productID, product, amount);
    if (
      basket.productsList.items.get(productID).amount >
      this.shopProducts.items.get(productID).amount
    ) {
      throw new Error(
        `We have ${this.shopProducts.items.get(productID).amount} of ${
          this.shopProducts.items.get(productID).product.name
        } available.`
      );
    }
  }

  deleteProductFromBasket(
    productID: string,
    basketID: string,
    amount: number
  ): void {
    this.isProductAvailableInShopSystem(productID, this.shopProducts);
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
    let ListOfUsedBonusCodes = [];
    availableBonusCodes.forEach((value, key) => {
      if (value.wasUsed) {
        return ListOfUsedBonusCodes.push(key);
      }
    });
    if (ListOfUsedBonusCodes.length === 0) {
      throw new Error("Nothing was Used");
    }
    return ListOfUsedBonusCodes;
  }

  showListOfUnusedBonusCodes(): BonusCodes[] {
    let ListOfUnusedBonusCodes = [];
    availableBonusCodes.forEach((value, key) => {
      if (!value.wasUsed) {
        return ListOfUnusedBonusCodes.push(key);
      }
    });
    if (ListOfUnusedBonusCodes.length === 0) {
      throw new Error("Everything was Used");
    }
    return ListOfUnusedBonusCodes;
  }

  showProducts(): ProductList {
    return this.shopProducts;
  }

  finalizeBasket(basketID: string) {
    this.isBasketAvailable(basketID);
    this.baskets.items.get(basketID).finalize();
    this.isBonusCodeAvailable(this.baskets.items.get(basketID).bonusCode);
    this.differAmountOfProductsBetweenBasketAndShopProducts(
      this.baskets,
      basketID
    );
    this.finalizedBaskets.items.set(basketID, this.baskets.items.get(basketID));
    if (this.finalizedBaskets.items.get(basketID).bonusCode) {
      availableBonusCodes.get(
        this.finalizedBaskets.items.get(basketID).bonusCode
      ).wasUsed = true;
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
      const actualStock = this.shopProducts.items.get(
        element.product.id
      ).amount;
      this.shopProducts.items.get(element.product.id).amount =
        this.shopProducts.items.get(element.product.id).amount - element.amount;
      if (this.shopProducts.items.get(element.product.id).amount < 0) {
        throw new Error(
          `We have only ${actualStock} of ${element.product.name}.`
        );
      }
      if (this.shopProducts.items.get(element.product.id).amount === 0) {
        this.shopProducts.deleteProduct(element.product.id);
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

  private isProductAvailableInShopSystem(
    productID: string,
    list: ProductList
  ): void {
    if (!list.items.get(productID)) {
      throw new Error(
        `Product with ID: ${productID} is not available in our shop. Please remove Product from basket`
      );
    }
  }

  private isBasketAvailable(basketID: string): void {
    if (!basketID) {
      throw new Error("This basket wasn't created.");
    }
    if (!this.baskets.items.get(basketID)) {
      throw new Error(`Please add basket with id: ${basketID} to ShopSystem`);
    }
  }
}

const shopSystem = new ShopSystem();

shopSystem.addProductToShop(shoePolish.id, shoePolish, 10);

shopSystem.addProductToShop(levisMaleShoes.id, levisMaleShoes, 20);
shopSystem.addNewBasket();
shopSystem.addCreatedBasket(myBasket);

shopSystem.addProductToBasket(
  levisMaleShoes.id,
  levisMaleShoes,
  21,
  [...shopSystem.baskets.items.keys()][0]
);

shopSystem.addProductToBasket(
  levisMaleShoes.id,
  levisMaleShoes,
  1,
  [...shopSystem.baskets.items.keys()][1]
);
// shopSystem.addProductToBasket(shoePolish.id, shoePolish, 5, basketArray[0]);

shopSystem.finalizeBasket([...shopSystem.baskets.items.keys()][1]);

shopSystem.finalizeBasket([...shopSystem.baskets.items.keys()][0]);

console.dir(shopSystem.listFinalizedBasket(), { depth: null });
console.log(shopSystem.shopProducts);

// shopSystem.addBonusCode(
//   [...shopSystem.baskets.items.keys()][1],
//   "HAPPY_BASKET"
// );

// shopSystem.addProductToBasket(
//   levisMaleShoes.id,
//   levisMaleShoes,
//   5,
//   [...shopSystem.baskets.items.keys()][0]
// );

// console.log(shopSystem.finalizedBaskets);

// shopSystem.finalizeBasket(myBasket.id);

// shopSystem.addNewBasket();

// shopSystem.addProductToBasket(
//   shoePolish.id,
//   shoePolish,
//   5,
//   [...shopSystem.baskets.items.keys()][1]
// );

// shopSystem.addBonusCode(
//   [...shopSystem.baskets.items.keys()][1],
//   "FIRST_SHOPPING"
// );

// shopSystem.finalizeBasket([...shopSystem.baskets.items.keys()][1]);
// shopSystem.finalizeBasket([...shopSystem.baskets.items.keys()][0]);

// console.log(shopSystem.showListOfUnusedBonusCodes());

// console.log(availableBonusCodes);

// console.log(shopSystem.finalizedBaskets);

// console.log(shopSystem.baskets);
