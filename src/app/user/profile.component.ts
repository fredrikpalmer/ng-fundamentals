import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { TOASTR_TOKEN, Toastr } from "../common/toastr.service";

@Component({
  templateUrl: "./profile.component.html",
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
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {}

  ngOnInit(): void {
    let firstName = new FormControl(
      this.auth.currentUser.firstName,
      Validators.required
    );
    let lastName = new FormControl(
      this.auth.currentUser.lastName,
      Validators.required
    );
    this.profileForm = new FormGroup({
      firstName: firstName,
      lastName: lastName,
    });
  }

  validateFirstName(): boolean {
    return (
      this.profileForm.controls.firstName?.valid ||
      this.profileForm.controls.firstName?.untouched
    );
  }

  validateLastName(): boolean {
    return (
      this.profileForm.controls.lastName?.valid ||
      this.profileForm.controls.lastName?.untouched
    );
  }

  saveProfile({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }): void {
    if (this.profileForm.valid) {
      this.auth.updateCurrentUser({ firstName, lastName });
      this.toastr.success("Profile saved");
    }
  }
  cancel(): void {
    this.router.navigate(["/"]);
  }
}
