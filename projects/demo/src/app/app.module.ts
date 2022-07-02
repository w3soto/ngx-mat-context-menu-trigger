import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";

import { NgxMatContextMenuTriggerModule } from "ngx-mat-context-menu-trigger";

import { AppComponent } from './app.component';
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { TestComponentComponent } from './test-component/test-component.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatCardModule,
    MatCheckboxModule,

    NgxMatContextMenuTriggerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
