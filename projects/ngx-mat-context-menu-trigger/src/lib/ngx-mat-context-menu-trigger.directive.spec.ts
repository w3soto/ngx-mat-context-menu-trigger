import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatContextMenuTrigger } from './ngx-mat-context-menu-trigger.directive';

describe('NgxMatContextMenuTrigger', () => {
  let component: NgxMatContextMenuTrigger;
  let fixture: ComponentFixture<NgxMatContextMenuTrigger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatContextMenuTrigger ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatContextMenuTrigger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
