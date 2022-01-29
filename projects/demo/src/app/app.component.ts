import { Component, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    // disable native context menu
    document.body.addEventListener('contextmenu', (e: Event) => e.preventDefault());
  }

}
