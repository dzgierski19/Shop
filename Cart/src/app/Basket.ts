import { IProduct, Product } from "./Product";
import { result } from "./ProductsList";
import { v4 as uuidv4 } from "uuid";

interface IBasket {
  readonly id: string;
  products: Product[];
}

class Basket implements IBasket {
  readonly id: string;
  products: Product[] = [];

  constructor(products: Product[]) {
    this.id = uuidv4();
    this.products = products;
  }

  calculateElementsPrice = () => {
    return this.products.reduce((acc, element) => {
      acc += element.calculatePriceWithDiscount();
      return acc;
    }, 0);
  };

  showElements = () => {
    return this.products;
  };

  deleteProduct = (phrase: string): Product[] => {
    return result.filter((element) => {
      if (element.name.toLowerCase().includes(phrase.toLowerCase())) {
        return false;
      }
      return true;
    });
  };

  numberOfProducts = () => {
    return this.products.length;
  };
}

const myBasket = new Basket(result);

const basketPrice = myBasket.numberOfProducts();

console.log(basketPrice);
// console.log(result);

class Basket1 {
  maxProducts: Number;
  private products: Product[] = [];

  addProduct = (product: Product) => {
    if (this.products.length > 2) {
      throw new Error("Please remove product");
    }
    this.products.push(product);
  };

  numberOfProducts() {
    return this.products.length;
  }
}
