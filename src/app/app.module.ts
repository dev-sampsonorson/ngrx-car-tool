import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { carsReducer, editCarIdReducer } from './car-tool/car.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CarHomeComponent } from './car-tool/components/car-home/car-home.component';
import { CarTableComponent } from './car-tool/components/car-table/car-table.component';
import { SharedModule } from './shared/shared.module';
import { CarRowReadComponent } from './car-tool/components/car-row/car-row-read.component';
import { CarRowEditComponent } from './car-tool/components/car-row/car-row-edit.component';
import { CommonModule } from '@angular/common';
import { CarFormComponent } from './car-tool/components/car-form/car-form.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      cars: carsReducer,
      editCarId: editCarIdReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10 // number of state trees to save at any given time
    })
  ],
  declarations: [
    AppComponent,
    CarHomeComponent,
    CarTableComponent,
    CarRowReadComponent,
    CarRowEditComponent,
    CarFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
