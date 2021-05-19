import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ISession, restrictedWords } from "../shared";

@Component({
  selector: "session-create",
  templateUrl: "./session-create.component.html",
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input,
      .error select,
      .error textarea {
        background-color: #e3c3c5;
      }
      .error ::-webkit-input-placeholder {
        color: #999;
      }
    `,
  ],
})
export class SessionCreateComponent implements OnInit {
  @Output() saveNewSession = new EventEmitter();
  @Output() cancelNewSession = new EventEmitter();

  newSessionForm!: FormGroup;
  name!: FormControl;
  presenter!: FormControl;
  duration!: FormControl;
  level!: FormControl;
  abstract!: FormControl;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.name = new FormControl("", Validators.required);
    this.presenter = new FormControl("", Validators.required);
    this.duration = new FormControl("", Validators.required);
    this.level = new FormControl("", Validators.required);
    this.abstract = new FormControl("", [
      Validators.required,
      Validators.maxLength(400),
      restrictedWords(["foo", "bar"]) as ValidatorFn,
    ]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract,
    });
  }

  saveSession(formValues: {
    name: string;
    presenter: string;
    duration: string;
    level: string;
    abstract: string;
  }) {
    let session: ISession = {
      id: 0,
      ...formValues,
      duration: +formValues.duration,
      voters: [],
    };

    this.saveNewSession.emit(session);
  }

  cancel(): void {
    this.cancelNewSession.emit();
  }
}
