import { IProduct, Product } from "./Product";
import { CATEGORIES } from "./Categories";
import { DISCOUNTS } from "./Discounts";

const levisMaleShoes = new Product(
  "Levi's shoes",
  CATEGORIES.MALE,
  100,
  DISCOUNTS.TWENTY_PERCENT
);

const nikeFemaleShoes = new Product("Nike shoes", CATEGORIES.FEMALE, 125);

const adidasChildrenShoes = new Product(
  "New Balance shoes",
  CATEGORIES.CHILDREN,
  125,
  DISCOUNTS.FIFTY_PERCENT
);

const shoePolish = new Product(
  "shoe polish",
  CATEGORIES.ACCESSORIES,
  30,
  DISCOUNTS.THIRTY_PERCENT
);

const gucciShoes = new Product("Gucci shoes", CATEGORIES.PREMIUM, 4000);

export const shoePolishWithAmount = Object.assign(shoePolish, { amount: 5 });
export const adidasChildrenShoesWithAmount = Object.assign(
  adidasChildrenShoes,
  {
    amount: 10,
  }
);
export const nikeFemaleShoesWithAmount = Object.assign(nikeFemaleShoes, {
  amount: 6,
});
export const levisMaleShoesWithAmount = Object.assign(levisMaleShoes, {
  amount: 3,
});
export const gucciShoesWithAmount = Object.assign(gucciShoes, { amount: 2 });

// delete gucciShoes.category;
// const newPolish = Object.defineProperty(shoePolish, "amount", { value: 5 });

console.log(gucciShoes);

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

// {products: IProduct,
// amount: number}

export type ProductWithAmount = IProduct & { amount: number };

export class ProductList extends List<ProductWithAmount> {}

const productListWithAmounts = new ProductList();
productListWithAmounts.items.set(shoePolishWithAmount.id, shoePolishWithAmount);
productListWithAmounts.items.set(
  adidasChildrenShoesWithAmount.id,
  adidasChildrenShoesWithAmount
);
productListWithAmounts.items.set(gucciShoesWithAmount.id, gucciShoesWithAmount);
productListWithAmounts.items.set(
  nikeFemaleShoesWithAmount.id,
  nikeFemaleShoesWithAmount
);
productListWithAmounts.items.set(
  levisMaleShoesWithAmount.id,
  levisMaleShoesWithAmount
);

console.log(productListWithAmounts);
// shopProductsList.addProduct(shoePolish.id, shoePolish); // console.log(shopProductsList.findProduct(shoePolish.id)); // export const shopProductsList = new ProductList(products); // } //   amount: number //   ...IProduct, // {
// console.log(shopProductsList);
// console.log(shopProductsList.findProduct(shoePolish.id));
// console.log(shopProductsList.products.values());
// shopProductsList.deleteProduct(shoePolish.id);

// [...mapa]

// 1. Dlaczego, gdy w 48. linijce robie console.log to uwzglednia amount, a nie moge go przypisac do ProductListWithAmounts
// 2. projekt pod UOD

console.log(adidasChildrenShoes);
