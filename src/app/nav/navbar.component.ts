import { Component, OnInit } from "@angular/core";
import { Router, RoutesRecognized } from "@angular/router";
import { EventService, IEvent, ISession } from "../events";
import { AuthService } from "../user/auth.service";

@Component({
  selector: "nav-bar",
  templateUrl: "./navbar.component.html",
  styles: [
    `
      .nav.navbar-nav {
        font-size: 15px;
      }
      #searchForm {
        margin-right: 100px;
      }
      @media (max-width: 1200px) {
        #searchForm {
          display: none;
        }
      }
      li > a.active {
        color: #f97924;
      }

      div.list-group {
        position: relative;
        top: 43px;
        margin-bottom: 43px;
      }

      a.list-group-item {
        cursor: pointer;
      }
    `,
  ],
})
export class NavBarComponent implements OnInit {
  eventId: string | undefined;
  events!: IEvent[];
  searchTerm = "";
  foundSessions!: ISession[];

  constructor(
    public auth: AuthService,
    public router: Router,
    private eventService: EventService
  ) {}
  ngOnInit(): void {
    this.eventService.getEvents().subscribe((e) => (this.events = e));
    this.router.events.subscribe((val) => {
      if (val instanceof RoutesRecognized) {
        this.eventId = val.state.root.firstChild?.params?.id;
      }
    });
  }

  searchSessions(searchTerm: string): void {
    this.eventService.searchSessions(searchTerm).subscribe((sessions) => {
      this.foundSessions = sessions;
    });
  }

  handleSessionClicked(eventId: number): void {
    this.searchTerm = "";
    this.foundSessions = [];
    this.router.navigate(["/events", eventId]);
  }
}
