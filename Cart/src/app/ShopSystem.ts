import { IBasket, myBasket, shopping } from "./Basket";
import { CATEGORIES, Categories } from "./Categories";
import { DISCOUNTS } from "./Discounts";
import { EXTRADISCOUNTS, ExtraDiscounts } from "./ExtraDiscounts";
import { IProduct } from "./Product";
import { gucciShoes, products, shoePolish } from "./ProductsList";

interface IShopSystem {
  baskets: Map<string, IBasket>;
  addProductsToShop: (...prod: IProduct[]) => IProduct[];
  deleteProductsFromShop: (id: string) => IProduct[];
  showAndCalculateNumberOfProducts: () => IBasket[];
  showListOfUsedDiscountCodes: () => IBasket[];
  changeProductCategory: (id: string, category: Categories) => IProduct[];
  listFinalizedBaskets: () => IBasket[];
}

class ShopSystem implements IShopSystem {
  baskets; //co tu wpisać
  constructor(baskets: IBasket[] = []) {
    this.baskets = baskets;
  }

  addProductsToShop = (...prod: IProduct[]): IProduct[] => {
    return [...prod, ...products];
  };

  deleteProductsFromShop = (id: string): IProduct[] => {
    return products.reduce((acc, element) => {
      if (element.id !== id) {
        acc.push(element);
      }
      return acc;
    }, []);
  };

  showAndCalculateNumberOfProducts = (): IBasket[] => {
    return this.baskets.reduce((acc, element) => {
      acc.push([element.product.length, element.products]);
      return acc;
    }, []);
  };

  showListOfUsedDiscountCodes = () => {
    return this.baskets.reduce((acc, element) => {
      acc.push([element.id, element.extraDiscount]);
      return acc;
    }, []);
  };

  // lista kodow i sprawdzenie czy ktos nie wykorzystuje go ponownie

  showListOfUnusedDiscountCodes = () => {
    return this.baskets.reduce((acc, element) => {
      for (const [name, price] of Object.entries(EXTRADISCOUNTS)) {
        if (price !== element.extraDiscount) {
          acc.push(name);
        }
        return acc;
      }
    }, []);
  };

  changeProductCategory = (id: string, category: Categories) => {
    return products.map((element) => {
      if (element.id === id) {
        element.category = category;
      }
      return element;
    });
  };

  listFinalizedBaskets = (): IBasket[] => {
    return this.baskets.reduce((acc, element) => {
      if (element.finalizedAt !== undefined) {
        acc.push([element, "FINALIZED: " + element.finalizedAt]);
      }
      return acc;
    }, []);
  };

  finalizeBasket(busketId: string) {}
  // znajduje koszytk
  // error jak nie ma
  // basket.finalize()

  addNewBasket() {}
}

// liste kodow rabatowych zrealizowanych i nie zrealizowanych, // UNIKALNE

// showAndCalculateNumberOfProducts liste produktow razem z ich iloscia (gdy klient realizuje koszyk liczba powinna sie zmienic), // inwentaryzacja
// zrealizowanie koszyka Basket
// listFinalizedBaskets liste zrealizowanych koszykow razem z data realizacji,
// changeProductCategory mozliwosc dodania produktu lub produktow do kategorii, I DODANIE TEGO NOWEGO PRODUKTU DO KATEGORII LUB MOZLIWOSC ZMIANY KATEGORII PRODUKTU
// deleteProductsFromShop usuniecie produktu lub produktow ze sklepu, MOZLIWOSC MODYFIKOWANIA PRODUCTSLIST
// addProductsToShop mozliwosc dodania produktu lub produktow do skelpu, DODANIE NOWEGO PRODUKTU

const shoppingSys = new ShopSystem(shopping);

console.log(shoppingSys.listFinalizedBaskets());
