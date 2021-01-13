import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';
import { Error5Component } from './error5/error5.component';


@NgModule({
  declarations: [
    ErrorComponent,
    Error5Component,
   
  ],
  imports: [
    CommonModule,
    PartialsModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: ErrorComponent,
        children: [
          {
            path: 'error-5',
            component: Error5Component,
          },
         
        ],
      },
    ]),
  ],
})
export class ErrorModule {}
