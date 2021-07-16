/**
 * Component - SaIndustryManagementComponent
 * @author Jishna AV (jishna.av@netobjex.com)
 */
 import { Component, OnInit } from '@angular/core';
// Services
import { ObservablesService } from '../../../../services/observables/observables.service';

@Component({
  selector: 'app-sa-industry-management',
  templateUrl: './sa-industry-management.component.html',
  styleUrls: ['./sa-industry-management.component.css']
})
export class SaIndustryManagementComponent implements OnInit {

  constructor(
    private observables: ObservablesService,
  ) { }

  ngOnInit(): void {
    this.observables.changePageTitle('Industry Management')
  }

}
