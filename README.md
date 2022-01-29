# NgxMatContextMenuTrigger

Context menu trigger for Angular Material

[StackBlitz Demo](https://stackblitz.com/edit/angular-ivy-5bojir)

[GitHub](https://github.com/w3soto/ngx-mat-context-menu-trigger)

![Screenshot](https://raw.githubusercontent.com/w3soto/ngx-mat-context-menu-trigger/master/screenshot.png "Screenshot")

## Installation
```shell
npm -i ngx-mat-context-menu-trigger
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

Template 
```html
  <div
    class="context-menu-div"
    [ngxMatContextMenuTriggerFor]="myMenu">
    
    Context menu
    
  </div>

  <mat-menu #myMenu>
    <button mat-menu-item>Menu item 1</button>
    <button mat-menu-item>Menu item 2</button>
    <button mat-menu-item>Menu item 3</button>
  </mat-menu>
```

## Directives 

* **ngxMatContextMenuTriggerFor**

| @Input | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| **ngxMatContextMenuTriggerFor** | MatMenu | | MatMenu component (required!) |

Exported as **ngxMatContextMenuTrigger**
