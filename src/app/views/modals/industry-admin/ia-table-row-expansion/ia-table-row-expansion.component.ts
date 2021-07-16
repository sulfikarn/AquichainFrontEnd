import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-ia-table-row-expansion',
  templateUrl: './ia-table-row-expansion.component.html',
  styleUrls: ['./ia-table-row-expansion.component.css']
})



export class IaTableRowExpansionComponent implements OnInit {
  
  public mainPage: any;
  public rowContent: any;
  public rowproduct:any;
  public rowAler:any;
  dataSourceModal;
  
  displayedColumns: string[] = ['date','subProductOne','subProductTwo','subProductThree','subProductfour'];

  constructor(
    public dialogRef: MatDialogRef<IaTableRowExpansionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) { 
    this.mainPage = data.page;
    this.rowContent = data.rowData;
    this.rowproduct = data.rowProductData
    this.rowAler = data.alertData
    
    this.dataSourceModal = new MatTableDataSource<ProductElement>(this.rowproduct);
  }

  ngOnInit(): void {
    
  }
}
export interface ProductElement {
  id:number;
  date:string;
  subProductOne:string;
  subProductTwo:string;
  subProductThree:string;
  subProductfour:string;
}
