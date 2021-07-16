/**
 * Component - Profile
 * Component for profile, changing password for user
 * @author Jishna AV (jishna.av@netobjex.com)
 */

 import { Component, OnInit } from '@angular/core';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
 import { Router } from '@angular/router';

 // services
 import { ApiService } from '../../../services/api.service';
 // import custom validator to ValidationService that new-password and confirm-password fields match
 import { MustMatch } from '../../../services/match-validator/must-match.validator';
 // import custom validator to ValidationService that old-password and new-password fields does not match
 import { MustNotMatch } from '../../../services/match-validator/must-not-match.validator';
 import { ObservablesService } from '../../../services/observables/observables.service';
 import { ValidationService } from '../../../services/validation.service';
 import { AlertBox } from '../../../utils/alert-box';

 @Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public updateProfileForm: FormGroup;
  public encryptedData: any;
  public isShowChangePassword: boolean;
  public isEditProfile: boolean;
  public userDetails: any;
  public profileImage: any;

  constructor(
    private dialog: MatDialog,
    private alert: AlertBox,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private observables: ObservablesService,
  ) {}

  public ngOnInit(): void {
    this.onLoad();
  }

  public onLoad() {
    // this.observables.profileImage.subscribe((profileImage) => {
    //   this.profileImage = profileImage;
    // });

    this.userDetails = '';
    this.changePasswordForm = this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, ValidationService.passwordValidator]],
        confirmPassword: ['', [Validators.required, ValidationService.passwordValidator]],
      },
      {
        validator: [MustNotMatch('currentPassword', 'newPassword'), MustMatch('newPassword', 'confirmPassword')],
      },
    );

    this.updateProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, ValidationService.textOnlyValidator]],
      lastName: ['', [Validators.required, ValidationService.textOnlyValidator]],
    });

    this.isShowChangePassword = false;
    this.isEditProfile = true;
    this.observables.changePageTitle('Account');
    this.observables.changeFormValid(false);
    this.getUserDetails();
  }

  public changePasswordButtonToggle() {
    this.isShowChangePassword = !this.isShowChangePassword;
  }

  public EditProfileToggle() {
    this.isEditProfile = !this.isEditProfile;
    this.observables.changePageTitle('Edit Profile');
  }

  /**
   * function to toggle the type of password
   */

  public viewPassword(passwordId: any) {
    if ((document.getElementById(passwordId) as HTMLInputElement).type === 'password') {
      (document.getElementById(passwordId) as HTMLInputElement).type = 'text';
    } else {
      (document.getElementById(passwordId) as HTMLInputElement).type = 'password';
    }
  }

  public changeProfileImage(): void {
    // const dialogRef = this.dialog.open(ProfileImgUploadComponent, {
    //   width: '100%',
    //   data: {
    //     image: 'profileImage',
    //   },
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     dialogRef.close();
    //     this.getUserDetails();
    //   }
    // });
  }

  public removeProfileImage() {
    // const url = 'users/remove-profilepic/' + this.api.userId;
    // this.api.doPatchRequest(url, '').subscribe(
    //   (returnData: any) => {
    //     this.getUserDetails();
    //     this.alert.success('Success', 'Profile image removed');
    //   },
    //   (error) => {
    //     this.alert.error('Oops!', 'Something went wrong, Please try again later');
    //   },
    // );
  }

  public getUserDetails() {
    const url = 'users/' + this.api.userId;
    this.api.doGetRequest(url).subscribe(
      (returnData: any) => {
        this.userDetails = returnData;
        this.setSession(returnData);
        this.doPatchUserDetails(returnData);
      },
      (error) => {
        // this.alert.error('Oops!', 'Something went wrong, Please try again later');
      },
    );
  }

  public setSession(data: any) {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    user.data = data;
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.api.getAccessToken();
  }

  public doPatchUserDetails(data: any) {
    this.updateProfileForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }

  public UpdateProfile() {
    if (this.updateProfileForm.invalid) {
      this.observables.changeFormValid(true);
      return;
    } else {
      (document.querySelector('.update-profile') as HTMLInputElement).setAttribute('disabled', '');
    }

    const url = 'users/' + this.api.userId;
    const data = {
      firstName: this.updateProfileForm.value.firstName,
      lastName: this.updateProfileForm.value.lastName,
    };
    // this.api.doPatchRequest(url, data).subscribe(
    //   (returnData: any) => {
    //     this.observables.changeFormValid(false);
    //     this.alert.success('Success', 'Profile updated successfully');
    //     (document.querySelector('.update-profile') as HTMLInputElement).removeAttribute('disabled');
    //     this.onLoad();
    //   },
    //   (error) => {
    //     this.observables.changeFormValid(false);
    //     // this.alert.error('Oops!', 'Something went wrong, Please try again later');
    //     (document.querySelector('.update-profile') as HTMLInputElement).removeAttribute('disabled');
    //     this.onLoad();
    //   },
    // );
  }

  /**
   * function to change password
   * @api functionCall - doPostRequest()
   * @url - (apiUrl)/users/changePassword
   * @return - response
   */

  public changePassword() {
    if (this.changePasswordForm.invalid) {
      this.observables.changeFormValid(true);
      return;
    } else {
      (document.querySelector('.change-password') as HTMLInputElement).setAttribute('disabled', '');
    }

    const url = 'users/resetPassword/' + this.api.accessToken;
    const data = {
      password: this.changePasswordForm.value.newPassword,
      oldPassword: this.changePasswordForm.value.currentPassword,
    };
    // this.api.doPatchRequest(url, data).subscribe(
    //   (returnData: any) => {
    //     console.log(returnData);

    //     this.observables.changeFormValid(false);
    //     this.alert.success('Success', 'Your password has been changed Successfully')
    //     ; (document.querySelector('.change-password') as HTMLInputElement).removeAttribute('disabled');
    //     this.onLoad();
    //   },
    //   (error) => {
    //     console.log(error);
    //     if (error.status === 401) {
    //       this.alert.error('Oops!', 'Invalid current password, Please enter correct password');
    //     } else {
    //       this.alert.error('Oops!', 'Something went wrong, Please try again later');
    //       this.onLoad();
    //     }
    //     this.observables.changeFormValid(false)
    //     ; (document.querySelector('.change-password') as HTMLInputElement).removeAttribute('disabled');
    //   },
    // );
  }
}
