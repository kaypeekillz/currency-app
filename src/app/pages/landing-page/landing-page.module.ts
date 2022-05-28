import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
  
@NgModule({
  declarations: [
    LandingPageComponent,
    HomeComponent,
    DetailsComponent
  ],

  imports: [
    CommonModule,
    LandingPageRoutingModule,
    NgxPaginationModule,
    SharedModule
  ]
  
})
export class LandingPageModule { }
