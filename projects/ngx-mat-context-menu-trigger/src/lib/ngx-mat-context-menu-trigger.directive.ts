import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  HostListener, Inject,
  Input,
  OnDestroy, Renderer2,
  ViewContainerRef
} from '@angular/core';
import { first, tap } from "rxjs/operators";

import { MatMenu } from "@angular/material/menu";
import { NgxMatContextMenuTriggerHolder } from "./ngx-mat-context-menu-trigger-holder.component";
import { DOCUMENT } from "@angular/common";


@Directive({
  selector: '[ngxMatContextMenuTriggerFor]',
  exportAs: 'ngxMatContextMenuTrigger'
})
export class NgxMatContextMenuTrigger implements OnDestroy {

  @Input('ngxMatContextMenuTriggerFor')
  menu!: MatMenu;

  @Input('ngxMatContextMenuTriggerData')
  menuData: any;

  @Input('ngxMatContextMenuTriggerRestoreFocus')
  restoreFocus: boolean = true;

  menuTriggerHolder?: ComponentRef<NgxMatContextMenuTriggerHolder>;

  private _docCtxMnuUnListen: Function = () => {};

  constructor(
    private _vcr: ViewContainerRef,
    private _cdr: ChangeDetectorRef,
    private _rnd: Renderer2,
    @Inject(DOCUMENT) private _doc: Document,
  ) {}

  ngOnDestroy() {
    this.closeMenu();
  }

  @HostListener('contextmenu', ['$event'])
  handleContextMenu(e: PointerEvent): boolean {
    e.stopPropagation();
    this.closeMenu();
    this.openMenu(e.x, e.y);
    return false;
  }

  openMenu(x: number, y: number) {
    this.menuTriggerHolder = this._vcr.createComponent<NgxMatContextMenuTriggerHolder>(NgxMatContextMenuTriggerHolder);
    this.menuTriggerHolder.instance.menu = this.menu;
    this.menuTriggerHolder.instance.menuData = this.menuData;
    this.menuTriggerHolder.instance.restoreFocus = this.restoreFocus;

    this._cdr.detectChanges();

    this.menu.closed.pipe(
      tap(() => this.menuTriggerHolder?.destroy()),
      first()
    ).subscribe();

    this._docCtxMnuUnListen = this._rnd.listen(this._doc, 'contextmenu', (e: Event) => {
      this.closeMenu();
      e.preventDefault();
    });

    this.menuTriggerHolder?.instance.openMenu(x, y);
  }

  closeMenu() {
    this.menuTriggerHolder?.instance.closeMenu();
    this.menuTriggerHolder?.destroy();
    this._docCtxMnuUnListen();
  }

}
