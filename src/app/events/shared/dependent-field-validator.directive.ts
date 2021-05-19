import { Directive, Input } from "@angular/core";
import {
  AbstractControl,
  ValidationErrors,
  Validator,
  NG_VALIDATORS,
  FormGroup,
} from "@angular/forms";

@Directive({
  selector: "[conditional-validate]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DependentFieldValidatorDirective,
      multi: true,
    },
  ],
})
export class DependentFieldValidatorDirective implements Validator {
  @Input("conditional-validate") dependentControl!: AbstractControl;
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const isValid =
      this.isValid(control) || this.isValid(this.dependentControl);
    if (isValid) {
      return null;
    }

    return {
      "conditional-validator": false,
    };
  }

  isValid(control?: AbstractControl): boolean {
    if (!!control === false) {
      return false;
    }

    const formGroup = control as FormGroup;

    return formGroup && formGroup["controls"]
      ? !!Object.keys(formGroup?.controls).every(
          (key) => formGroup?.controls[key] && formGroup.controls[key]?.value
        )
      : !!(control && control?.value);
  }
}
