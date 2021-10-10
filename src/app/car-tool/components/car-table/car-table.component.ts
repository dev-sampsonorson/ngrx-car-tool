import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../../models/car-tool.models';
import { CarRowService, RowAction } from '../car-row/car-row.service';

@Component({
  selector: 'car-table',
  template: `
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Make</th>
          <th>Model</th>
          <th>Year</th>
          <th>Color</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <ng-container *ngFor="let car of cars">
          <ng-template
              [ngTemplateOutlet]="editCarId !== car.id ? readTmpl : editTmpl"
              [ngTemplateOutletContext]="{ car: car }">
          </ng-template>
        </ng-container>
      </tbody>
    </table>
    <ng-template #readTmpl let-car="car">
      <tr car-row-read [car]="car"></tr>
    </ng-template>
    <ng-template #editTmpl let-car="car">
      <tr car-row-edit [car]="car"></tr>
    </ng-template>
  `,
  styles: [
  ]
})
export class CarTableComponent implements OnInit {

  @Input() cars!: Car[];
  @Input() editCarId: number | undefined;

  @Output() editCar = new EventEmitter<any>();
  @Output() deleteCar = new EventEmitter<number>();
  @Output() saveCar = new EventEmitter<Car>();
  @Output() cancelCar = new EventEmitter<void>();

  private rowActions$: Observable<RowAction>;


  constructor(private service: CarRowService) {
    this.rowActions$ = this.service.actions$;
  }

  ngOnInit(): void {
    this.rowActions$.subscribe((action: RowAction) => {
      switch (action.type) {
        case "edit":
          this.editCar.emit(action.data as number);
          break;
        case "delete":
          this.deleteCar.emit(action.data as number);
          break;
        case "save":
          this.saveCar.emit(action.data as Car);
          break;
        case "cancel":
          this.cancelCar.emit();
          break;
        default:
          throw new Error('Invalid action');
      }
    });

    /* this.rowActions$.subscribe((action: RowAction) => {
      const actionSwitch = (actionType: string) => ({
        "edit": () => this.editCar.emit(action.data as number),
        "delete": () => this.deleteCar.emit(action.data as number),
        "save": () => this.saveCar.emit(action.data as Car),
        "cancel": () => this.cancelCar.emit(),
      })[actionType];
    }); */
  }

}
