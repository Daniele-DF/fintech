import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

// case where have to view an error:
// the two fields are different
// one of two fields has null value

export function equalFieldsValidator(field1: string, field2: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control.get(field1)?.value !== control.get(field2)?.value
          ? {equals: true}
          : null
  }
}

@Directive({
  selector: '[equalFields]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EqualFieldsValidator,
      multi: true
    }
  ]
})
export class EqualFieldsValidator implements Validator{
  @Input() field1!: string;
  @Input() field2!: string;
  validate(control: AbstractControl): ValidationErrors | null {
    return equalFieldsValidator(this.field1, this.field2)(control);
  }

}
