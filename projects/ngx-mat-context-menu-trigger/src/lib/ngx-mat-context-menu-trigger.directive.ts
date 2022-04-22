import {
  ChangeDetectorRef,
  ComponentRef,
  Directive, EventEmitter,
  HostListener, Inject,
  Input,
  OnDestroy, Output, Renderer2,
  ViewContainerRef
} from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { first, tap } from "rxjs/operators";

import { MatMenu } from "@angular/material/menu";

import { NgxMatContextMenuTriggerHolder } from "./ngx-mat-context-menu-trigger-holder.component";
import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";


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
  set restoreFocus(val: BooleanInput) {
    this._restoreFocus = coerceBooleanProperty(val);
  }
  get restoreFocus(): boolean {
    return this._restoreFocus;
  }
  _restoreFocus: boolean = true;

  @Output()
  readonly menuClosed: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  readonly menuOpened: EventEmitter<void> = new EventEmitter<void>();

  get menuOpen(): boolean {
    return this._menuOpen;
  }
  private _menuOpen = false;

  private _menuTriggerHolder?: ComponentRef<NgxMatContextMenuTriggerHolder>;

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
    this.openMenu(e.x, e.y);
    return false;
  }

  openMenu(x: number, y: number) {
    if (this._menuOpen) {
      return;
    }

    this._checkMenu();

    this._vcr.clear();

    this._menuTriggerHolder = this._vcr.createComponent<NgxMatContextMenuTriggerHolder>(NgxMatContextMenuTriggerHolder);

    this._menuTriggerHolder.instance.menu = this.menu;
    this._menuTriggerHolder.instance.menuData = this.menuData;
    this._menuTriggerHolder.instance.restoreFocus = this.restoreFocus;

    this._cdr.detectChanges();

    this._menuTriggerHolder.instance.menuTrigger.menuOpened.pipe(
      tap(() => this._onOpen()),
      first()
    ).subscribe();

    this._menuTriggerHolder.instance.menuTrigger.menuClosed.pipe(
      tap(() => this._onClose()),
      first()
    ).subscribe();

    this._docCtxMnuUnListen = this._rnd.listen(this._doc, 'contextmenu', (e: Event) => {
      this.closeMenu();
      e.preventDefault();
    });

    this._menuTriggerHolder?.instance.openMenu(x, y);
    this._menuOpen = true;
  }

  closeMenu() {
    this._menuTriggerHolder?.instance.closeMenu();
    this._menuOpen = false;
  }

  private _checkMenu() {
    if (!this.menu) {
      throw Error('ngxMatContextMenuTriggerFor: must pass in an mat-menu instance.');
    }
  }

  private _onOpen() {
    this._menuOpen = true;
    this.menuOpened.emit();
  }

  private _onClose() {
    this._menuTriggerHolder?.destroy();
    this._docCtxMnuUnListen();
    this._menuOpen = false;
    this.menuClosed.emit();
  }

}
