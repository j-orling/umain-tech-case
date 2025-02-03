import { Component } from '@angular/core';
import { ServiceService } from 'src/services/service.service';
import { Filter } from '../interfaces/filter';
import { Subject } from 'rxjs';
import { PriceRange } from '../interfaces/price-range';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  filters: Filter[] = [];
  ranges: PriceRange[] = [];

  activeFilters: string[] = [];

  unsub = new Subject<void>();

  constructor(private service: ServiceService) {
    // Always load filters
    this.service.getFilters().subscribe((a => {
      this.filters = a;
    }));

    this.service.getPriceRanges().subscribe((b => {
      this.ranges = b;
    }));
  }

  ngOnInit() {
    
  }

  // Unsubscribe from all previous subscriptions when component unloads
  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }
}
