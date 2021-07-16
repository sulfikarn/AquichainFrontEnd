import { Component, OnInit } from '@angular/core';
// Services
import { ObservablesService } from '../../../../services/observables/observables.service';

@Component({
  selector: 'app-sa-alert-viewer',
  templateUrl: './sa-alert-viewer.component.html',
  styleUrls: ['./sa-alert-viewer.component.css']
})
export class SaAlertViewerComponent implements OnInit {

  constructor(
    private observables: ObservablesService,
  ) { }

  ngOnInit(): void {
    this.observables.changePageTitle('Alert Viewer')
  }

}
