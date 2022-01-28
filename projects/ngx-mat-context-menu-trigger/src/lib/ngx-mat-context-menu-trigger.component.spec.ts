import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatContextMenuTriggerComponent } from './ngx-mat-context-menu-trigger.component';

describe('NgxMatContextMenuTriggerComponent', () => {
  let component: NgxMatContextMenuTriggerComponent;
  let fixture: ComponentFixture<NgxMatContextMenuTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatContextMenuTriggerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatContextMenuTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
