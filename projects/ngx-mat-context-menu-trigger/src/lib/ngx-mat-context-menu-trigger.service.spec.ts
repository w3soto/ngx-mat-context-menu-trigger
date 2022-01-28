import { TestBed } from '@angular/core/testing';

import { NgxMatContextMenuTriggerService } from './ngx-mat-context-menu-trigger.service';

describe('NgxMatContextMenuTriggerService', () => {
  let service: NgxMatContextMenuTriggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMatContextMenuTriggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
