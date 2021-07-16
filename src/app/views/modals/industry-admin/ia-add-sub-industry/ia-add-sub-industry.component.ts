import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ia-add-sub-industry',
  templateUrl: './ia-add-sub-industry.component.html',
  styleUrls: ['./ia-add-sub-industry.component.css']
})
export class IaAddSubIndustryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<IaAddSubIndustryComponent>,
  ) { }

  ngOnInit(): void {
  }

}
