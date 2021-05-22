import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";
import { AuthService } from "src/app/user/auth.service";
import { ISession } from "../shared";
import { VoterService } from "../shared/voter.service";

type ISort<T extends {}> = T & {
  [key: string]: any;
};

interface ISortingStrategy<T extends string | number | []> {
  get<T extends any, K extends keyof T>(type: T, key: K): boolean;
  sort(
    left: T,
    right: T,
    sortBy: string,
    sortDirection: string | undefined
  ): number;
}

class StringSortingStrategy implements ISortingStrategy<string> {
  get<T extends any, K extends keyof T>(type: T, key: K): boolean {
    return typeof type[key] === "string";
  }

  sort(
    left: string,
    right: string,
    sortBy: string,
    sortDirection: string | undefined
  ): number {
    return sortDirection === "DESC"
      ? this.desc(left, right)
      : this.asc(left, right);
  }

  private desc(left: string, right: string) {
    if (left === right) {
      return 0;
    } else if (left > right) {
      return -1;
    } else {
      return 1;
    }
  }

  private asc(left: string, right: string) {
    if (left === right) {
      return 0;
    } else if (left > right) {
      return 1;
    } else {
      return -1;
    }
  }
}

class NumberSortingStrategy implements ISortingStrategy<number> {
  get<T extends any, K extends keyof T>(type: T, key: K): boolean {
    return typeof type[key] === "number";
  }
  sort(
    left: number,
    right: number,
    sortBy: string,
    sortDirection: string | undefined
  ): number {
    return sortDirection === "DESC"
      ? this.desc(left, right)
      : this.asc(left, right);
  }

  private desc(left: number, right: number) {
    return right - left;
  }

  private asc(left: number, right: number) {
    return left - right;
  }
}

class ArrayLengthSortingStrategy implements ISortingStrategy<[]> {
  constructor(private sortingStrategy: ISortingStrategy<number>) {}

  get<T extends any, K extends keyof T>(type: T, key: K): boolean {
    return type[key] instanceof Array;
  }
  sort(
    left: [],
    right: [],
    sortBy: string,
    sortDirection: string | undefined
  ): number {
    let leftLength = left.length;
    let rightLength = right.length;

    return this.sortingStrategy.sort(
      leftLength,
      rightLength,
      sortBy,
      sortDirection
    );
  }
}

@Component({
  selector: "session-list",
  templateUrl: "./session-list.component.html",
  styleUrls: ["./session-list.component.css"],
})
export class SessionListComponent implements OnChanges {
  @Input() eventId: number | undefined;
  @Input() sessions: ISession[] | undefined;
  @Input() filterBy!: string;
  @Input() sortBy!: string;
  @Input() sortDirection!: string | undefined;
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output("toggleVote") toggleVoteEvent = new EventEmitter();
  visibleSessions: ISession[] | undefined = [];
  sortingStrategies: ISortingStrategy<string | number | []>[] = [
    new StringSortingStrategy(),
    new NumberSortingStrategy(),
    new ArrayLengthSortingStrategy(new NumberSortingStrategy()),
  ];

  constructor(public auth: AuthService, private voterService: VoterService) {}

  ngOnChanges(): void {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.visibleSessions?.sort((x, y) =>
        this.sort(x, y, this.sortBy, this.sortDirection)
      );
    }
  }
  filterSessions(filterBy: string): void {
    if (filterBy === "all") {
      this.visibleSessions = this.sessions?.slice(0);
    } else {
      this.visibleSessions = this.sessions?.filter(
        (x) => x.level.toLowerCase() === filterBy
      );
    }
  }

  sort<T extends ISort<ISession>>(
    x: T,
    y: T,
    sortBy: string,
    sortDirection: string | undefined
  ): number {
    let left = x?.[sortBy];
    let right = y?.[sortBy];

    let sortingStrategy = this.sortingStrategies.find((s) => s.get(x, sortBy));
    if (!sortingStrategy) {
      return 0;
    }
    return sortingStrategy?.sort(left, right, sortBy, sortDirection);
  }

  toggleVote(session: ISession): void {
    if (this.eventId === undefined) {
      return;
    }

    const userName = this.auth.currentUser?.userName ?? "anonymous";
    if (session.voters.includes(userName)) {
      this.voterService
        .removeVote(this.eventId, session, userName)
        .subscribe(() => {
          session.voters.splice(session.voters.indexOf(userName), 1);
        });
    } else {
      this.voterService
        .addVote(this.eventId, session, userName)
        .subscribe(() => {
          session.voters.push(userName);
        });
    }
  }

  hasUserVoted(session: ISession): boolean {
    const userName = this.auth.currentUser?.userName ?? "anonymous";
    return this.voterService.hasUserVoted(session, userName);
  }
}
