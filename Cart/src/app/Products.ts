import { Product } from "./Cart";
import { CATEGORIES } from "./Categories";
import { v4 as uuidv4 } from "uuid";
import { DISCOUNTS } from "./Discounts";

const levisMaleShoes = new Product(
  "Levi's shoes",
  CATEGORIES.MALE,
  uuidv4(),
  100,
  DISCOUNTS.TWENTY_PERCENT_DISCOUNT
);

const nikeFemaleShoes = new Product(
  "Nike shoes",
  CATEGORIES.FEMALE,
  uuidv4(),
  125
);

const adidasChildrenShoes = new Product(
  "New Balance shoes",
  CATEGORIES.CHILDREN,
  uuidv4(),
  125,
  DISCOUNTS.FIFTY_PERCENT_DISCOUNT
);

const shoePolish = new Product(
  "shoe polish",
  CATEGORIES.ACCESSORIES,
  uuidv4(),
  30,
  DISCOUNTS.THIRTY_PERCENT_DISCOUNT
);

const gucciShoes = new Product(
  "Gucci shoes",
  CATEGORIES.PREMIUM,
  uuidv4(),
  4000
);

export const result = [
  levisMaleShoes,
  nikeFemaleShoes,
  adidasChildrenShoes,
  shoePolish,
  gucciShoes,
];

const sumAllProductsPrice = () => {
  const priceArray = result.reduce((acc, index) => {
    acc.push(index.price);
    return acc;
  }, []);
  return priceArray.reduce((acc, curr) => acc + curr);
};

const summedPrice = sumAllProductsPrice();

// const sumAllDiscounts = (result) => {
//   const priceArray = result.reduce((acc, index) => {
//     // if (!index.hasOwnProperty("discount")) {
//     // }
//     // acc.push(index.discount);
//     // return acc;
//     if ("discount" in index) {
//       acc.push(index.discount);
//     }
//     return acc;
//   }, []);
//   return priceArray;
//   return priceArray.reduce((acc, curr) => acc + curr);
// };

const filterProductsWithDiscount = () => {
  return result.filter((element) => {
    if (element.discount !== undefined) {
      return element;
    }
  });
};

const filteredProductsWithDiscount = filterProductsWithDiscount();

const sumDiscounts = () => {
  const discounts = filteredProductsWithDiscount.reduce((acc, index) => {
    const discount = index.price * (100 / (100 - index.discount)) - index.price;
    acc.push(discount);
    return acc;
  }, []);
  return discounts.reduce((acc, curr) => acc + curr);
};

const summedDiscounts = sumDiscounts();

const discount = ((summedDiscounts / summedPrice) * 100).toFixed(2) + "%";

console.log(discount);
// czy muszę wpisywać parametr
