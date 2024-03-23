import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartService } from 'src/app/shared/srvices/cart.service';
import { WishlistService } from 'src/app/shared/srvices/wishlist.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent  {
}
