import { Component, OnInit } from '@angular/core';
import { ProductModel } from './product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title:String ="Product List";
  //Product is the model class for a product item
  products: ProductModel[];
  //image properties
  imageWidth:number = 50;
  imageMargin:number = 2;

  showImage: boolean = false;
  //creating service object for calling getProducts()
  constructor(private productService:ProductService, public router:Router) { }

  toggleImage():void{
    this.showImage =!this.showImage; 
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data:any)=>{
      this.products = JSON.parse(JSON.stringify(data));
    })
  }

  onedit(product)
  {
    this.productService.selectedProduct = product;
    console.log(this.productService.selectedProduct);
    this.router.navigate(['/update']);
  }

  ondlt(product)
  {
    this.productService.deleteProduct(product._id);
    alert("Product deleted");
    // this.router.navigate(['/']);
    window.location.reload();
  }
}
