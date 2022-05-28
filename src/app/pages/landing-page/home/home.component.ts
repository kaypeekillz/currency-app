import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyService } from 'src/app/core/services/currency/currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  currencies: any[] = [];
  page: number = 1;

  constructor(private router: Router, 
    private currencyService: CurrencyService,) { }

  ngOnInit(): void {
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
    this.getAllCurrencies();
  }

  getAllCurrencies() {
    this.currencyService.getAllCurencies().subscribe(response => {
      this.currencies = Object.keys(response).map(function (key) {
        return [key, response[key]];
      });
    });
  }

  view(item: string) {
    this.router.navigate([`/details/${item[0]}/${item[1]}`]);
  }

}
