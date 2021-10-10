import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Car } from '../../models/car-tool.models';
import { CarRowService } from './car-row.service';

@Component({
  selector: '[car-row-edit]',
  template: `
    <ng-container [formGroup]="inlineForm">
      <td>{{car?.id}}</td>
      <td><input formControlName="make" type="text" /></td>
      <td><input formControlName="model" type="text" /></td>
      <td><input formControlName="year" type="number" /></td>
      <td><input formControlName="color" type="text" /></td>
      <td><input formControlName="price" type="number" /></td>
      <td>
        <button (click)="onSave($event)">Save</button>
        <button (click)="onCancel($event)">Cancel</button>
      </td>
    </ng-container>
  `,
  styles: [
  ]
})
export class CarRowEditComponent implements OnInit {

  @Input() car: Car | undefined;
  @Output() saveCar: EventEmitter<Car> = new EventEmitter();
  @Output() cancelCar: EventEmitter<void> = new EventEmitter();

  inlineForm!: FormGroup;

  constructor(private service: CarRowService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inlineForm = this.fb.group({
      make: this.car?.make,
      model: this.car?.model,
      year: this.car?.year,
      color: this.car?.color,
      price: this.car?.price,
    });
  }

  onSave(event: MouseEvent) {
    if (this.car === undefined)
      throw new Error('No car passed in');

    this.service.onSave(this.car);
  }

  onCancel(event: MouseEvent) {
    if (this.car === undefined)
      throw new Error('No car passed in');

    this.service.onCancel();
  }

}
