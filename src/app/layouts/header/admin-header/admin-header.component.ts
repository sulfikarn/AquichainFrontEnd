/**
 * Component - AdminHeaderComponent
 * @author Jishna AV (jishna.av@netobjex.com)
 */
import { Component, OnInit } from '@angular/core';
// Services
import { ObservablesService } from '../../../services/observables/observables.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  public title: string;
  
  constructor(
    private observables: ObservablesService,
  ) {
    this.observables.pageHeading.subscribe((heading) => {
      this.title = heading;
    });
   }

  ngOnInit(): void {
  }

}
