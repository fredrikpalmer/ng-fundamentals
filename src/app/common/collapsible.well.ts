import { Component } from "@angular/core";

@Component({
  selector: "collapsible-well",
  template: `
    <div (click)="toggleWell()" class="well" pointable>
      <h4>
        <ng-content select="[well-title]"></ng-content>
      </h4>
      <ng-content *ngIf="visible" select="[well-body]"></ng-content>
    </div>
  `,
})
export class CollapsibleWellComponent {
  visible = true;

  constructor() {}

  toggleWell(): void {
    this.visible = !this.visible;
  }
}
