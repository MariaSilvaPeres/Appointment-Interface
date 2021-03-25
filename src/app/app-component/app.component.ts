import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { without, findIndex } from 'lodash';
import { AppRoutingModule } from '../app-routing.module';

library.add(faTimes, faPlus);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  theList: object[] = [];
  modifiedList: object[] = [];
  orderBy: string;
  orderType: string;
  lastIndex!: number;

  addApt(theApt: any) {
    theApt.aptId = this.lastIndex;
    this.theList.unshift(theApt);
    this.modifiedList.unshift(theApt);
    this.lastIndex++;
  }

  deleteApt(theApt: object) {
    this.theList = without(this.theList, theApt);
    this.modifiedList = without(this.theList, theApt);
  }

  // searchApt(theQuery: string) {
  //   this.theList = this.theList.filter((eachItem) => {
  //     return (
  //       eachItem['petName'].toLowerCase().includes(theQuery.toLowerCase()) ||
  //       eachItem['ownerName'].toLowerCase().includes(theQuery.toLowerCase()) ||
  //       eachItem['aptNotes'].toLowerCase().includes(theQuery.toLowerCase())
  //     );
  //   });
  // }

  sortItems() {
    let order: number;
    if (this.orderType === 'asc') {
      order = 1;
    } else {
      order = -1;
    }

    // this.modifiedList.sort((a, b) => {
    //   if (
    //     a[this.orderBy].toLowerCase() < b[this.orderBy].toLowerCase()
    //   ) {
    //     return -1 * order;
    //   }
    //   if (
    //     a[this.orderBy].toLowerCase() > b[this.orderBy].toLowerCase()
    //   ) {
    //     return 1 * order;
    //   }
    // });
  }

  updateApt(aptInfo: {
    theApt: { aptId: number };
    labelName: string | number;
    newValue: number;
  }) {
    let aptIndex: number;
    let modifiedIndex: number;

    aptIndex = findIndex(this.theList, { aptId: aptInfo.theApt.aptId });
    modifiedIndex = findIndex(this.modifiedList, {
      aptId: aptInfo.theApt.aptId,
    });

    // this.theList[aptIndex][aptInfo.labelName] = aptInfo.newValue;
    // modified.theList[modifiedIndex][aptInfo.labelName] = aptInfo.newValue;
  }

  constructor(private http: HttpClient) {
    this.orderBy = 'petName';
    this.orderType = 'asc';
  }

  ngOnInit(): void {
    this.lastIndex = 0;
    this.http.get<Object[]>('../assets/data.json').subscribe((data) => {
      this.theList = data.map((item: any) => {
        item.aptId = this.lastIndex++;
        return item;
      });
      this.modifiedList = data;
      this.sortItems();
      console.log(this.modifiedList);
    });
  }
}
