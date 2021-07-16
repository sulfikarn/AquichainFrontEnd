/**
 * Component - Forgot Password
 * @functionCall - forgotPassword()
 * @author Jishna AV (jishna.av@netobjex.com)
 * @author Sulfikar (sulfikar.n@netobjex.com)
 */

 import { Component, OnInit } from '@angular/core';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { Router } from '@angular/router';
// Services
 import { ApiService } from '../../services/api.service';
 import { ObservablesService } from '../../services/observables/observables.service';
 import { ValidationService } from '../../services/validation.service';
 // Alerts
 import { AlertBox } from '../../utils/alert-box';

 @Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
  public success: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private observables: ObservablesService,
    private alert: AlertBox,
    private apiService: ApiService,
  ) { }

  /**
   * Init function
   */
  public ngOnInit(): void {
    this.success = false;
    this.observables.changeFormValid(false);
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
    });
  }

  /**
   * function to sent the reset password link
   * @api functionCall - forgotPassword(data)
   * @params - email
   * @return - success response
   */
  public forgotPassword() {
    if (this.forgotPasswordForm.invalid) {
      this.observables.changeFormValid(true);
      return;
    } else {
      (document.querySelector('.forgot-password') as HTMLInputElement).setAttribute('disabled', '');
    }

    const data: any = {
      email: this.forgotPasswordForm.value.email,
    };

  
  }

}
