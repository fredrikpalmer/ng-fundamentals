import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ISession } from "./event.model";

@Injectable()
export class VoterService {
  private readonly baseUrl: string = "http://localhost:3000/";
  constructor(private http: HttpClient) {}

  addVote(
    eventId: number,
    session: ISession,
    userName: string
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}events/${eventId}/sessions/${session.id}/voters`,
      {
        userName,
      }
    );
  }

  removeVote(
    eventId: number,
    session: ISession,
    userName: string
  ): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}events/${eventId}/sessions/${session.id}/voters`,
      {
        params: {
          userName,
        },
      }
    );
  }

  hasUserVoted(session: ISession, userName: string): boolean {
    return session.voters.includes(userName);
  }
}
