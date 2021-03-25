import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  @Output() queryEvt = new EventEmitter<string>();

  query: string | undefined; 

  handleQuery(query: string | undefined) {
    this.queryEvt.emit(query);
  }

  constructor() {}

  ngOnInit() {}
}
