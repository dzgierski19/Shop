import { IProduct, Product } from "./Product";
import { result } from "./ProductsList";
import { v4 as uuidv4 } from "uuid";

interface IBasket {
  readonly id: string;
  products: IProduct[];
}

class Basket implements IBasket {
  // constructor(
  //   public readonly id = uuidv4(),
  //   public products: IProduct[] = []
  // ) {}

  readonly id = uuidv4();
  products: IProduct[];

  constructor(products: IProduct[] = []) {
    this.products = products;
  }

  calculateElementsPriceAfterDiscount() {
    return this.products.reduce((acc, element) => {
      acc += element.calculatePriceWithDiscount();
      return acc;
    }, 0);
  }

  calculateDiscount() {
    const priceAfterDiscount = this.calculateElementsPriceAfterDiscount();
    const priceWithoutDiscount = this.calculateElementsPrice();
    return (
      (
        ((priceWithoutDiscount - priceAfterDiscount) / priceWithoutDiscount) *
        100
      ).toFixed(2) + "%"
    );
  }

  showElements() {
    return this.products;
  }

  deleteProduct(phrase: string): IProduct[] {
    return this.products.filter((element) => {
      if (element.name.toLowerCase().includes(phrase.toLowerCase())) {
        return false;
      }
      return true;
    });
  }

  addProduct(product: Product) {
    this.products.push(product);
    return this.products;
  }

  numberOfProducts() {
    return this.products.length;
  }

  private calculateElementsPrice() {
    return this.products.reduce((acc, element) => {
      acc += element.price;
      return acc;
    }, 0);
  }
}

const myBasket = new Basket(result);

const basketWithNewProduct = myBasket.addProduct(result[0]);

console.log(basketWithNewProduct);
