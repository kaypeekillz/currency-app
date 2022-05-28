import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  loader: any;
  loaderTxt: string = "Please Wait";
  status:any;
  constructor(private loaderService:LoaderService) { }

  ngOnInit() {
    this.loaderService.showLoader.subscribe(
      res => {
        this.status = res['show'];
        if(this.status){
          this.loader = environment.loader;
        }
      }
    )
    
  }
}
