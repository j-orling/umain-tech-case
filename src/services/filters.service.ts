import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActiveFilters } from 'src/app/interfaces/active-filters';
import { Filter } from 'src/app/interfaces/filter';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private updateEmit = new Subject<ActiveFilters>();

  constructor() { }

  updateRestaurants(filters: ActiveFilters) {
    console.log("updated");
    this.updateEmit.next(filters);
  }

  getUpdates(): Observable<ActiveFilters> {
    return this.updateEmit.asObservable();
  }
}
