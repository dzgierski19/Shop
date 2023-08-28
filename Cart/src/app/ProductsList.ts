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

  addProduct(productID: string, product: T): void {
    this.items.set(productID, product);
  }

  findProduct(id: string): boolean {
    return this.items.has(id);
  }

  deleteProduct(id: string): void {
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
    this.isAmountAvailable(productID, amount);
    const actualAmount = this.items.get(productID).amount;
    const amountAfterDeleting = actualAmount - amount;
    if (amountAfterDeleting === 0) {
      this.deleteProduct(productID);
    } else this.items.get(productID).amount = amountAfterDeleting;
  }

  private isAmountAvailable(id: string, amount: number): void {
    if (amount > this.items.get(id).amount) {
      throw new Error(
        `Maximum number of ${
          this.items.get(id).product.name
        } you can delete is ${this.items.get(id).amount}.`
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
