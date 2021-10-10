import { createAction, props } from '@ngrx/store';
import { Car } from './models/car-tool.models';

export const createCar = createAction('[Car] Create Car', props<{ car: Car }>());
export const updateCar = createAction('[Car] Replace Car', props<{ car: Car }>());
export const deleteCar = createAction('[Car] Delete Car', props<{ carId: number }>());
export const editCar = createAction('[Car] Edit Car', props<{ carId: number }>());
export const cancelCar = createAction('[Car] Cancel Car');
