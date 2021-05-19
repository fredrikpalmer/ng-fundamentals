import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { JQUERY_TOKEN } from "./jquery.service";

@Directive({ selector: "[modal-trigger]" })
export class ModalTriggerDirective implements OnInit, OnDestroy {
  private el: HTMLButtonElement;
  @Input("modal-trigger") modalId!: string;

  constructor(
    ref: ElementRef<HTMLButtonElement>,
    @Inject(JQUERY_TOKEN) private $: any
  ) {
    this.el = ref.nativeElement;
  }

  ngOnInit(): void {
    this.el.addEventListener("click", this.handleClick);
  }

  ngOnDestroy(): void {
    this.el.removeEventListener("click", this.handleClick);
  }

  handleClick = (evt: MouseEvent): void => {
    this.$(`#${this.modalId}`).modal({});
  };
}
