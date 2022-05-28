import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

const routes = {
  getAllCurencies: 'currencies.json',
  getCurency: 'currencies',
};

@Injectable({
  providedIn: 'root'
})

export class CurrencyService extends BaseService<any> {

  constructor(http: HttpClient) {
    super(http);
  }

  getAllCurencies(): Observable<any> {
    return this.sendGet(this.baseUrl(`${routes.getAllCurencies}`));
  }
  
  getCurrency(name: string): Observable<any> {
    return this.sendGet(this.baseUrl(`${routes.getCurency}/${name}.json`));
  }

}
