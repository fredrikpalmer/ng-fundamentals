import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ISession } from "./event.model";

@Injectable()
export class VoterService {
  constructor() {}

  addVote(session: ISession, userName: string): Observable<void> {
    session.voters.push(userName);

    const votedEvent = new EventEmitter();
    votedEvent.emit(session);
    return votedEvent;
  }

  removeVote(session: ISession, userName: string): Observable<void> {
    const index = session.voters.indexOf(userName);
    session.voters.splice(index, 1);

    const votedEvent = new EventEmitter();
    votedEvent.emit(session);
    return votedEvent;
  }

  hasUserVoted(session: ISession, userName: string): boolean {
    return session.voters.includes(userName);
  }
}
