import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor( private _HttpClient:HttpClient) { }
  
  wishListNumber:BehaviorSubject<number>=new BehaviorSubject(0)

  header:any={token: localStorage.getItem('userToken')}
  addToWishlist(productId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {productId:productId}, {headers:this.header})
  }
  getWishList():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers:this.header})
  }
 
  removeWishList(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers:this.header})
  }
}
