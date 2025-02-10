import { Component, OnDestroy } from '@angular/core';
import { ServiceService } from 'src/services/service.service';
import { Filter } from '../interfaces/filter';
import { Subject } from 'rxjs';
import { PriceRange } from '../interfaces/price-range';
import { FiltersService } from 'src/services/filters.service';
import { ActiveFilters } from '../interfaces/active-filters';
import { DeliveryTime } from '../interfaces/delivery-time';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnDestroy {
  filters: Filter[] = [];
  ranges: PriceRange[] = [];
  deliveryTimes: DeliveryTime[] = [];

  activeTimes: DeliveryTime[] = [];
  activeFilters: Filter[] = [];
  activeRanges: PriceRange[] = [];

  unsub = new Subject<void>();

  constructor(private service: ServiceService, private updates: FiltersService) {
    // Always load filters
    this.service.getFilters().subscribe((a => {
      this.filters = a;
    }));

    this.service.getPriceRanges().subscribe((b => {
      this.ranges = b;
    }));

    this.deliveryTimes = this.updates.deliveryTimeOptions;
  }

  // Unsubscribe from all previous subscriptions when component unloads
  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }

  updateFilter(filter: Filter) {
    let index: number = this.activeFilters.indexOf(filter);
    if(index > -1) {
      this.activeFilters.splice(index, 1);
    }
    else {
      this.activeFilters.push(filter);
    }

    this.updateAll();
  }

  updateRanges(range: PriceRange) {
    let index: number = this.activeRanges.indexOf(range);
    if(index > -1) {
      this.activeRanges.splice(index, 1);
    }
    else {
      this.activeRanges.push(range);
    }

    this.updateAll();
  }

  updateTimes(time: DeliveryTime) {
    let index: number = this.activeTimes.indexOf(time);
    if(index > -1) {
      this.activeTimes.splice(index, 1);
    }
    else {
      this.activeTimes.push(time);
    }

    this.updateAll();
  }

  updateAll() {
    let upf: ActiveFilters = {filters: this.activeFilters, deliveryTimes: this.activeTimes, priceRanges: this.activeRanges};
    this.updates.updateRestaurants(upf);
  }

}
