/**
 * Component - Reset Password
 * @functionCall - passwordMatcher(), toggleFieldTextType(), toggleRepeatFieldTextType(), doResetPassword()
 * @author Jishna AV (jishna.av@netobjex.com)
 * @author Sulfikar (sulfikar.n@netobjex.com)
 */

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Services
import { ApiService } from './../../services/api.service';
import { ObservablesService } from './../../services/observables/observables.service';
// Alerts
import { AlertBox } from './../../utils/alert-box';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  
  public title: string;
  public resetPasswordForm: FormGroup;
  public resetToken: string;
  public resetemail: string;
  public token: string;
  public email: string;
  public fieldTextType: boolean;
  public repeatFieldTextType: boolean;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private alert: AlertBox,
    public apiService: ApiService,
    private formBuilder: FormBuilder,
    private observables: ObservablesService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.token = params.token;
      this.email = params.email;
    });
  }

  public ngOnInit(): void {
    this.title = 'Reset-password';
    this.observables.changeFormValid(false);

    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, this.passwordMatcher.bind(this)]],
    });
  }

  // Password Matcher
  public passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
      this.resetPasswordForm &&
      control.value !== this.resetPasswordForm.controls.password.value
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }

  //  Switching method
  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  public toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  /**
   * function to reset password
   * @api functionCall - doResetPassword(data)
   * @params - email, token, password
   * @return - success response
   */
  public doResetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.observables.changeFormValid(true);
      return;
    } else {
      (document.querySelector(
        '.reset-password'
      ) as HTMLInputElement).setAttribute('disabled', '');
    }

    const data: any = {
      email: this.email,
      token: this.token,
      password: this.resetPasswordForm.value.password,
    };

    
  }
}
