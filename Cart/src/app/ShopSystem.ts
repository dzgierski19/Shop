import { Basket, IBasket } from "./Basket";
import { CATEGORIES, Categories } from "./Categories";
import { DISCOUNTS } from "./Discounts";
import { BonusCodes, BONUSCODES } from "./BonusCodes";
import { IProduct } from "./Product";
import {
  List,
  ProductList,
  ProductWithAmount,
  levisMaleShoesWithAmount,
  products,
  shoePolishWithAmount,
} from "./ProductsList";

class BasketList extends List<IBasket> {}

interface IShopSystem {
  baskets: BasketList;
  // finalizedBaskets?: BasketList;
  finalizedBaskets?: Map<string, IBasket>;
  shopProducts: ProductList;
  addProductsToShop: (productID: string, product: IProduct) => void;
  deleteProductFromShop: (id: string) => void;
  isProductAvailableinShop: (productID: string) => boolean;
  // showAndCalculateNumberOfProducts: (basketId: string) => IBasket[];
  // showListOfUsedDiscountCodes: () => IBasket[];
  // changeProductCategory: (id: string, category: Categories) => IProduct[];
  // listFinalizedBaskets: () => IBasket[];
}

class ShopSystem implements IShopSystem {
  baskets: BasketList;
  // finalizedBaskets?: BasketList;
  finalizedBaskets?: Map<string, IBasket>;
  shopProducts: ProductList;
  private DISCOUNT_TO_VALUE_MAPPER: Record<BonusCodes, number> = {
    FIRST_SHOPPING: 10,
    ROLLING_LOUD_TICKET: 20,
    SUBSCRIBING_TO_NEWSLETTER: 30,
  };

  constructor() {
    this.baskets = new BasketList();
    this.finalizedBaskets = new Map<string, IBasket>();
    this.shopProducts = new ProductList();
  }

  addProductsToShop(productID: string, product: ProductWithAmount): void {
    this.shopProducts.addProduct(productID, product);
  }
  deleteProductFromShop(productID: string): void {
    this.shopProducts.deleteProduct(productID);
  }
  isProductAvailableinShop(productID: string): boolean {
    return this.shopProducts.findProduct(productID);
  }
  changeProductCategory = (id: string, category: Categories): void => {
    this.shopProducts.items.get(id).category = category;
  };

  addNewBasket(): void {
    const newBasket = new Basket();
    this.baskets.items.set(newBasket.id, newBasket);
  }

  addProductsToBasket(
    productID: string,
    product: ProductWithAmount,
    basketID: string
  ): void {
    if (!this.shopProducts.items.get(productID)) {
      throw new Error(
        "Product is not available at this time. Please try again later"
      );
    }
    if (!this.shopProducts.items.get(basketID)) {
      throw new Error(`Please add basket with id: ${basketID}`);
    }
    const basket = this.baskets.items.get(basketID);
    basket.addProduct(productID, product);
  }

  //   showAndCalculateNumberOfProducts = (basketId: string) => {
  //     if (this.baskets.has(basketId)) {
  //       const basket = this.baskets.get(basketId)
  //       const arr = Array.from(Object.values(basket))
  //       arr.reduce((acc, element
  //     ) => {acc.push([element.products.length, element.products]);
  //     return acc;
  //   }, []);
  // }

  // return Array.from(this.baskets.values()).reduce((acc, element) => {
  //   acc.push([element.products.length, element.products]);
  //   return acc;
  // }, []);

  // showListOfUsedDiscountCodes = () => {
  //   return this.baskets.reduce((acc, element) => {
  //     acc.push([element.id, element.extraDiscount]);
  //     return acc;
  //   }, []);
  // };

  // lista kodow i sprawdzenie czy ktos nie wykorzystuje go ponownie

  // showListOfUnusedDiscountCodes = () => {
  //   return this.baskets.reduce((acc, element) => {
  //     for (const [name, price] of Object.entries(EXTRADISCOUNTS)) {
  //       if (price !== element.extraDiscount) {
  //         acc.push(name);
  //       }
  //       return acc;
  //     }
  //   }, []);
  // };

  // listFinalizedBaskets = (): IBasket[] => {
  //   return this.baskets.reduce((acc, element) => {
  //     if (element.finalizedAt !== undefined) {
  //       acc.push([element, "FINALIZED: " + element.finalizedAt]);
  //     }
  //     return acc;
  //   }, []);
  // };

  addBonusCode(): void {}

  finalizeBasket(basketId: string) {
    if (!this.baskets.items.get(basketId)) {
      throw new Error("Basket is not available");
    }
    this.baskets.items.get(basketId).finalize();
    this.finalizedBaskets.set(basketId, this.baskets.items.get(basketId));
  }
}

// liste kodow rabatowych zrealizowanych i nie zrealizowanych, // UNIKALNE

// showAndCalculateNumberOfProducts liste produktow razem z ich iloscia (gdy klient realizuje koszyk liczba powinna sie zmienic), // inwentaryzacja
// zrealizowanie koszyka Basket
// listFinalizedBaskets liste zrealizowanych koszykow razem z data realizacji,
// OK changeProductCategory mozliwosc dodania produktu lub produktow do kategorii,
// OK deleteProductsFromShop usuniecie produktu lub produktow ze sklepu,
// OK addProductsToShop mozliwosc dodania produktu lub produktow do skelpu,

const shopSystem = new ShopSystem();
// shopSystem.addNewBasket();
shopSystem.addProductsToShop(shoePolishWithAmount.id, shoePolishWithAmount);

shopSystem.changeProductCategory(shoePolishWithAmount.id, CATEGORIES.CHILDREN);

shopSystem.addNewBasket();

console.log(shopSystem);

const a = shopSystem.baskets.items.keys()[0];

console.log(a);

// shopSystem.addProductsToBasket(
//   shoePolishWithAmount.id,
//   shoePolishWithAmount,
//   "ss"
// );

// console.log(shopSystem);
// console.log(shoePolishWithAmount);
// console.log(shopSystem);
// console.log(shopSystem.isProductAvailableinShop(shoePolishWithAmount.id));
