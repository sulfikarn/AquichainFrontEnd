/**
 * Component - SaTableRowExpansionComponent
 * Component for showing expanded view of a row in table
 * @author Jishna AV (jishna.av@netobjex.com)
 */
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sa-create-source-management',
  templateUrl: './sa-create-source-management.component.html',
  styleUrls: ['./sa-create-source-management.component.css']
})
export class SaCreateSourceManagementComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  
  constructor(
    public dialogRef: MatDialogRef<SaCreateSourceManagementComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
  }

}

