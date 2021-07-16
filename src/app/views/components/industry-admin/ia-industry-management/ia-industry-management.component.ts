import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
// Services
import { IaTableRowExpansionComponent } from '../../../modals/industry-admin/ia-table-row-expansion/ia-table-row-expansion.component';
import { IaAddSubIndustryComponent } from '../../../modals/industry-admin/ia-add-sub-industry/ia-add-sub-industry.component';
import { ObservablesService } from '../../../../services/observables/observables.service';

@Component({
  selector: 'app-ia-industry-management',
  templateUrl: './ia-industry-management.component.html',
  styleUrls: ['./ia-industry-management.component.css']
})
export class IaIndustryManagementComponent implements OnInit {

  constructor(
    private observables: ObservablesService,
    private dialog: MatDialog,
  ) { }

  displayedColumns: string[] = ['subIndustryName', 'aquifierNumber', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.observables.changePageTitle('Industry Management')
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public openCreateIndustryManagement(){
    const dialogRef = this.dialog.open(IaAddSubIndustryComponent,{
      width:"100%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {}
    });
  }

  public expandTableRow(dataSet: string) {
    const dialogRef = this.dialog.open(IaTableRowExpansionComponent, {
      width: '100%',
      data: {
        page: 'industry',
        rowData: dataSet,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {}
    });
  }

}

export interface PeriodicElement {
  aquifierNumber: string;
  subIndustryName: string;
  Threshold: string;
  waterConsumption:string;
  production:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {subIndustryName: 'Beverages', aquifierNumber: "A1",Threshold:"1000L", waterConsumption:"1000L",production:"500 Units"},
  {subIndustryName: 'Bottling', aquifierNumber: "A1", Threshold:"1000L", waterConsumption:"1500L", production:"700 Units"},
  {subIndustryName: 'Capping', aquifierNumber: "A1", Threshold:"1000L", waterConsumption:"1200L", production:"500 Units"},
  {subIndustryName: 'Labeling', aquifierNumber: "A1", Threshold:"1000L", waterConsumption:"1200L", production:"500 Units"},
  
];
