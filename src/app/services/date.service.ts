import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes this service globally available
})
export class DateService {
  private selectedDateSource = new BehaviorSubject<string>(new Date().toISOString().split('T')[0]);
  selectedDate$ = this.selectedDateSource.asObservable();

  updateDate(newDate: string) {
    this.selectedDateSource.next(newDate);
  }
}
