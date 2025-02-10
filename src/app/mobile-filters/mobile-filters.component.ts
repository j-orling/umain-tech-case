import { Component } from '@angular/core';
import { FiltersService } from 'src/services/filters.service';
import { DeliveryTime } from '../interfaces/delivery-time';

@Component({
  selector: 'app-mobile-filters',
  templateUrl: './mobile-filters.component.html',
  styleUrls: ['./mobile-filters.component.scss']
})
export class MobileFiltersComponent {
  activeTimes: DeliveryTime[] = [];
  deliveryTimes: DeliveryTime[] = [];

  constructor (private fService: FiltersService) {
    this.deliveryTimes = this.fService.deliveryTimeOptions;
  }

  updateFilters(time: DeliveryTime) {
    let index: number = this.activeTimes.indexOf(time);
    if(index > -1) {
      this.activeTimes.splice(index, 1);
    }
    else {
      this.activeTimes.push(time);
    }

    this.fService.updateDeliveryTimes(this.activeTimes);
  }

  timeActive(time: string) {

  }

}
