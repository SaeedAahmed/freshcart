import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CheckoutService } from 'src/app/shared/srvices/checkout.service';
@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  constructor(private _CheckoutService: CheckoutService) {}
  orderData: any[] = [];
  totalProductsPrice: number = 0;
  numProduct: number = 6;
  userId: any;
  userProducts: any[] = [];
  ngOnInit(): void {
    this.loadOrders();
  }
  loadOrders() {
    if (localStorage.getItem('userToken') != null) {
      let encode: any = localStorage.getItem('userToken');
      let decode: any = jwtDecode(encode);
      this.userId = decode.id;
    }
    this._CheckoutService.getUserOrders(this.userId).subscribe({
      next: (res) => {
        //  console.log(res);
        this.orderData = res;
        this.userProducts = this.orderData.reduce(
          (products, order) => products.concat(order.cartItems),
          []
        );
        this.totalProductsPrice = this.userProducts.reduce(
          (total, product) => total + product.price,
          0
        );
      },
    });
  }
  createNewOrder() {
    const newOrder = {};
    this._CheckoutService.createOrder(newOrder).subscribe({
      next: (res) => {
        console.log(res);
        this.loadOrders();
      },
    });
  }
}
