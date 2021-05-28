import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { PreloadAllModules, RouterModule } from "@angular/router";

import {
  EventListComponent,
  EventCreateComponent,
  EventDetailsComponent,
  EventRouteActivator,
  EventService,
  EventsListResolver,
  EventThumbnailComponent,
  SessionCreateComponent,
  SessionListComponent,
  DurationPipe,
  UpVoteComponent,
} from "./events/index";
import {
  CollapsibleWellComponent,
  TOASTR_TOKEN,
  Toastr,
  JQUERY_TOKEN,
} from "./common";
import { EventsAppComponent } from "./events-app.component";
import { NavBarComponent } from "./nav/navbar.component";
import { SearchModalComponent } from "./nav/search-modal.component";
import { appRoutes } from "./routes";
import { Error404Component } from "./errors/404.component";
import { AuthService } from "./user/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalTriggerDirective } from "./common/modal-trigger.directive";
import { VoterService } from "./events/shared/voter.service";
import { DependentFieldValidatorDirective } from "./events/shared/dependent-field-validator.directive";
import { HttpClientModule } from "@angular/common/http";
import { EventResolver } from "./events/event-resolver.service";

declare global {
  interface Window {
    toastr: any;
    $: any;
  }
}

let toastr: Toastr = window["toastr"];
let jQuery = window["$"];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  declarations: [
    EventsAppComponent,
    EventListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    EventCreateComponent,
    SessionCreateComponent,
    Error404Component,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SearchModalComponent,
    ModalTriggerDirective,
    DependentFieldValidatorDirective,
    UpVoteComponent,
  ],

  providers: [
    AuthService,
    {
      provide: TOASTR_TOKEN,
      useValue: toastr,
    },
    EventService,
    VoterService,
    EventRouteActivator,
    EventResolver,
    EventsListResolver,
    {
      provide: "canDeactivateCreateEvent",
      useValue: ({ isDirty }: { isDirty: boolean }): boolean => {
        if (isDirty) {
          return window.confirm(
            "You haven't saved this event. Are you sure you want to cancel?"
          );
        }

        return true;
      },
    },
    {
      provide: JQUERY_TOKEN,
      useValue: jQuery,
    },
  ],
  bootstrap: [EventsAppComponent],
})
export class AppModule {}
