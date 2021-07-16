import { Component, OnInit } from '@angular/core';
// Services
import { ObservablesService } from '../../../../services/observables/observables.service';

@Component({
  selector: 'app-ia-dashboard',
  templateUrl: './ia-dashboard.component.html',
  styleUrls: ['./ia-dashboard.component.css']
})
export class IaDashboardComponent implements OnInit {

  constructor(
    private observables: ObservablesService,
  ) { }

  ngOnInit(): void {
    this.observables.changePageTitle('Dashboard')
  }

}
