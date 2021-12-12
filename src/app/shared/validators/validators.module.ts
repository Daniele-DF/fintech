import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualFieldsValidator } from './equal-fields.validators';


const validators = [
  EqualFieldsValidator,
]


@NgModule({
  declarations: [ ...validators],
  imports: [
    CommonModule
  ],
  exports: [...validators]
})
export class ValidatorsModule { }
