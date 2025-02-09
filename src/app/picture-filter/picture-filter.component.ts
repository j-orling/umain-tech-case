import { Component, OnDestroy } from '@angular/core';
import { Filter } from '../interfaces/filter';
import { ServiceService } from 'src/services/service.service';
import { Subject } from 'rxjs';
import { FiltersService } from 'src/services/filters.service';

@Component({
  selector: 'app-picture-filter',
  templateUrl: './picture-filter.component.html',
  styleUrls: ['./picture-filter.component.scss']
})
export class PictureFilterComponent implements OnDestroy {
  filters: Filter[] = [];
  activeFilters: Filter[] = [];

  unsub: Subject<void> = new Subject<void>();

  constructor(private service: ServiceService, private fService: FiltersService) {
    this.service.getFilters().subscribe(res => {
      this.filters = res;
    });
  }

  // Unsubscribe from all subscriptions on unload
  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }

  updateFilters(filter: Filter) {
    let index: number = this.activeFilters.indexOf(filter);
    if(index > -1) {
      this.activeFilters.splice(index, 1);
    }
    else {
      this.activeFilters.push(filter);
    }
    this.fService.updateFilters(this.activeFilters);
  }

}
