import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Subscription} from 'rxjs';
import {PriceService} from '../../services/price.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  show = false;
  products = [];
  filterInput = '';
  langue: string;
  // tslint:disable-next-line:max-line-length
  localsFr = ['tunis', 'ariena', 'Ben Arous', 'mannouba', 'bizerte', 'nabeul', 'beja', 'jendouba', 'zaghouan', 'siliana', 'Le Kef', 'sousse', 'monastir', 'mahdia', 'kasserine', 'sidi bouzid', 'kairouan', 'gafsa', 'sfax', 'gabes', 'médenine', 'tozeur', 'kebili' , 'tataouine'];
  localsAr = [ 'تونس', 'أريانة', 'بن عروس', 'منوبة', 'بنزرت', 'نابل', 'باجة', 'جندوبة', 'زغوان', 'سليانة', 'الكاف', 'سوسة', 'المنستير', 'المهدية', 'القصرين', 'سيدي بوزيد', 'القيروان', 'قفصة', 'صفاقس', 'قابس', 'مدنين', 'توزر', 'قبيلي', 'تطاوين'];
  private productsSub: Subscription;
  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.langue = localStorage.getItem('langue');
    this.getProducts(this.filterInput);
  }

  getProducts(filterInput: string) {
    this.productService.getProducts(filterInput);
    this.productsSub = this.productService
      .getProductsUpdateListener()
      .subscribe((productsData: { products: any }) => {
        this.products = productsData.products;
      });
  }

  showProduct(productId: string) {
    this.router.navigate(['/product-item', productId]);
  }

  showOption() {
    this.show = !this.show;
  }

  filter(event) {
    this.filterInput = event.target.value;
    this.getProducts(event.target.value);
  }

  /*selectInput(event) {
    this.filterSelect = event.target.value;
    this.getProducts(this.filterInput, this.filterSelect);
  }*/
}
