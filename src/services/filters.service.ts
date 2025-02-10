import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActiveFilters } from 'src/app/interfaces/active-filters';
import { DeliveryTime } from 'src/app/interfaces/delivery-time';
import { Filter } from 'src/app/interfaces/filter';
import { PriceRange } from 'src/app/interfaces/price-range';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  curFilters: ActiveFilters = {filters: [], deliveryTimes: [], priceRanges: []};
  deliveryTimeOptions: DeliveryTime[] = [
    {label: '0 - 10 min', minutes: 10},
    {label: '10 - 30 min', minutes: 30},
    {label: '30 - 60 min', minutes: 60},
    {label: '1 hour+', minutes: 99}
  ];

  private updateEmit = new Subject<ActiveFilters>();

  constructor() { }

  updateRestaurants(filters: ActiveFilters) {
    this.curFilters = filters;
    this.updateEmit.next(filters);
  }

  getUpdates(): Observable<ActiveFilters> {
    return this.updateEmit.asObservable();
  }

  updateFilters(filters: Filter[]) {
    this.curFilters.filters = filters;
    this.updateEmit.next(this.curFilters);
  }

  updateDeliveryTimes(times: DeliveryTime[]) {
    this.curFilters.deliveryTimes = times;
    this.updateEmit.next(this.curFilters);
  }

  updateRanges(ranges: PriceRange[]) {
    this.curFilters.priceRanges = ranges;
    this.updateEmit.next(this.curFilters);
  }
}
