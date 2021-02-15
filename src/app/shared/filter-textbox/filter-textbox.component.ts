import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-textbox',
  template: `
    <form style="width:100%; margin-left:6%">

      <div>

        <input type="text"
                name="filter"
                [(ngModel)]="model.filter"
                #filter="ngModel"
                (keyup)="filterChanged($event)"
                placeholder="Search..."
                style="border-radius:5px; border:1px solid #1e118c;"
        />
        <a style="font-weight:bold; cursor:pointer;"
           (click)="clearSearch()"
           name="clear"
           [hidden]="!model.filter"
           #clear
        >
          Clear Search
        </a>

      </div>

    </form>
  `
})

export class FilterTextboxComponent {

    model: { filter: string } = { filter: null };

    @Output()
    changed: EventEmitter<string> = new EventEmitter<string>();

    filterChanged(event: any) {
      event.preventDefault();
      this.changed.emit(this.model.filter); // Raise changed event
    }

    clearSearch() {
      this.model.filter = '';
      this.changed.emit(this.model.filter); // Raise changed event
    }
}
