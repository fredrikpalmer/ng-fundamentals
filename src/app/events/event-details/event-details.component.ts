import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IEvent, ISession } from "../shared";
import { EventService } from "../shared/event.service";
import { SessionFilter } from "../shared/session.filter";
import { SessionSorting } from "../shared/session.sort";

@Component({
  templateUrl: "./event-details.component.html",
  styles: [
    `
      .container {
        padding-left: 20px;
        padding-right: 20px;
      }
      .event-image {
        height: 100px;
      }
      a {
        cursor: pointer;
      }
    `,
  ],
})
export class EventDetailsComponent implements OnInit {
  private sortMap = new Map<SessionSorting, string>([
    [SessionSorting.NAME, "ASC"],
    [SessionSorting.PRESENTER, "ASC"],
    [SessionSorting.DURATION, "ASC"],
    [SessionSorting.LEVEL, "DESC"],
    [SessionSorting.VOTERS, "DESC"],
  ]);
  event!: IEvent;
  addMode = false;
  filterBy: SessionFilter = SessionFilter.ALL;
  sortBy: SessionSorting = SessionSorting.NAME;

  get sortDirection() {
    const direction = this.sortMap.get(this.sortBy);
    return direction;
  }

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventService.getEvent(+params.id).subscribe((e) => {
        this.event = e as IEvent;
      });
      this.addMode = false;
    });
  }

  addSession(): void {
    this.addMode = true;
  }

  saveNewSession(session: ISession): void {
    const nextId = Math.max.apply(
      null,
      this.event.sessions.map((x) => x.id)
    );
    session.id = nextId + 1 || 999;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelNewSession(): void {
    this.addMode = false;
  }

  setSorting(sorting: string): void {
    this.sortBy = <SessionSorting>sorting;
  }

  setFilter(filter: string): void {
    this.filterBy = <SessionFilter>filter;
  }

  isActiveFilter(filter: string): boolean {
    return this.filterBy === filter;
  }
}
