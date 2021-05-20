import { Component } from "@angular/core";
import { AbstractControl, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { EventService } from "../shared/event.service";

interface IEventCreate {
  name: string;
  date: string;
  time: string;
  price: number;
  address: string;
  city: string;
  country: string;
  onlineUrl: string;
  imageUrl: string;
}

@Component({
  templateUrl: "./event-create.component.html",
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input {
        background-color: #e3c3c5;
      }
      .error ::-webkit-input-placeholder {
        color: #999;
      }
    `,
  ],
})
export class EventCreateComponent {
  newEvent!: IEventCreate;
  isDirty = true;

  constructor(private router: Router, private eventService: EventService) {}

  cancel(): void {
    this.router.navigate(["/events"]);
  }

  async saveEvent(formValues: NgForm): Promise<void> {
    Object.keys(formValues.controls).forEach((key) => {
      let c = formValues.controls[key];
      c?.updateValueAndValidity();
    });
    formValues.control.markAllAsTouched();

    if (!formValues.valid) {
      return;
    }

    await this.eventService.saveEvent(formValues.value).toPromise();
    this.isDirty = false;
    this.router.navigate(["/events"]);
  }

  handleChange(control: AbstractControl): void {
    control.updateValueAndValidity();
  }
}
