import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActiveFilters } from 'src/app/interfaces/active-filters';
import { Filter } from 'src/app/interfaces/filter';
import { PriceRange } from 'src/app/interfaces/price-range';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  curFilters: ActiveFilters = {filters: [], deliveryTimes: [], priceRanges: []};

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

  updateDeliveryTimes(times: number[]) {
    this.curFilters.deliveryTimes = times;
    this.updateEmit.next(this.curFilters);
  }

  updateRanges(ranges: PriceRange[]) {
    this.curFilters.priceRanges = ranges;
    this.updateEmit.next(this.curFilters);
  }
}
