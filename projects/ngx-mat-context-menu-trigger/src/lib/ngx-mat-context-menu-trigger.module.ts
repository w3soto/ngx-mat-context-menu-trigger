import { NgModule } from '@angular/core';
import { MatMenuModule } from "@angular/material/menu";

import { NgxMatContextMenuTrigger } from './ngx-mat-context-menu-trigger.directive';
import { NgxMatContextMenuTriggerHolder } from "./ngx-mat-context-menu-trigger-holder.component";


@NgModule({
  declarations: [
    NgxMatContextMenuTrigger,
    NgxMatContextMenuTriggerHolder
  ],
  imports: [
    MatMenuModule
  ],
  exports: [
    NgxMatContextMenuTrigger
  ]
})
export class NgxMatContextMenuTriggerModule { }
