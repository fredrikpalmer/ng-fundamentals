import { Routes } from "@angular/router";
import {
  EventDetailsComponent,
  EventRouteActivator,
  EventsListResolver,
  EventListComponent,
  EventCreateComponent,
  SessionCreateComponent,
} from "./events/index";
import { Error404Component } from "./errors/404.component";
import { EventResolver } from "./events/event-resolver.service";

export const appRoutes: Routes = [
  {
    path: "events",
    component: EventListComponent,
    resolve: { events: EventsListResolver },
  },
  {
    path: "events/create",
    component: EventCreateComponent,
    canDeactivate: ["canDeactivateCreateEvent"],
  },
  {
    path: "events/:id",
    component: EventDetailsComponent,
    canActivate: [EventRouteActivator],
    resolve: { event: EventResolver },
  },
  {
    path: "events/:id/sessions/create",
    component: SessionCreateComponent,
    canDeactivate: ["canDeactivateCreateEvent"],
  },
  { path: "404", component: Error404Component },
  { path: "", redirectTo: "/events", pathMatch: "full" },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
];
