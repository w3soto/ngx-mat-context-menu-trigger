import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Component, ViewChild } from "@angular/core";
import { MatMenu, MatMenuModule } from "@angular/material/menu";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";

import { NgxMatContextMenuTrigger } from './ngx-mat-context-menu-trigger.directive';
import { NgxMatContextMenuTriggerModule } from "./ngx-mat-context-menu-trigger.module";


@Component({
  selector: 'test-component',
  template: `
    <div 
      [ngxMatContextMenuTriggerFor]="testMenu"
      [ngxMatContextMenuTriggerData]="{text: text}"  
      #trigger="ngxMatContextMenuTrigger">
    </div>
    <mat-menu #testMenu>
      <ng-template matMenuContent let-text="text">
        <button mat-menu-item>{{ text }}</button>
      </ng-template>
    </mat-menu>
  `
})
class TestComponent {
  text: string = 'Hello World';
  @ViewChild('trigger', {static: true})
  trigger!: NgxMatContextMenuTrigger;
  @ViewChild(MatMenu, {static: true})
  menu!: MatMenu
}


describe('NgxMatContextMenuTrigger', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        NgxMatContextMenuTrigger
      ],
      imports: [
        NoopAnimationsModule,
        MatMenuModule,
        // must import module due to "Export of name 'matMenuTrigger' not found!" error...
        NgxMatContextMenuTriggerModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cleanup', () => {
    spyOn(component.trigger, 'closeMenu').and.callThrough();
    component.trigger.ngOnDestroy();
    expect(component.trigger.closeMenu).toHaveBeenCalled();
  });

  it('should throw error if menu is not provided', () => {

    (component.trigger.menu as any)  = null;
    fixture.detectChanges();

    expect(() => {
      component.trigger.openMenu(0, 0);
      fixture.detectChanges();
    }).toThrowError();

  });

  it('should open and emit menuOpened event', fakeAsync(() => {

    spyOn(component.trigger as any, '_onOpen').and.callThrough();
    spyOn(component.trigger.menuOpened, 'emit').and.callThrough();

    component.trigger.openMenu(0, 0);

    fixture.detectChanges();

    tick(100);

    // check subscription call
    expect((component.trigger as any)._onOpen).toHaveBeenCalledTimes(1);
    expect(component.trigger.menuOpened.emit).toHaveBeenCalledTimes(1);
    expect(component.trigger.menuOpen).toBeTrue();

    // menu should be in DOM
    let openMenuItem = fixture.debugElement.query(By.css(".mat-menu-item"));
    expect(openMenuItem).toBeTruthy();

    flush();

  }));

  it('should close and emit menuClosed event', fakeAsync(() => {

    spyOn(component.trigger as any, '_onClose').and.callThrough();
    spyOn(component.trigger.menuClosed, 'emit').and.callThrough();

    component.trigger.openMenu(0, 0);
    fixture.detectChanges();

    tick(100);

    component.trigger.closeMenu();
    fixture.detectChanges();

    tick(100);

    // check subscription call
    expect((component.trigger as any)._onClose).toHaveBeenCalledTimes(1);
    expect(component.trigger.menuClosed.emit).toHaveBeenCalledTimes(1);
    expect(component.trigger.menuOpen).toBeFalse();

    // menu should be removed from DOM
    let closeMenuItem = fixture.debugElement.query(By.css(".mat-menu-item"));
    expect(closeMenuItem).toBeFalsy();

    flush();
  }));

  it('should close on document contextmenu event', fakeAsync(() => {

    component.trigger.openMenu(0, 0);
    fixture.detectChanges();

    tick(100);

    fixture.nativeElement.ownerDocument.dispatchEvent(new Event('contextmenu'));
    fixture.detectChanges();

    tick(100);

    // should be in closed state
    expect(component.trigger.menuOpen).toBeFalse();

    // menu should be removed from DOM
    let closeMenuItem = fixture.debugElement.query(By.css(".mat-menu-item"));
    expect(closeMenuItem).toBeFalsy();

    flush();
  }));

  it('should pass data to menu', fakeAsync(() => {
    const text = 'Second World';

    component.text = text;
    fixture.detectChanges();

    component.trigger.openMenu(0,0);
    fixture.detectChanges();

    tick(100);

    const menuItem = fixture.debugElement.query(By.css(".mat-menu-item"));
    expect(menuItem.nativeElement.textContent).toEqual(text);

    flush();
  }));

});
