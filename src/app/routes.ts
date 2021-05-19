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
