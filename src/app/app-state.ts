import { Car } from "./car-tool/models/car-tool.models";

export interface AppState {
  cars: Car[];
  editCarId: number;
}
