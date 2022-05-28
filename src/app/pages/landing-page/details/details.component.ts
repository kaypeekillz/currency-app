import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from 'src/app/core/services/currency/currency.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  currencyName: string;
  currencyFullname: string;
  currencyTypes: any[] = [];
  details: any;
  page: number = 1;

  constructor(private activatedRoute: ActivatedRoute,
    private currencyService: CurrencyService) {
    this.activatedRoute.params.subscribe(param => {
      this.currencyName = param.name;
      this.currencyFullname = param.fullname;
      this.getCurrency(param.name);
    })
  }

  ngOnInit(): void {
    
  }

  getCurrency(name: string) {
    this.currencyService.getCurrency(name).subscribe(response => {
      this.details = response;
      let data = Object.keys(response).map(function (key) {
        return [key, response[key]];
      });
      let dataObject = data[1][1];
      this.currencyTypes = Object.keys(dataObject).map(function (key) {
        return [key, dataObject[key]];
      });
    });
  }

}
