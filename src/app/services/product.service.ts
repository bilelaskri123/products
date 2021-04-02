import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  endpoint = environment.endpoint + '/products';
  private products = [];
  private productsUpdated = new Subject<{
    products: any;
  }>();
  constructor(private http: HttpClient) {}
  getProducts(filterInput: string) {
    const langue = localStorage.getItem('langue');
    const local = localStorage.getItem('local');
    const category = localStorage.getItem('category');
    const queryParams = `?filterInput=${filterInput}&local=${local}&category=${category}&langue=${langue}`;
    this.http
      .get<{ products: any}>(this.endpoint + queryParams)
      .subscribe((productsData) => {
        console.log(productsData);
        this.products = productsData.products;
        this.productsUpdated.next({
          products: [...this.products],
        });
      });
  }
  getProductsUpdateListener() {
    return this.productsUpdated.asObservable();
  }
}
