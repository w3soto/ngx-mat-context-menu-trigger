import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";

import { NgxMatContextMenuTriggerModule } from "ngx-mat-context-menu-trigger";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatMenuModule,

    NgxMatContextMenuTriggerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
