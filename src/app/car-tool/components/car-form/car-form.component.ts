import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'car-form',
  template: `
    <form [formGroup]="carForm">
      <div>
        <label for="make-input">Make:</label>
        <input type="text" id="make-input" formControlName="make">
      </div>
      <div>
        <label for="model-input">Model:</label>
        <input type="text" id="model-input" formControlName="model">
      </div>
      <div>
        <label for="year-input">Year:</label>
        <input type="number" id="year-input" formControlName="year">
      </div>
      <div>
        <label for="color-input">Color:</label>
        <input type="text" id="color-input" formControlName="color">
      </div>
      <div>
        <label for="price-input">Price:</label>
        <input type="number" id="price-input" formControlName="price">
      </div>
      <button (click)="addCar()">{{buttonText}}</button>
    </form>
  `,
  styles: [
  ]
})
export class CarFormComponent implements OnInit {

  carForm!: FormGroup;
  defaultFormValues: any;

  @Input() buttonText: string = 'Save Car';
  @Output() saveCar: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.defaultFormValues = {
      make: '',
      model: '',
      year: 1900,
      color: '',
      price: 0,
    }
  }

  ngOnInit(): void {
    this.carForm = this.fb.group(this.defaultFormValues);
  }

  addCar() {
    this.saveCar.emit(this.carForm.value);
    this.carForm.setValue(this.defaultFormValues);
  }

}
