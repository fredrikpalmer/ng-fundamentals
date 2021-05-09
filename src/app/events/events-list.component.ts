import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "../common/toastr.service";
import { EventsListResolver } from "./events-list-resolver.service";

@Component({
    template: `
    <div>
        <h1>Upcoming Angular Events</h1>
        <hr>
        <div class="row">
            <div *ngFor="let event of events" class="col-md-5">
                <event-thumbnail (click)="handleThumbnailClicked(event.name)" [event]="event"
                ></event-thumbnail>
            </div>
        </div>
    </div>
    `
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  constructor(private toastr: ToastrService, private eventsListResolver: EventsListResolver, private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.events = this.route.snapshot.data.events;
  }

  handleThumbnailClicked(eventName: string): void {
    this.toastr.success(eventName);
  }
}
