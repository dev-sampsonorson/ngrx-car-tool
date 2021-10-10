import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from '../../models/car-tool.models';
import { CarRowService } from './car-row.service';

@Component({
  selector: '[car-row-read]',
  template: `
    <td>{{car?.id}}</td>
    <td>{{car?.make}}</td>
    <td>{{car?.model}}</td>
    <td>{{car?.year}}</td>
    <td>{{car?.color}}</td>
    <td>{{car?.price}}</td>
    <td>
      <button (click)="onEdit($event)">Edit</button>
      <button (click)="onDelete($event)">Delete</button>
    </td>
  `,
  styles: [
  ]
})
export class CarRowReadComponent implements OnInit {

  @Input() car: Car | undefined;

  @Output() editCar: EventEmitter<number> = new EventEmitter();
  @Output() deleteCar: EventEmitter<number> = new EventEmitter();

  constructor(private service: CarRowService) { }

  ngOnInit(): void {
  }

  onEdit(event: MouseEvent) {
    if (this.car === undefined)
      throw new Error('No car passed in');

    this.service.onEdit(this.car.id!);
  }

  onDelete(event: MouseEvent) {
    if (this.car === undefined)
      throw new Error('No car passed in');

    this.service.onDelete(this.car.id!);
  }

}
