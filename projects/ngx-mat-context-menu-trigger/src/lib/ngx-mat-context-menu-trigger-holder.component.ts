import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { MatMenu, MatMenuTrigger } from "@angular/material/menu";
import { coerceNumberProperty } from "@angular/cdk/coercion";


@Component({
  selector: 'ngx-mat-context-menu-trigger-holder',
  templateUrl: './ngx-mat-context-menu-trigger-holder.component.html',
  styleUrls: ['./ngx-mat-context-menu-trigger-holder.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'ngx-mat-context-menu-trigger-holder'
  }
})
export class NgxMatContextMenuTriggerHolder {

  @Input()
  menu!: MatMenu;

  @Input()
  menuData: any;

  @Input()
  restoreFocus: boolean = true;

  @ViewChild('menuTrigger', {static: true})
  menuTrigger!: MatMenuTrigger;

  constructor(
    private _host: ElementRef,
    private _renderer: Renderer2
  ) {}

  openMenu(x: number, y: number) {
    this._renderer.setStyle(this._host.nativeElement, 'left', coerceNumberProperty(x, 0) + 'px');
    this._renderer.setStyle(this._host.nativeElement, 'top', coerceNumberProperty(y, 0) + 'px');
    this.menuTrigger.openMenu();
  }

  closeMenu() {
    this.menuTrigger.closeMenu();
  }
}
