import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DochqLoaderComponent } from './dochq-loader/dochq-loader.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    DochqLoaderComponent
  ],
  declarations: [
    DochqLoaderComponent
  ]
})
export class LoadingScreenModule { }
