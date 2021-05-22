/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "upvote",
  styleUrls: ["./upvote.component.css"],
  template: `
    <div class="votingWidgetContainer pointable" (click)="handleClick()">
      <div class="well votingWidget">
        <div class="votingButton">
          <i class="glyphicon glyphicon-heart" [style.color]="iconColor"></i>
        </div>
        <div class="badge badge-inverse votingCount">
          <div>{{ count }}</div>
        </div>
      </div>
    </div>
  `,
})
export class UpVoteComponent {
  @Input() count!: number;
  @Input() voted!: boolean;
  @Output() vote = new EventEmitter();
  get iconColor(): string {
    return this.voted ? "red" : "inherit";
  }

  handleClick(): void {
    this.vote.emit();
  }
}
