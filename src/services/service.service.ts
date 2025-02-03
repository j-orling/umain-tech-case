import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Filter } from 'src/app/interfaces/filter';
import { OpenStatus } from 'src/app/interfaces/open-status';
import { PriceRange } from 'src/app/interfaces/price-range';
import { Restaurant } from 'src/app/interfaces/restaurant';

const apiURL = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> {
    // Pipe + map used to handle wrapper
    return this.http.get<Restaurant[]>(apiURL + '/restaurants').pipe(
      map((response: any) => response.restaurants)
    );
  }

  getRestaurant() {

  }

  getFilters(): Observable<Filter[]> {
    return this.http.get<Filter[]>(apiURL + '/filter').pipe(
      map((response: any) => response.filters)
    );
  }

  getFilter() {

  }

  getOpenStatus(id: string): Observable<OpenStatus> {
    return this.http.get<OpenStatus>(apiURL + '/open/' + id);
  }

  getPriceRanges(): Observable<PriceRange[]> {
    return this.http.get<PriceRange[]>(apiURL + '/price-range');
  }

  getPriceRange() {

  }
}
