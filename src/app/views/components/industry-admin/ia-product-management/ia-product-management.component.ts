import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
// Services
import { ObservablesService } from '../../../../services/observables/observables.service';
import { IaTableRowExpansionComponent } from '../../../modals/industry-admin/ia-table-row-expansion/ia-table-row-expansion.component';
import { IaAddProductComponent } from '../../../modals/industry-admin/ia-add-product/ia-add-product.component'
@Component({
  selector: 'app-ia-product-management',
  templateUrl: './ia-product-management.component.html',
  styleUrls: ['./ia-product-management.component.css']
})
export class IaProductManagementComponent implements OnInit {

  constructor(
    private observables: ObservablesService,
    private dialog: MatDialog,
  ) { }

  displayedColumns: string[] = ['productName', 'industryName', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.observables.changePageTitle('Product Management')
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public openAddProduct(){
    const dialogRef = this.dialog.open(IaAddProductComponent,{
      width:"100%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {}
    });
  }

  public expandTableRow(set: string) {
    const dialogRef = this.dialog.open(IaTableRowExpansionComponent, {
      width: '100%',
      data: {
        page: 'product',
        rowProductData: ELEMENT_DATA_MODAL,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {}
    });
  }

}

export interface PeriodicElement {
  id:number;
  productName: string;
  industryName: string;
}

const ELEMENT_DATA: PeriodicElement[] = 
[
  
  {
    id:1,
    productName: 'Maaza', 
    industryName: "Coca-Cola",
   
  },
  {
    id:2,
    productName: 'Coca-Cola', 
    industryName: "Coca-Cola", 
  },
  {
    id:3,
    productName: 'Slice', 
    industryName: "Pepsico", 
  },
  {
    id:4,
    productName: 'Sprite', 
    industryName: "Coca-Cola", 
  },
  
];

export interface ProductElement {
  id:number;
  date:string;
  subProductOne:string;
  subProductTwo:string;
  subProductThree:string;
  subProductfour:string;
}

const ELEMENT_DATA_MODAL: ProductElement[] = 
[
  
  {
    id:1,
    date: '06/21/2021', 
    subProductOne: "01",
    subProductTwo:"01",
    subProductThree:"01",
    subProductfour:"01",

  },
  {
    id:2,
    date: '06/22/2021', 
    subProductOne: "01", 
    subProductTwo:"01",
    subProductThree:"01",
    subProductfour:"01",
  },
  {
    id:3,
    date: '06/22/2021', 
    subProductOne: "01", 
    subProductTwo:"01",
    subProductThree:"01",
    subProductfour:"01",
  },
  {
    id:4,
    date: '06/22/2021', 
    subProductOne: "01", 
    subProductTwo:"01",
    subProductThree:"01",
    subProductfour:"01",
  },
  
];