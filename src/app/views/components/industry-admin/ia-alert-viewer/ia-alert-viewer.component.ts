import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
// Services
import { ObservablesService } from '../../../../services/observables/observables.service';
import { IaTableRowExpansionComponent } from '../../../modals/industry-admin/ia-table-row-expansion/ia-table-row-expansion.component';

@Component({
  selector: 'app-ia-alert-viewer',
  templateUrl: './ia-alert-viewer.component.html',
  styleUrls: ['./ia-alert-viewer.component.css']
})
export class IaAlertViewerComponent implements OnInit {

  constructor(
    private observables: ObservablesService,
    private dialog: MatDialog,
  ) { }
  displayedColumns: string[] = ['subIndustryName', 'product', 'consumedDate'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.observables.changePageTitle('Alert Viewer')
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public expandTableRow(setAlert:string){
    const dialogRef = this.dialog.open(IaTableRowExpansionComponent,{
      width:'100%',
      data:{
        page:'alert',
        alertData:setAlert
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {}
    });
  }

}

export interface PeriodicElement {
  product: string;
  subIndustryName: string;
  consumedDate: string;
  actualUsage:string
  waterThreshold:string;
  transactionID:string;
  blockchainHash:string


  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {subIndustryName: 'Bottling', product: "Coca-Cola", consumedDate:"6/6/2021", actualUsage:"1500 Litres", waterThreshold:"1000L",transactionID:" d5f45d5f4xc5vf4g5d5f5d5g4xcf",blockchainHash:" 0x2d2s2d22f2sd2f............22211sa"},
  {subIndustryName: 'Capping', product: "Coca-Cola", consumedDate:"6/6/2021", actualUsage:"1700 Litres", waterThreshold:"1500L",transactionID:" d5f45d5f4xc5vf4g5d5f5d5g4xcf",blockchainHash:" 0x2d2s2d22f2sd2f............22211sa"},
  {subIndustryName: 'Bottling', product: "Sprite", consumedDate:"6/6/2021",  actualUsage:"1600 Litres", waterThreshold:"1600L",transactionID:" d5f45d5f4xc5vf4g5d5f5d5g4xcf",blockchainHash:" 0x2d2s2d22f2sd2f............22211sa"},
  {subIndustryName: 'Bottling', product: "Sprite", consumedDate:"6/6/2021", actualUsage:"1200 Litres", waterThreshold:"1600L",transactionID:" d5f45d5f4xc5vf4g5d5f5d5g4xcf",blockchainHash:" 0x2d2s2d22f2sd2f............22211sa"},
  {subIndustryName: 'Capping', product: "Maaza", consumedDate:"6/6/2021", actualUsage:"1500 Litres", waterThreshold:"1000L",transactionID:" d5f45d5f4xc5vf4g5d5f5d5g4xcf",blockchainHash:" 0x2d2s2d22f2sd2f............22211sa"},
  {subIndustryName: 'Capping', product: "Sprite", consumedDate:"6/6/2021", actualUsage:"1500 Litres", waterThreshold:"1000L",transactionID:" d5f45d5f4xc5vf4g5d5f5d5g4xcf",blockchainHash:" 0x2d2s2d22f2sd2f............22211sa"},
];
