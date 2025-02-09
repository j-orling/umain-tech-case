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
  displayedRestaurants: Restaurant[] = [];
  openRestaurants: Restaurant[] = [];
  curFilters: ActiveFilters = {priceRanges: [], filters: [], deliveryTimes: []};
  private filterUpdates: Subscription;

  unsub = new Subject<void>();

  constructor(private service: ServiceService, private fService: FiltersService) {
    // Restaurants should only need to be loaded once upon init
    this.service.getRestaurants().subscribe(res => {
      this.restaurants = res;
      console.log(res);
      this.updateRestaurants();
    });
    this.filterUpdates = this.fService.getUpdates().subscribe(res => {
      this.curFilters = res;
      this.updateRestaurants();
    });
    this.updateRestaurants();
  }

  // Make sure to unsubscribe on unload
  ngOnDestroy() {
    this.filterUpdates.unsubscribe();
    this.unsub.next();
    this.unsub.complete();
  }

  updateRestaurants() {
    // Clear list of open restaurants and displayed restaurants
    this.openRestaurants = [];
    this.displayedRestaurants = [];

    // If no filters are applied, there's no need to filter the list
    if(this.curFilters.deliveryTimes.length === 0 && this.curFilters.filters.length === 0 && this.curFilters.priceRanges.length === 0) {
      this.displayedRestaurants = this.restaurants;
    }
    else {
      this.displayedRestaurants = this.restaurants.filter(res => this.filterResults(res));
    }

    // Check for and save open restaurants
    this.restaurants.forEach(r => {
      this.service.getOpenStatus(r.id).subscribe(b => {
        if(b) {
          this.openRestaurants.push(r);
        }
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
    // Check delivery times and food types separately, to make sure the filters are not affected by one another
    if(
      (this.curFilters.deliveryTimes.length > 0 &&
      res.delivery_time_minutes <= this.curFilters.deliveryTimes.reduce((a, b) => Math.max(a, b))) || this.curFilters.deliveryTimes.length === 0
    ) {
      if(
        (this.curFilters.filters.length > 0 && this.curFilters.filters.some(value => res.filter_ids.includes(value.id))) || 
        this.curFilters.filters.length === 0
      ) {
        if(
          (this.curFilters.priceRanges.length > 0 && this.curFilters.priceRanges.some(value => res.price_range_id.includes(value.id))) ||
          this.curFilters.priceRanges.length === 0
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
