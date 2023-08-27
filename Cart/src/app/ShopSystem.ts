import { Basket, IBasket } from "./Basket";
import { CATEGORIES, Categories } from "./Categories";
import { BonusCodes, BONUSCODES } from "./BonusCodes";
import { IProduct, Product } from "./Product";
import { List, ProductList, levisMaleShoes, shoePolish } from "./ProductsList";

class BasketList extends List<IBasket> {}

interface IShopSystem {
  baskets: BasketList;
  finalizedBaskets?: BasketList;
  shopProducts: ProductList;
  addProductToShop: (
    roductID: string,
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
  shopProducts: ProductList;
  DISCOUNT_TO_VALUE_MAPPER: Record<BonusCodes, number> = {
    FIRST_SHOPPING: 10,
    HAPPY_BASKET: 10,
    ROLLING_LOUD_TICKET: 20,
    SUBSCRIBING_TO_NEWSLETTER: 30,
  };

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
    this.isProductAvailableInShopSystem(productID, this.shopProducts);
    return true;
  }
  changeProductCategory = (id: string, category: Categories): void => {
    this.shopProducts.items.get(id).product.category = category;
  };

  addNewBasket(): void {
    this.baskets.items.set(new Basket().id, new Basket());
  }

  addProductToBasket(
    productID: string,
    product: Product,
    amount: number,
    basketID: string
  ): void {
    this.isProductAvailableInShopSystem(productID, this.shopProducts);
    this.isBasketAvailable(basketID, this.baskets);
    const basket = this.baskets.items.get(basketID);
    basket.addProduct(productID, product, amount);
  }

  isProductAmountAvailableInShop(amount, productID) {}

  deleteProductFromBasket(
    productID: string,
    basketID: string,
    amount: number
  ): void {
    this.isProductAvailableInShopSystem(productID, this.shopProducts);
    this.isBasketAvailable(basketID, this.baskets);
    const basket = this.baskets.items.get(basketID);
    basket.deleteProduct(productID, amount);
  }

  addBonusCode(bonusCode: BonusCodes, basketID: string): void {
    this.isBasketAvailable(basketID, this.baskets);
    const basket = this.baskets.items.get(basketID);
    this.isBonusCodeAvailable(bonusCode);
    basket.setDiscount(this.DISCOUNT_TO_VALUE_MAPPER[bonusCode]);
  }

  finalizeBasket(basketId: string) {
    this.isBasketAvailable(basketId, this.baskets);
    this.baskets.items.get(basketId).finalize();
    this.finalizedBaskets.items.set(basketId, this.baskets.items.get(basketId));
    if (this.finalizedBaskets.items.get(basketId).extraDiscount) {
      const keyFromBasket = Object.keys(this.DISCOUNT_TO_VALUE_MAPPER).find(
        (key) => {
          return (
            this.DISCOUNT_TO_VALUE_MAPPER[key] ===
            this.baskets.items.get(basketId).extraDiscount
          );
        }
      );
      delete this.DISCOUNT_TO_VALUE_MAPPER[keyFromBasket];
    }
  }

  private isBonusCodeAvailable(bonusCode: BonusCodes) {
    if (
      !Object.keys(this.DISCOUNT_TO_VALUE_MAPPER).filter(
        (element) => element === bonusCode
      )
    ) {
      throw new Error("This bonus code is already used or is expired");
    }
  }

  private isProductAvailableInShopSystem(
    productID: string,
    list: ProductList
  ): void {
    if (!list.items.get(productID)) {
      throw new Error(
        "Product is not available at this time. Please try again later"
      );
    }
  }

  private isBasketAvailable(basketID: string, list: BasketList): void {
    if (!list.items.get(basketID)) {
      throw new Error(`Please add basket to ShopList with id: ${basketID}`);
    }
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
}

// liste kodow rabatowych zrealizowanych i nie zrealizowanych, // UNIKALNE

// showAndCalculateNumberOfProducts liste produktow razem z ich iloscia (gdy klient realizuje koszyk liczba powinna sie zmienic), // inwentaryzacja
// zrealizowanie koszyka Basket
// listFinalizedBaskets liste zrealizowanych koszykow razem z data realizacji,
// OK changeProductCategory mozliwosc dodania produktu lub produktow do kategorii,
// OK deleteProductsFromShop usuniecie produktu lub produktow ze sklepu,
// OK addProductsToShop mozliwosc dodania produktu lub produktow do skelpu,

const shopSystem = new ShopSystem();
shopSystem.addProductToShop(shoePolish.id, shoePolish, 10);

shopSystem.changeProductCategory(shoePolish.id, CATEGORIES.CHILDREN);

shopSystem.addProductToShop(levisMaleShoes.id, levisMaleShoes, 20);

shopSystem.addNewBasket();
shopSystem.addNewBasket();

shopSystem.addProductToBasket(
  shoePolish.id,
  shoePolish,
  20,
  [...shopSystem.baskets.items.keys()][0]
);

shopSystem.addProductToBasket(
  levisMaleShoes.id,
  levisMaleShoes,
  10,
  [...shopSystem.baskets.items.keys()][1]
);

shopSystem.deleteProductFromBasket(
  levisMaleShoes.id,
  [...shopSystem.baskets.items.keys()][1],
  20
);

console.log(shopSystem, [...shopSystem.baskets.items.keys()][1]);

shopSystem.addBonusCode(
  BONUSCODES.FIRST_SHOPPING,
  [...shopSystem.baskets.items.keys()][1]
);

shopSystem.finalizeBasket([...shopSystem.baskets.items.keys()][1]);

shopSystem.addBonusCode(
  BONUSCODES.FIRST_SHOPPING,
  [...shopSystem.baskets.items.keys()][0]
);

console.log(shopSystem);
console.dir(shopSystem, { depth: null });
// console.log(shopSystem.DISCOUNT_TO_VALUE_MAPPER)

// 1. ustawiasz discount w shopsystemie dla koszyka
// 2. w shopd systemie sprawdzasz, czy ten kod jest dostępny
// 3. ustawiasz go w Basket
// 4. basket liczy sobie cene po znizce
// 5. jak koszyk się zrealizacuje, to ustawiasz kod na zuzyty
