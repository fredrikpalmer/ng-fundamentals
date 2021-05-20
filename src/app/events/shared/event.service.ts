import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ISession } from "./event.model";
import { IEvent } from "./index";
import { map } from "rxjs/operators";

@Injectable()
export class EventService {
  private readonly baseUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  getEvents(): Observable<IEvent[]> {
    return this.http
      .get(`${this.baseUrl}events`)
      .pipe(map((x) => x as IEvent[]));
  }

  getEvent(id: number): Observable<IEvent | undefined> {
    return this.http
      .get(`${this.baseUrl}events/${id}`)
      .pipe(map((e) => e as IEvent));
  }

  saveEvent(formValues: IEvent): Observable<IEvent> {
    return this.http
      .post(`${this.baseUrl}events`, {
        ...formValues,
        id: 999,
        sessions: [],
      })
      .pipe(map((o) => o as IEvent));
  }

  updateEvent(event: IEvent): Observable<IEvent> {
    return this.http
      .put(`${this.baseUrl}events/${event.id}`, event)
      .pipe(map((o) => o as IEvent));
  }

  searchSessions(searchTerm: string): Observable<ISession[]> {
    return this.http.get(`${this.baseUrl}events`).pipe(
      map((o) => {
        const events = o as IEvent[];
        return events
          .map((evt) =>
            evt.sessions.map(
              (session) => <ISession>{ ...session, eventId: evt.id }
            )
          )
          .reduce((prev, cur) => prev.concat(cur))
          .filter((session) =>
            session.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
      })
    );
  }
}
