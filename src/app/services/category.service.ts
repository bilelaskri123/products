import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../models/Category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  langue: string;
  endpoint = environment.endpoint;
  constructor(private http: HttpClient) {
  }
  getCategories() {
    this.langue = localStorage.getItem('langue');
    const queryParam = `?langue=${this.langue}`;
    return this.http.get<{categories: Category[]}>(this.endpoint + '/categories' + queryParam);
  }
}
