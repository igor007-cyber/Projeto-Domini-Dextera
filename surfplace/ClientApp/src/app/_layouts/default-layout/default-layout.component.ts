import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ShoppingCartService } from 'src/app/_services/shopping-cart.service';


@Component({
  selector: 'default-layout',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public shoppingCart: any[] = [];
  public currentUser;
  constructor(    private router: Router,
    private authenticationService: AuthenticationService,
    private shoppingCartService: ShoppingCartService,) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser();
    this.shoppingCart = this.shoppingCartService.loadCart();
  }

  getQuantityItems() {
    if (this.shoppingCart !== null) {
        return this.shoppingCart.map(x => {
            return x
        }).reduce((sum, current) => sum + (current ? current.quantity : 0), 0);
    } else {
        return 0;
    }
  }
  
  openShoppingCart() {
    if ((this.shoppingCart === null) ||
        (this.shoppingCart === undefined) ||
        (this.shoppingCart.length === 0)) {
        // return this.toastr.error('O Carrinho está vazio. Adicione produtos');
    }
    this.router.navigate(['/shoppingcart']);
  }
  
  onLogin() {
      this.router.navigate(['client-area-login']);
  }
  
  clientArea() {
    return this.router.navigate(['client-area-product']);
  }
  
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['index']);

  }

}
