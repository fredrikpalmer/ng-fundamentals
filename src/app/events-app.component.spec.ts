import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";
import { EventsAppComponent } from "./events-app.component";
import { EventService } from "./events/shared";
import { NavBarComponent } from "./nav/navbar.component";
import { appRoutes } from "./routes";
import { AuthService } from "./user/auth.service";

describe("AppComponent", () => {
  let mockAuthService;
  let mockEventService;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(
      "mockAuthService",
      ["isAuthenticated", "login"],
      ["currentUser"]
    );
    mockEventService = jasmine.createSpyObj("mockEventService", [
      "getEvents",
      "getEvent",
    ]);

    await TestBed.configureTestingModule({
      // imports: [RouterModule.forRoot(appRoutes)],
      // declarations: [EventsAppComponent, NavBarComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: EventService, useValue: mockEventService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(EventsAppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
