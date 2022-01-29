import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  HostListener,
  Input,
  OnDestroy,
  ViewContainerRef
} from '@angular/core';
import { first, tap } from "rxjs/operators";

import { MatMenu } from "@angular/material/menu";
import { NgxMatContextMenuTriggerHolder } from "./ngx-mat-context-menu-trigger-holder.component";


@Directive({
  selector: '[ngxMatContextMenuTriggerFor]',
  exportAs: 'ngxMatContextMenuTrigger'
})
export class NgxMatContextMenuTrigger implements OnDestroy {

  @Input('ngxMatContextMenuTriggerFor')
  menu!: MatMenu;

  menuTriggerHolder?: ComponentRef<NgxMatContextMenuTriggerHolder>;

  constructor(
    private _vcr: ViewContainerRef,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnDestroy() {
    this.menuTriggerHolder?.instance.closeMenu();
    this.menuTriggerHolder?.destroy();
  }

  @HostListener('contextmenu', ['$event'])
  handleContextMenu(e: PointerEvent): boolean {
    e.stopPropagation();
    this.openMenu(e.x, e.y);
    return false;
  }

  openMenu(x: number, y: number) {
    this.menuTriggerHolder = this._vcr.createComponent<NgxMatContextMenuTriggerHolder>(NgxMatContextMenuTriggerHolder);
    this.menuTriggerHolder.instance.menu = this.menu;
    this._cdr.detectChanges();

    this.menu.closed.pipe(
      tap(() => this.menuTriggerHolder?.destroy()),
      first()
    ).subscribe();

    this.menuTriggerHolder?.instance.openMenu(x, y);
  }

  closeMenu() {
    this.menuTriggerHolder?.instance.closeMenu();
  }

}
