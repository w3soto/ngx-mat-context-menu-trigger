# NgxMatContextMenuTrigger

Context menu trigger for Angular Material

[![w3soto](https://circleci.com/gh/w3soto/ngx-mat-context-menu-trigger.svg?style=svg)](https://circleci.com/gh/w3soto/ngx-mat-context-menu-trigger)

[StackBlitz Demo](https://stackblitz.com/edit/angular-ivy-5bojir)

![Screenshot](https://raw.githubusercontent.com/w3soto/ngx-mat-context-menu-trigger/master/screenshot.png "Screenshot")

## Installation
```shell
npm -i @w3soto/ngx-mat-context-menu-trigger
```

## Example

For more details see *projects/demo* application

```typescript
import { NgxMatContextMenuTriggerModule } from "ngx-mat-context-menu-trigger";
...

@NgModule({
  imports: [
    ...,
    NgxMatContextMenuTriggerModule,
  ],
  ...
})
class AppModule { ... }

```

Disable native context menu
```typescript
document.body.addEventListener('contextmenu', (e: Event) => e.preventDefault());
```

Template 
```html
  <div
    class="context-menu-div"
    [ngxMatContextMenuTriggerFor]="myMenu"
    [ngxMatContextMenuTriggerData]="{title: 'My Menu Title'}">
      
    Context menu
    
  </div>

  <mat-menu #myMenu>
    <ng-template matMenuContent let-title="title">
      <h4>{{ title }}</h4>
      <button mat-menu-item>Menu item 1</button>
      <button mat-menu-item>Menu item 2</button>
      <button mat-menu-item>Menu item 3</button>
    </ng-template>
  </mat-menu>
```

## Directives 

* **ngxMatContextMenuTriggerFor**

| @Input | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| **ngxMatContextMenuTriggerFor** | MatMenu | | MatMenu component (required!) |
| **ngxMatContextMenuTriggerDisabled** | boolean | false | |
| **ngxMatContextMenuTriggerData** | any | | |
| **ngxMatContextMenuTriggerRestoreFocus** | boolean | true |  |

| @Output | Type | Description |
| ------- | ---- | ----------- |
| **menuOpened** | void | Emitted when menu is opened |
| **menuClosed** | void | Emitted when menu is closed |

Exported as **ngxMatContextMenuTrigger**
