import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = [];
  total:number;
  propPhotourl:string = "https://realestate.azurewebsites.net/ImagesUpload/"

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
    this.sharedService.cartItems.subscribe(data=>{
      this.items = data;
      if(this.items){
        this.getTotalAmount(this.items);
      }
    });
  }

  onDelete(i:number){
    this.items.splice(i,1);
    this.sharedService.setCart(this.items);
    this.getTotalAmount(this.items);
  }

  validateInput(event:any, i:number){
    const qty = + event.target.value;
    if(qty < 1) {
    event.target.value = this.items[i].qty;
    return;
    }
    this.QtyUpdated(qty, i)
  }

  private QtyUpdated(qty:number, i:number){
    this.items[i].qty = qty;
    this.sharedService.setCart(this.items);
    this.getTotalAmount(this.items);
  }

  getTotalAmount(data){
    let sum = 0;
    for (const item of data){
      sum += item.price * item.qty;
    }
    this.total = sum;
  }

}
