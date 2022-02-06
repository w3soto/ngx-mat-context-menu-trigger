import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatMenu, MatMenuModule } from "@angular/material/menu";
import { Component, ViewChild } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { NgxMatContextMenuTriggerHolder } from './ngx-mat-context-menu-trigger-holder.component';


@Component({
  selector: 'test-component',
  template: `
    <ngx-mat-context-menu-trigger-holder
      [menu]="testMenu"
      [menuData]="{text: text}"      
    ></ngx-mat-context-menu-trigger-holder>
    <mat-menu #testMenu>
      <ng-template matMenuContent let-text="text">
        <button mat-menu-item>{{ text }}</button>
      </ng-template>
    </mat-menu>
  `
})
class TestComponent {
  text: string = 'Hello World';
  @ViewChild(NgxMatContextMenuTriggerHolder, {static: true})
  holder!: NgxMatContextMenuTriggerHolder;
  @ViewChild(MatMenu, {static: true})
  menu!: MatMenu
}


describe('NgxMatContextMenuTriggerHolder', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        NgxMatContextMenuTriggerHolder
      ],
      imports: [
        NoopAnimationsModule,
        MatMenuModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.holder).toBeTruthy();
    expect(component.menu).toBeTruthy();
  });

  it('should open and close menu', fakeAsync(() => {
    // OPEN
    spyOn(component.holder.menuTrigger, 'openMenu').and.callThrough();

    component.holder.openMenu(123,456);

    // check menu position
    let holder = fixture.debugElement.query(By.css('.ngx-mat-context-menu-trigger-holder'));
    expect(holder.nativeElement.offsetLeft).toEqual(123);
    expect(holder.nativeElement.offsetTop).toEqual(456);

    // check trigger call
    expect(component.holder.menuTrigger.openMenu).toHaveBeenCalled();

    // check displayed menu
    let openMenuItem = fixture.debugElement.query(By.css(".mat-menu-item"));
    expect(openMenuItem).toBeTruthy();

    tick(100);

    // CLOSE
    spyOn(component.holder.menuTrigger, 'closeMenu').and.callThrough();

    component.holder.closeMenu();

    // check trigger call
    expect(component.holder.menuTrigger.closeMenu).toHaveBeenCalled();

    // check destroyed menu
    let closeMenuItem = fixture.debugElement.query(By.css(".mat-menu-item"));
    expect(closeMenuItem).toBeFalsy();

    flush();
  }));

  it('should pass data to menu', fakeAsync(() => {
    const text = 'Second World';

    component.text = text;
    fixture.detectChanges();

    component.holder.openMenu(0,0);
    fixture.detectChanges();

    tick(100);

    const menuItem = fixture.debugElement.query(By.css(".mat-menu-item"));
    expect(menuItem.nativeElement.textContent).toEqual(text);

    flush();
  }));

});
