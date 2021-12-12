import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DayWithSlots } from '../models/day-slots';
import { DayWithSlot } from '../models/day-slot';


@Injectable({
  providedIn: 'root'
})
export class ApointmentsService {

  constructor(private http: HttpClient) {}

  // list of locations
  getLocations(): Observable<Location[]> {
    console.log('locations service invoked');
    return this.http.get<Location[]>(`${environment.apiUrl}/locations`);
  }

  // list of availables slot for a specific location
  getDayWithSlotsByLocationId(locationId: string): Observable<DayWithSlots[]> {
    return this.http.get<DayWithSlots[]>(`${environment.apiUrl}/slots/${locationId}`);
  }

  schedule(dayWithSlot: DayWithSlot): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/schedule/`, dayWithSlot);
  }
}
