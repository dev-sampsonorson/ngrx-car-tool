import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car-tool.models';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private _baseUrl = 'http://localhost:4250/cars';

  constructor(private http: HttpClient) { }

  private getElementUrl(elementId: any) {
    return this._baseUrl + '/' + encodeURIComponent(String(elementId));
  }

  all() {
    return this.http.get<Car[]>(this._baseUrl);
  }

  create(car: Car) {
    return this.http.post<Car>(this._baseUrl, car);
  }

  update(car: Car) {
    return this.http.put<Car>(this.getElementUrl(car.id), car);
  }

  delete(carId: number) {
    return this.http.delete<Car>(this.getElementUrl(carId));
  }
}
