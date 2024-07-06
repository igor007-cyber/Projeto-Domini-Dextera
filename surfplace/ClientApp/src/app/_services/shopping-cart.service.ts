import { Injectable } from '@angular/core';
import { ShoppingCart } from '../_model/shopping-cart-model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ShoppingCartService {

    constructor() {

    }

  removeCartProduct(item: ShoppingCart) {
    const cart = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('oxidu_shopping_cart'))).getValue();
    const index: number = cart.indexOf(item);
    cart.splice(index, 1);
    localStorage.removeItem('oxidu_shopping_cart');
    localStorage.setItem('oxidu_shopping_cart', JSON.stringify(cart));
  }

  loadCart() {
      return new BehaviorSubject<any>(JSON.parse(localStorage.getItem('oxidu_shopping_cart'))).getValue();
  }

  updateCart(item) {
    localStorage.removeItem('oxidu_shopping_cart');
    localStorage.setItem('oxidu_shopping_cart', JSON.stringify(item));
  }

  clearCart() {
    localStorage.removeItem('oxidu_shopping_cart');
  }

}
