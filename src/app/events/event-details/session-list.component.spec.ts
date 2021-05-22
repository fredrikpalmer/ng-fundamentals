import { HttpClientModule } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { CollapsibleWellComponent } from "src/app/common";
import { AuthService } from "src/app/user/auth.service";
import { DurationPipe, ISession } from "../shared";
import { VoterService } from "../shared/voter.service";

import { SessionListComponent } from "./session-list.component";
import { UpVoteComponent } from "./upvote.component";

describe("SessionListComponent", () => {
  let mockAuthService: any;
  let mockVoterService: any;
  let component: SessionListComponent;
  let fixture: ComponentFixture<SessionListComponent>;
  let element: HTMLElement;
  let debugElement: DebugElement;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(
      "mockAuthService",
      ["isAuthenticated", "login"],
      ["currentUser"]
    );
    mockVoterService = jasmine.createSpyObj("mockVoterService", [
      "addVoters",
      "removeVoters",
      "hasUserVoted",
    ]);
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [
        SessionListComponent,
        DurationPipe,
        CollapsibleWellComponent,
        UpVoteComponent,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: VoterService, useValue: mockVoterService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display correct title", () => {
    component.eventId = 1;
    component.sessions = [
      <ISession>{
        id: 1,
        name: "session 1",
        level: "Intermediate",
        duration: 1,
        presenter: "fredrik",
        abstract: "abstract",
        voters: [],
      },
    ];
    component.filterBy = "all";
    component.sortBy = "name";
    component.sortDirection = "DESC";
    component.ngOnChanges();

    fixture.detectChanges();

    // expect(element.querySelector("[well-title]")?.textContent).toContain(
    //   "Session 1"
    // );
    expect(
      debugElement.query(By.css("[well-title]")).nativeElement.textContent
    ).toContain("Session 1");
  });
});
