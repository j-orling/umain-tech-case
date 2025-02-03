import { Component, OnDestroy } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';
import { Subject, Subscription } from 'rxjs';
import { ServiceService } from 'src/services/service.service';
import { FiltersService } from 'src/services/filters.service';
import { ActiveFilters } from '../interfaces/active-filters';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnDestroy {
  restaurants: Restaurant[] = [];
  openRestaurants: Restaurant[] = [];
  curFilters: ActiveFilters = {priceRanges: [], filters: [], deliveryTimes: []};
  private filterUpdates: Subscription;

  unsub = new Subject<void>();

  constructor(private service: ServiceService, private fService: FiltersService) {
    this.filterUpdates = this.fService.getUpdates().subscribe(res => {
      this.curFilters = res;
    });
    this.updateRestaurants();
  }

  ngOnDestroy() {
    this.filterUpdates.unsubscribe();
    this.unsub.next();
    this.unsub.complete();
  }

  updateRestaurants() {
    // Clear list of open restaurants
    this.openRestaurants = [];

    this.service.getRestaurants().subscribe(a => {
      this.restaurants = a;
      //this.restaurants = a.filter(res => this.filterResults(res));

      // Check for and save open restaurants
      this.restaurants.forEach(r => {
        this.service.getOpenStatus(r.id).subscribe(b => {
          if(b) {
            this.openRestaurants.push(r);
          }
        });
      });
    });
  }

  isOpen(restaurant: Restaurant): boolean {
    if(this.openRestaurants.includes(restaurant)) {
      return true;
    }
    return false;
  }

  filterResults(res: Restaurant) {
    if(
      res.delivery_time_minutes <= Math.max.apply(this.curFilters.deliveryTimes) &&
      this.curFilters.filters.some(value => res.filterIds.includes(value.id))
    ) {
      return true;
    }
    return false;
  }
}
