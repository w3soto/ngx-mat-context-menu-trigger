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

  @ViewChild('menuTrigger', {static: true})
  menuTrigger!: MatMenuTrigger;

  constructor(
    private _host: ElementRef,
    private _renderer: Renderer2
  ) {}

  openMenu(x: number, y: number) {
    this._renderer.setStyle(this._host.nativeElement, 'left', x + 'px');
    this._renderer.setStyle(this._host.nativeElement, 'top', y + 'px');
    this.menuTrigger.openMenu();
  }

  closeMenu() {
    this.menuTrigger.closeMenu();
  }
}
