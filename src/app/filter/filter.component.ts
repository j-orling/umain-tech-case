import { Component, OnDestroy } from '@angular/core';
import { ServiceService } from 'src/services/service.service';
import { Filter } from '../interfaces/filter';
import { Subject } from 'rxjs';
import { PriceRange } from '../interfaces/price-range';
import { FiltersService } from 'src/services/filters.service';
import { ActiveFilters } from '../interfaces/active-filters';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnDestroy {
  filters: Filter[] = [];
  ranges: PriceRange[] = [];
  deliveryTimes: string[] = ['0 - 10 min', '10 - 30 min', '30 - 60 min', '1 hour+'];

  activeTimes: number[] = [];
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

  updateTimes(time: string) {
    // Convert the string to a number we can use for filtering
    let val: number = 0;
    switch (time) {
      case '0 - 10 min':
        val = 10;
        break;
      case '10 - 30 min':
        val = 30;
        break;
      case '30 - 60 min':
        val = 60;
        break;
      case '1 hour+':
        val = 99;
        break;
    
      default:
        break;
    }

    let index: number = this.activeTimes.indexOf(val);
    if(index > -1) {
      this.activeTimes.splice(index, 1);
    }
    else {
      this.activeTimes.push(val);
    }

    this.updateAll();
  }

  updateAll() {
    let upf: ActiveFilters = {filters: this.activeFilters, deliveryTimes: this.activeTimes, priceRanges: this.activeRanges};
    this.updates.updateRestaurants(upf);
  }
}
