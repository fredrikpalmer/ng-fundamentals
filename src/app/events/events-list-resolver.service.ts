import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { EventService } from "./shared/event.service";

@Injectable()
export class EventsListResolver implements Resolve<any[]> {
  constructor(private eventService: EventService){}

  resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
    return this.eventService.getEvents().pipe(map(events => events));
  }
}
