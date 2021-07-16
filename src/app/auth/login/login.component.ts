/**
 * Component - Login
 * @functionCall - toggleFieldTextType(), doLogin()
 * @author Jishna AV (jishna.av@netobjex.com)
 * @author Sulfikar (sulfikar.n@netobjex.com)
 */

 import { Component, OnInit } from '@angular/core';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { Router } from '@angular/router';
// Services
 import { ApiService } from './../../services/api.service';
 import { ObservablesService } from './../../services/observables/observables.service';
 import { ValidationService } from './../../services/validation.service';
 // Alerts
 import { AlertBox } from './../../utils/alert-box';

 @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public fieldTextType: boolean;

  constructor(
    private router: Router,
    private alert: AlertBox,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private observables: ObservablesService,
  ) { }

  public ngOnInit() {
    this.observables.changeFormValid(false);
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required]],
    });
  }

  //  Switching method
  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  /**
   * function to sent the reset password link
   * @api functionCall - doLogin(data)
   * @params - username, password, remember
   * @return - success response with user details
   */
  public doLogin() {
    if (this.loginForm.invalid) {
      this.observables.changeFormValid(true);
      return;
    } else {
      (document.querySelector('.login-btn')).setAttribute('disabled', '');
    }

    const data: any = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      remember: true,
    };


  }

}
