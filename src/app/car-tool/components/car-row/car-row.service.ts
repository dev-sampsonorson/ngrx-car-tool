import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Car } from '../../models/car-tool.models';

export interface RowAction {
  type: "edit" | "delete" | "cancel" | "save";
  data?: number | Car | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class CarRowService {
  // notification service
  // events service

  private subject: Subject<RowAction> = new Subject();

  get actions$() {
    return this.subject.asObservable();
  }

  onEdit(carId: number) {
    this.subject.next({ type: 'edit', data: carId });
  }

  onDelete(carId: number) {
    this.subject.next({ type: 'delete', data: carId });
  }

  onSave(car: Car) {
    this.subject.next({ type: 'save', data: car });
  }

  onCancel() {
    this.subject.next({ type: 'cancel' });
  }
}
