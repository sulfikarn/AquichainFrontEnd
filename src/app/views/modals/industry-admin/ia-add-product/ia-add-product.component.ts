import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-ia-add-product',
  templateUrl: './ia-add-product.component.html',
  styleUrls: ['./ia-add-product.component.css']
})
export class IaAddProductComponent implements OnInit {
  values = [];
  selectedCity: any;
  constructor(
    public dialogRef: MatDialogRef<IaAddProductComponent>,
  ) { }

  ngOnInit(): void {
  }

  states: string[] = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ];

  selectedStates = this.states;
  
  
  onKey(value) {
    this.selectedStates = this.search(value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.states.filter(option =>
      option.toLowerCase().startsWith(filter)
    );
  }

  removevalue(i){
    this.values.splice(i,1);
  }

  addvalue(){
    this.values.push({value: ""});
  }

}
