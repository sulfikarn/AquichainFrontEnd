import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObservablesService {
  /**
   * changes
   * on
   */

  private formValid = new BehaviorSubject<boolean>(false);
  private pageTitle = new BehaviorSubject<string>('Dashboard');
  
  public validForm = this.formValid.asObservable();
  public pageHeading = this.pageTitle.asObservable();
 
  constructor(private router: Router) {}

  public changeFormValid(valid: any) {
    this.formValid.next(valid);
  }
  public changePageTitle(head: any) {
    this.pageTitle.next(head);
  }
}
