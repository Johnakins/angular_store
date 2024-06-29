import { Component } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {
  cart : Cart = {items : []};
  cartSubscription: Subscription | undefined;

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product', 'name','price','quantity','total','action'
  ];

  constructor(private cartService: CartService, private http: HttpClient){}

 ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = _cart.items;
    });
  }

  onRemoveQuantity(item: CartItem){
    this.cartService.removeQuantity(item);
  }


  onAddQuantity(item: CartItem){
    this.cartService.addToCart(item);
  };

  getTotal(items: CartItem[]) :number {
    return items.
    map(item => item.price * item.quantity)
    .reduce((prev,current)=> prev + current, 0);
  };

  onClearCart(){
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem){
    this.cartService.removeFromCart(item);
  }

  onCheckout(){};
}
