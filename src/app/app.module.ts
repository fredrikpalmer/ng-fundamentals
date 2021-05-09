import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import {
  EventListComponent,
  EventCreateComponent,
  EventDetailsComponent,
  EventRouteActivator,
  EventService,
  EventsListResolver,
  EventThumbnailComponent,
} from "./events/index";
import { EventsAppComponent } from "./events-app.component";
import { NavBarComponent } from "./nav/navbar.component";
import { ToastrService } from "./common/toastr.service";
import { appRoutes } from "./routes";
import { Error404Component } from "./errors/404.component";

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  declarations: [
    EventsAppComponent,
    EventListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    EventCreateComponent,
    Error404Component,
  ],

  providers: [
    EventService,
    ToastrService,
    EventRouteActivator,
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
  ],
  bootstrap: [EventsAppComponent],
})
export class AppModule {}
