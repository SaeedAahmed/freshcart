import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { product } from './../../product';
import { CartService } from 'src/app/shared/srvices/cart.service';
import { WishlistService } from 'src/app/shared/srvices/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _Router: Router,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  navCartNumber: number = 0;
  navWisthListNumber: number = 0;
  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (done) => {
        this.navCartNumber = done;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._WishlistService.wishListNumber.subscribe({
      next: (done) => {
        this.navWisthListNumber = done;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._CartService.getUserCart().subscribe({
      next: (done) => {
        this.navCartNumber = done.numOfCartItems;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._WishlistService.getWishList().subscribe({
      next: (done) => {
        console.log(done);
        this.navWisthListNumber = done.data.length;
      },
    });
  }

  logOut() {
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login']);
  }

  scrolled: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.scrolled = window.scrollY > 0;
    console.log('hello');
  }
}
