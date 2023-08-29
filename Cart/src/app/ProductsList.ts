import { IProduct, Product } from "./Product";
import { CATEGORIES } from "./Categories";
import { DISCOUNTS } from "./Discounts";

export const levisMaleShoes = new Product(
  "Levi's shoes",
  CATEGORIES.MALE,
  100,
  DISCOUNTS.TWENTY_PERCENT
);

export const nikeFemaleShoes = new Product(
  "Nike shoes",
  CATEGORIES.FEMALE,
  125
);

export const adidasChildrenShoes = new Product(
  "New Balance shoes",
  CATEGORIES.CHILDREN,
  125,
  DISCOUNTS.FIFTY_PERCENT
);

export const shoePolish = new Product(
  "shoe polish",
  CATEGORIES.ACCESSORIES,
  30,
  DISCOUNTS.THIRTY_PERCENT
);

export const gucciShoes = new Product("Gucci shoes", CATEGORIES.PREMIUM, 4000);

// export const shoePolishWithAmount = { shoePolish, amount: 5 };
// export const adidasChildrenShoesWithAmount = {
//   adidasChildrenShoes,
//   amount: 10,
// };
// export const nikeFemaleShoesWithAmount = { nikeFemaleShoes, amount: 5 };
// export const levisMaleShoesWithAmount = { levisMaleShoes, amount: 3 };
// export const gucciShoesWithAmount = { gucciShoes, amount: 2 };

export const products = new Map<string, IProduct>();
products.set(levisMaleShoes.id, levisMaleShoes);
products.set(nikeFemaleShoes.id, nikeFemaleShoes);
products.set(adidasChildrenShoes.id, adidasChildrenShoes);
products.set(gucciShoes.id, gucciShoes);

export class List<T> {
  constructor(public items: Map<string, T> = new Map()) {}

  addItem(productID: string, product: T): void {
    this.items.set(productID, product);
  }

  findItem(id: string): T {
    return this.items.get(id);
  }

  deleteItem(id: string): void {
    this.items.delete(id);
  }
}

export type ProductWithAmount = { product: IProduct; amount: number };

export class ProductList extends List<ProductWithAmount> {
  addProductWithAmount(
    productID: string,
    product: Product,
    amount: number
  ): void {
    this.items.set(productID, { product, amount });
  }
  deleteProductWithAmount(productID: string, amount: number): void {
    this.isProductAvailable(productID);
    this.isAmountAvailable(productID, amount);
    const product = this.findItem(productID);
    const amountAfterDeleting = product.amount - amount;
    if (amountAfterDeleting === 0) {
      this.deleteItem(productID);
      return;
    }
    product.amount = amountAfterDeleting;
  }

  private isProductAvailable(id: string): void {
    if (!this.items.get(id)) {
      throw new Error("Product is not available");
    }
  }

  private isAmountAvailable(id: string, amount: number): void {
    const product = this.items.get(id);
    if (amount > product.amount) {
      throw new Error(
        `Maximum number of ${product.product.name} you can delete is ${product.amount}.`
      );
    }
  }
}

const productList = new ProductList();
productList.addProductWithAmount(levisMaleShoes.id, levisMaleShoes, 4);
productList.addProductWithAmount(shoePolish.id, shoePolish, 10);
productList.deleteProductWithAmount(shoePolish.id, 6);
productList.addProductWithAmount(nikeFemaleShoes.id, nikeFemaleShoes, 6);
productList.addProductWithAmount(levisMaleShoes.id, levisMaleShoes, 10);
productList.addProductWithAmount(gucciShoes.id, gucciShoes, 3);
productList.deleteProductWithAmount(gucciShoes.id, 2);
