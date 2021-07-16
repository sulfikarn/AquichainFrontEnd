/**
 * Component - SaSourceManagementComponent
 * @author Jishna AV (jishna.av@netobjex.com)
 */
 import { Component, OnInit } from '@angular/core';
 import {AfterViewInit, ViewChild} from '@angular/core';
 import {MatPaginator} from '@angular/material/paginator';
 import {MatTableDataSource} from '@angular/material/table';
 import { MatDialog } from '@angular/material/dialog';
// Services
 import { ObservablesService } from '../../../../services/observables/observables.service';
 import { SaTableRowExpansionComponent } from '../../../modals/super-admin/sa-table-row-expansion/sa-table-row-expansion.component';
 import { SaCreateSourceManagementComponent } from '../../../modals/super-admin/sa-create-source-management/sa-create-source-management.component';

 @Component({
  selector: 'app-sa-source-management',
  templateUrl: './sa-source-management.component.html',
  styleUrls: ['./sa-source-management.component.css']
})
export class SaSourceManagementComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private observables: ObservablesService,
  ) { }

  displayedColumns: string[] = ['country', 'aquifierNumber', 'aquifierArea', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.observables.changePageTitle('Source Management');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * function to open create source management modal
   * @functionCall - openCreateSourceManagement()
   * @component - SaCreateSourceManagementComponent
   */
  public openCreateSourceManagement(){
    const dialogRef = this.dialog.open(SaCreateSourceManagementComponent, {
      width: '100%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {}
    });
  }

  /**
   * function to pop the detailed view of a row
   * @functionCall - expandTableRow()
   * @component - SaTableRowExpansionComponent
   * @params - page, taskId, alertId
   * @return - event result
   */
  public expandTableRow(dataSet: string) {
    const dialogRef = this.dialog.open(SaTableRowExpansionComponent, {
      width: '100%',
      data: {
        page: 'source',
        rowData: dataSet,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {}
    });
  }

}

 export interface PeriodicElement {
  aquifierNumber: number;
  country: string;
  aquifierArea: string;
}

 const ELEMENT_DATA: PeriodicElement[] = [
  {country: 'India', aquifierNumber: 1234, aquifierArea: 'XXX'},
  {country: 'USA', aquifierNumber: 4521, aquifierArea: 'QWE'},
  {country: 'Germany', aquifierNumber: 4578, aquifierArea: 'ERD'},
  {country: 'India', aquifierNumber: 1021, aquifierArea: 'DSW'},
  {country: 'USA', aquifierNumber: 3698, aquifierArea: 'QWE'},
  {country: 'USA', aquifierNumber: 1023, aquifierArea: 'DSW'},
  {country: 'India', aquifierNumber: 7845, aquifierArea: 'ERD'},
  {country: 'USA', aquifierNumber: 8569, aquifierArea: 'DER'},
  {country: 'India', aquifierNumber: 2563, aquifierArea: 'FDE'},
  {country: 'UK', aquifierNumber: 7423, aquifierArea: 'DCF'},
  {country: 'Canada', aquifierNumber: 4563, aquifierArea: 'FGT'},
];
