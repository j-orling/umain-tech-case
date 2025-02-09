import { Component } from '@angular/core';
import { ServiceService } from 'src/services/service.service';
import { Filter } from '../interfaces/filter';

@Component({
  selector: 'app-mobile-filters',
  templateUrl: './mobile-filters.component.html',
  styleUrls: ['./mobile-filters.component.scss']
})
export class MobileFiltersComponent {
  deliveryTimes: string[] = ['0 - 10 min', '10 - 30 min', '30 - 60 min', '1 hour+'];

  constructor () {
    
  }

}
