import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Price} from '../models/Price';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  endpoint = environment.endpoint + '/price';
  prices: Price[];
  constructor(private http: HttpClient) {
  }

  getPrices(productId: string) {
    return this.http.get<{prices: Price[]}>(this.endpoint + '/' + productId);
  }
}
