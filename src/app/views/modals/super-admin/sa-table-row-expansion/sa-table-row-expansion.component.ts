/**
 * Component - SaTableRowExpansionComponent
 * Component for showing expanded view of a row in table
 * @author Jishna AV (jishna.av@netobjex.com)
 */
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sa-table-row-expansion',
  templateUrl: './sa-table-row-expansion.component.html',
  styleUrls: ['./sa-table-row-expansion.component.css']
})
export class SaTableRowExpansionComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  public mainPage: any;
  public rowContent: any;


  constructor(
    public dialogRef: MatDialogRef<SaTableRowExpansionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.mainPage = data.page;
    this.rowContent = data.rowData;
  }

  ngOnInit(): void {
  }

}
