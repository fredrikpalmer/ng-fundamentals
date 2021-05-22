import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ObservableInput, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ISession } from "./event.model";

@Injectable()
export class VoterService {
  private readonly baseUrl: string = "http://localhost:3000/api/";
  constructor(private http: HttpClient) {}

  addVote(
    eventId: number,
    session: ISession,
    userName: string
  ): Observable<string> {
    return this.http
      .post<string>(
        `${this.baseUrl}events/${eventId}/sessions/${session.id}/voters`,
        {
          userName,
        }
      )
      .pipe(catchError(this.handleError<string>("addVote")));
  }

  removeVote(
    eventId: number,
    session: ISession,
    userName: string
  ): Observable<any> {
    return this.http
      .delete(
        `${this.baseUrl}events/${eventId}/sessions/${session.id}/voters`,
        {
          params: {
            userName,
          },
        }
      )
      .pipe(catchError(this.handleError("removeVote")));
  }

  hasUserVoted(session: ISession, userName: string): boolean {
    return session.voters.includes(userName);
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
