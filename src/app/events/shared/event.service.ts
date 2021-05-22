import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, ObservableInput, of } from "rxjs";
import { ISession } from "./event.model";
import { IEvent } from "./index";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class EventService {
  private readonly baseUrl = "http://localhost:3000/api/";

  constructor(private http: HttpClient) {}

  getEvents(): Observable<IEvent[]> {
    return this.http
      .get<IEvent[]>(`${this.baseUrl}events`)
      .pipe(catchError(this.handleError<IEvent[]>("getEvents", [])));
  }

  getEvent(id: number): Observable<IEvent> {
    return this.http
      .get<IEvent>(`${this.baseUrl}events/${id}`)
      .pipe(catchError(this.handleError<IEvent>("getEvent")));
  }

  saveEvent(formValues: IEvent): Observable<IEvent> {
    return this.http
      .post<IEvent>(`${this.baseUrl}events`, {
        ...formValues,
        id: 999,
        sessions: [],
      })
      .pipe(catchError(this.handleError<IEvent>("saveEvent")));
  }

  updateEvent(event: IEvent): Observable<IEvent> {
    return this.http
      .put<IEvent>(`${this.baseUrl}events/${event.id}`, event)
      .pipe(catchError(this.handleError<IEvent>("updateEvent")));
  }

  searchSessions(searchTerm: string): Observable<ISession[]> {
    return this.http
      .get<IEvent[]>(`${this.baseUrl}events`)
      .pipe(
        map((events) => {
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
      )
      .pipe(catchError(this.handleError<ISession[]>("searchSessions", [])));
  }

  private handleError<T>(
    operation = "operation",
    result?: T
  ): (err: any, caught: Observable<T>) => ObservableInput<any> {
    return (err: any): Observable<T> => {
      console.error(err);
      return of(result as T);
    };
  }
}
