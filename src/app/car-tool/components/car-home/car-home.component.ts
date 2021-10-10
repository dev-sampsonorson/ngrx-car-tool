import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, OperatorFunction } from 'rxjs';
import { concatMapTo, map, tap } from 'rxjs/operators';
import { Car } from '../../models/car-tool.models';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'car-home',
  template: `
    <tool-header headerText="Car Tool"></tool-header>

    <!-- [cars]="cars$ | async" [editCarId]="editCarId$ | async" -->
    <car-table [cars]="cars" [editCarId]="editCarId"
        (editCar)="onEditCar($event)"
        (deleteCar)="onDeleteCar($event)"
        (saveCar)="onSaveCar($event)"
        (cancelCar)="onCancelCar()"
        >
    </car-table>

    <car-form buttonText="Add Car" (saveCar)="onAddCar($event)"></car-form>
  `,
  styles: [
  ]
})
export class CarHomeComponent implements OnInit {

  cars: Car[] = [];
  editCarId: number | undefined;

  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
    this.refreshCars();
  }

  refreshCars(mutate?: Observable<any>) {
    const pipes: OperatorFunction<any, Car[]>[] = [
      concatMapTo(this.carsService.all()),
      map((cars: Car[]) => cars.slice(0)),
    ];

    (mutate || of(null))
      .pipe(...pipes as [])
      .subscribe({
        next: cars => this.cars = cars,
        error: (err) => {
          console.error(err);
          this.cars = [];
        },
        complete: () => this.editCarId = undefined
      })
  }

  onRefreshCars() {
    this.refreshCars();
  }

  onDeleteCar(carId: number) {
    this.refreshCars(this.carsService.delete(carId));
  }

  onSaveCar(car: Car) {
    this.refreshCars(this.carsService.update(car));
  }

  onAddCar(car: Car) {
    console.log('onAddCar');
    this.refreshCars(this.carsService.create(car));
  }

  onEditCar(carId: number) {
    this.editCarId = carId;
  }

  onCancelCar() {
    this.editCarId = undefined;
  }

}
