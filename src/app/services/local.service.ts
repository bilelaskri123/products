import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Local } from '../models/Local';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  locals: Local[] = [];
  langue: string;
  endpoint = environment.endpoint;
  constructor(private http: HttpClient) {
  }
  getLocals() {
    this.langue = localStorage.getItem('langue');
    const queryParam = `?langue=${this.langue}`;
    return this.http.get<{locals: Local[]}>(this.endpoint + '/locals' + queryParam);
  }
}
