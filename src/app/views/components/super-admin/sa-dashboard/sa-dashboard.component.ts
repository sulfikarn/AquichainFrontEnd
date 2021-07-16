/**
 * Component - SaDashboardComponent
 * @author Jishna AV (jishna.av@netobjex.com)
 */
 import { Component, OnInit } from '@angular/core';
// Services
import { ObservablesService } from '../../../../services/observables/observables.service';

@Component({
  selector: 'app-sa-dashboard',
  templateUrl: './sa-dashboard.component.html',
  styleUrls: ['./sa-dashboard.component.css']
})
export class SaDashboardComponent implements OnInit {

  constructor(
    private observables: ObservablesService,
  ) { }

  ngOnInit(): void {
    this.observables.changePageTitle('Dashboard')
  }

}
