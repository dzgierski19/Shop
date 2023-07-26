import { Product } from "./Product";
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

const shoePolish = new Product(
  "shoe polish",
  CATEGORIES.ACCESSORIES,
  30,
  DISCOUNTS.THIRTY_PERCENT_DISCOUNT
);

const gucciShoes = new Product("Gucci shoes", CATEGORIES.PREMIUM, 4000);

export const result: Product[] = [
  levisMaleShoes,
  nikeFemaleShoes,
  adidasChildrenShoes,
  shoePolish,
  gucciShoes,
];

// const filterProductsWithDiscount = (): Product[] => {
//   return result.filter((element) => {
//     if (element.discount !== undefined) {
//       return element;
//     }
//   });
// };

// const filteredProductsWithDiscount = filterProductsWithDiscount();

// const sumDiscounts = (): number => {
//   const discounts = filteredProductsWithDiscount.reduce((acc, index) => {
//     const discount = index.price * (100 / (100 - index.discount)) - index.price;
//     acc.push(discount);
//     return acc;
//   }, []);
//   return discounts.reduce((acc, curr) => acc + curr);
// };

// const summedDiscounts = sumDiscounts();

// const discount = ((summedDiscounts / summedPrice) * 100).toFixed(2) + "%";

// console.log(discount);

// czy muszę wpisywać parametr
