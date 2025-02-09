import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from'@angular/common/http';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { PictureFilterComponent } from './picture-filter/picture-filter.component';
import { MobileFiltersComponent } from './mobile-filters/mobile-filters.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    HomeComponent,
    HeaderComponent,
    RestaurantsComponent,
    PictureFilterComponent,
    MobileFiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
