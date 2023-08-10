import { IProduct, Product } from "./Product";
import { CATEGORIES } from "./Categories";
import { DISCOUNTS } from "./Discounts";

const levisMaleShoes = new Product(
  "Levi's shoes",
  CATEGORIES.MALE,
  100,
  DISCOUNTS.TWENTY_PERCENT_DISCOUNT
);

const nikeFemaleShoes = new Product("Nike shoes", CATEGORIES.FEMALE, 125);

const adidasChildrenShoes = new Product(
  "New Balance shoes",
  CATEGORIES.CHILDREN,
  125,
  DISCOUNTS.FIFTY_PERCENT_DISCOUNT
);

export const shoePolish = new Product(
  "shoe polish",
  CATEGORIES.ACCESSORIES,
  30,
  DISCOUNTS.THIRTY_PERCENT_DISCOUNT
);

export const gucciShoes = new Product("Gucci shoes", CATEGORIES.PREMIUM, 4000);

export const products: Product[] = [
  levisMaleShoes,
  nikeFemaleShoes,
  adidasChildrenShoes,
  shoePolish,
  gucciShoes,
];

export class ProductsList {
  constructor(public products: Map<string, IProduct>) {}

  addProduct(newProduct: Product) {
    return products.push(newProduct);
  }
  findProduct(id: string) {}
  deleteProduct(id: string) {}
}


const 

// typ map
console.log ()