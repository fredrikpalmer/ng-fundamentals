import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements ILoginFormValues {
  userName!: string;
  password!: string;
  mouseoverLogin = false;
  constructor(private authService: AuthService, private router: Router) {}

  login(formValues: NgForm): void {
    this.authService.loginUser(
      formValues.value.userName,
      formValues.value.password
    );
    this.router.navigate(["/"]);
  }

  cancel(): void {
    this.router.navigate(["/"]);
  }
}

interface ILoginFormValues {
  userName: string;
  password: string;
}
