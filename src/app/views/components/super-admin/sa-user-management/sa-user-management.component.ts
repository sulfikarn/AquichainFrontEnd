/**
 * Component - SaUserManagementComponent
 * @author Jishna AV (jishna.av@netobjex.com)
 */
 import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
// Services
import { ObservablesService } from '../../../../services/observables/observables.service';

import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-sa-user-management',
  templateUrl: './sa-user-management.component.html',
  styleUrls: ['./sa-user-management.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SaUserManagementComponent implements OnInit {

  constructor(
    private observables: ObservablesService,
  ) { }

  ngOnInit(): void {
    this.observables.changePageTitle('User Management')
  }

  displayedColumns: string[] = ['country', 'aquifierNumber', 'aquifierArea', 'action'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource = new ExampleDataSource();


  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

}

// export interface PeriodicElement {
export interface Element {
  aquifierNumber: number;
  country: string;
  aquifierArea: string;
  action: boolean,
}

// const ELEMENT_DATA: PeriodicElement[] = [
const data: Element[] = [

  {country: 'India', aquifierNumber: 1234, aquifierArea: 'XXX', action: true},
  {country: 'USA', aquifierNumber: 4521, aquifierArea: 'QWE', action: true},
  {country: 'Germany', aquifierNumber: 4578, aquifierArea: 'ERD', action: true},
  {country: 'India', aquifierNumber: 1021, aquifierArea: 'DSW', action: true},
  {country: 'USA', aquifierNumber: 3698, aquifierArea: 'QWE', action: true},
  {country: 'USA', aquifierNumber: 1023, aquifierArea: 'DSW', action: true},
  {country: 'India', aquifierNumber: 7845, aquifierArea: 'ERD', action: true},
  {country: 'USA', aquifierNumber: 8569, aquifierArea: 'DER', action: true},
  {country: 'India', aquifierNumber: 2563, aquifierArea: 'FDE', action: true},
  {country: 'UK', aquifierNumber: 7423, aquifierArea: 'DCF', action: true},
  {country: 'Canada', aquifierNumber: 4563, aquifierArea: 'FGT', action: true},
];

// export class TableComponent {
 
//   // isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
// }

export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    const rows = [];
    data.forEach(element => rows.push(element, { detailRow: true, element }));
    console.log(rows);
    return of(rows);
  }

  disconnect() { }
}
