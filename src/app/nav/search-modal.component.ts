import { Component, ElementRef, Inject, Input, ViewChild } from "@angular/core";
import { JQUERY_TOKEN } from "../common";

@Component({
  selector: "session-modal",
  template: `
    <div class="session-modal-title">
      <h4>{{ title }}</h4>
    </div>
    <div class="session-modal-body">
      <ng-content></ng-content>
    </div>
    <div [id]="elementId" #modalcontainer class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">Modal title</h4>
          </div>
          <div class="modal-body" (click)="closeModal()">
            <p>One fine body&hellip;</p>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
  `,
  styles: [
    `
      .session-modal-title,
      .session-modal-body {
        position: absolute;
        right: 30%;
        z-index: 999;
        min-width: 350px;
        border: 1px solid;
      }

      .session-modal-title,
      .session-modal-title h4 {
        padding: 10px 15px;
      }

      .session-modal-title h4 {
        background-color: #4e5d6c;
        margin: -10px -15px;
      }
    `,
  ],
})
export class SearchModalComponent {
  @Input() elementId!: string;
  @Input() title!: string;
  @ViewChild("modalcontainer") containerEl!: ElementRef<HTMLDivElement>;

  constructor(@Inject(JQUERY_TOKEN) private $: any) {}

  closeModal(): void {
    this.$(this.containerEl.nativeElement).modal("hide");
  }
}
