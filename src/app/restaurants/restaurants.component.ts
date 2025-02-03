import { Component } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';
import { Subject } from 'rxjs';
import { ServiceService } from 'src/services/service.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent {
  restaurants: Restaurant[] = [];
  openRestaurants: Restaurant[] = [];

  unsub = new Subject<void>();

  constructor(private service: ServiceService) {
    this.updateRestaurants();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }

  updateRestaurants() {
    // Clear list of open restaurants
    this.openRestaurants = [];

    this.service.getRestaurants().subscribe(a => {
      this.restaurants = a;

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
}
