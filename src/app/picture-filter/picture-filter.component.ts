import { Component } from '@angular/core';
import { Filter } from '../interfaces/filter';
import { ServiceService } from 'src/services/service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-picture-filter',
  templateUrl: './picture-filter.component.html',
  styleUrls: ['./picture-filter.component.scss']
})
export class PictureFilterComponent {
  filters: Filter[] = [];

  unsub: Subject<void> = new Subject<void>();

  constructor(private service: ServiceService) {
    this.service.getFilters().subscribe(res => {
      this.filters = res;
    });
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }
}
