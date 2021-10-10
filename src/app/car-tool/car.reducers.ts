import { createReducer, on } from '@ngrx/store';
import { cancelCar, createCar, deleteCar, editCar, updateCar } from './car.actions';
import { Car } from './models/car-tool.models';

const initialCars: Car[] = [
  { id: 1, make: 'Ford', model: 'Fusion Hybrid', year: 2018, color: 'black', price: 25000 },
  { id: 2, make: 'Tesla', model: 'S', year: 2018, color: 'red', price: 125000 }
];

export const carsReducer = createReducer<Car[]>(initialCars,
  on(createCar, (state, action) => {
    return state.concat({
      ...action.car,
      id: Math.max(...state.map(c => c.id || 0), 0) + 1
    });
  }),
  on(updateCar, (state, action) => {
    const newCars = state.concat();
    newCars[newCars.findIndex(car => car.id === action.car.id)] = action.car;
    return newCars;
  }),
  on(deleteCar, (state, action) => {
    return state.filter(car => car.id !== action.carId);
  })
);

export const editCarIdReducer = createReducer<number>(-1,
  on(editCar, (_, action) => action.carId),
  on(updateCar, () => -1),
  on(deleteCar, () => -1),
  on(cancelCar, () => -1)
);
