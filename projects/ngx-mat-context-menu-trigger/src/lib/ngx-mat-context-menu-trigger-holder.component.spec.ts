import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxMatContextMenuTriggerHolder } from './ngx-mat-context-menu-trigger-holder.component';


describe('NgxMatContextMenuTriggerHolder', () => {
  let component: NgxMatContextMenuTriggerHolder;
  let fixture: ComponentFixture<NgxMatContextMenuTriggerHolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatContextMenuTriggerHolder ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatContextMenuTriggerHolder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
