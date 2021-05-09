import { TestBed } from "@angular/core/testing";
import { EventsAppComponent } from "./events-app.component";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EventsAppComponent
      ],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(EventsAppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title "ng-fundamentals"`, () => {
    const fixture = TestBed.createComponent(EventsAppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("ng-fundamentals");
  });

  it("should render title", () => {
    const fixture = TestBed.createComponent(EventsAppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector(".content span").textContent).toContain("ng-fundamentals app is running!");
  });
});
