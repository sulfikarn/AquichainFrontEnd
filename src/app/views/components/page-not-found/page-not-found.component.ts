/**
 * Component - Page not Found
 * @author Jishna AV (jishna.av@netobjex.com)
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(public router: Router) {}

  public ngOnInit() {}

  public goBack() {
    if (this.router.url.split('/')[1] === 'user') {
      this.router.navigate(['/user']);
    }
  }
}
