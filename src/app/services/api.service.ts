/**
 * Service - API Services
 * @api functionType - POST, GET
 * @return - API response
 * @author Jishna AV (jishna.av@netobjex.com)
 * @author Sulfikar (sulfikar.n@netobjex.com)
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  public accessTokenPlatform: string;
  public accessToken: string;
  public userLogins: any;
  public userId: any;
  public userRole: string;
  public userFirstname: string;
  private httpOptions: any;
  private httpOptionsText: any;

  constructor(private http: HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }),
    };
    this.httpOptionsText = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain; charset=utf-8',
      }),
      responseType: 'text',
    };

    if (sessionStorage.getItem('currentUser')) {
      this.getAccessToken();
    }
  }

  /**
   * function to do session storage and other user details storage
   * @functionCall - getAccessToken()
   * @author Jishna AV
   */
  public getAccessToken() {
    if (sessionStorage.getItem('currentUser')) {
      // logged in so return true
      const user = JSON.parse(sessionStorage.getItem('currentUser'));

      this.userLogins = user.data;
      this.accessToken = user.token;
      this.accessTokenPlatform = user.data.token;
      this.userId = user.data.uid;
      this.userRole = user.data.roles[0];
      this.userFirstname = user.data.firstname;
      this.getheaders();
    }
    return;
  }

  /**
   * function to set headers for API calls
   * @functionCall - getheaders()
   * @author Jishna AV
   */
  public getheaders() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + this.accessToken,
      }),
    };
  }

  /**
   * function to clear sessions and other storage variables
   * @functionCall - getClearAll()
   * @author Jishna AV
   */
  public getClearAll() {
    this.userLogins = [];
    this.accessToken = '';
    this.accessTokenPlatform = '';
    this.userId = '';
    localStorage.clear();
    sessionStorage.removeItem('currentUser');
    sessionStorage.clear();
  }

  /**
   * common authentication Service API calls
   * @author Sulfikar
   */

   // Login
  public doLogin(data: any) {
    return this.http
      .post<any>(`${environment.apiUrl}` + 'api/login', data, this.httpOptions)
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user && user['token']) {
            // store user details and jwt token in session storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            this.getAccessToken();
          }
          return user;
        })
      );
  }

  // Logout
  public doLogout() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'X-APP-BUNDLE-ID': 'com.accenture.viera',
        // mode: 'no-cors',
      }),
    };
    return this.http
      .post<any>(`${environment.netobjexPlatformAPI}` + '/logout?access_token=' +
          this.accessTokenPlatform,
        this.httpOptions
      )
      .pipe(
        map((response) => {
          this.getClearAll();
          return response;
        })
      );
  }

  // Forgot Password
  public forgotPassword(data: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'X-APP-BUNDLE-ID': 'com.accenture.viera',
        // mode: 'no-cors',
      }),
    };
    return this.http
      .post<any>(`${environment.apiUrl}` + 'api/reset', data, this.httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  // Reset Password
  public doResetPassword(data: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'X-APP-BUNDLE-ID': 'com.accenture.viera',
        // mode: 'no-cors',
      }),
    };
    return this.http
      .post<any>(`${environment.netobjexPlatformAPI}` + '/confirm-reset',
        data,
        this.httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  /**
   * common user Service API calls
   * @author Jishna AV
   */

  // general get service | @author: jishna.av@netobjex.com
  public doGetRequest(url: any) {
    this.getAccessToken();
    return this.http
      .get<any>(`${environment.apiUrl}` + url, this.httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  // general post service | @author: jishna.av@netobjex.com
  public doPostRequest(url: any, data: any) {
    this.getAccessToken();
    return this.http
      .post<any>(`${environment.apiUrl}` + url, data, this.httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  // general get service | @author: jishna.av@netobjex.com
  public doGetOtherRequest(url: any) {
    this.getAccessToken();
    return this.http.get<any>(url, this.httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }

  // get service to fetch with text in warehouse component | @author: jishna.av@netobjex.com
  public fetchAPIWithText(url: any) {
    return this.http.get<any>(url, this.httpOptionsText).pipe(
      map((response) => {
        return response;
      })
    );
  }

  // API call to fetch alerts in every 30sec | @author: jishna.av@netobjex.com
  public getInstantAlerts(url: any, data: any) {
    return timer(0, 30000).pipe(
      switchMap((_) =>
        this.http.post<any>(
          `${environment.apiUrl}` + url,
          data,
          this.httpOptions
        )
      )
    );
  }

  // API call to get alert icons to be displayed on zone details | @author: jishna.av@netobjex.com
  public getalerticon() {
    return timer(0, 5000).pipe(
      switchMap((_) =>
        this.http.get<any>(
          `${environment.apiUrl}` + 'getzone-alerts-status',
          this.httpOptions
        )
      )
    );
  }

  // API call to resest simulation | @author: jishna.av@netobjex.com
  public resetSimulation() {
    return this.http
      .get<any>(`${environment.apiUrl}` + 'delete-alert', this.httpOptions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  // API call to fetch latest 5 alerts in every 5sec | @author: jishna.av@netobjex.com
  public getLatestAlerts(url: any) {
    return timer(0, 10000).pipe(
      switchMap((_) =>
        this.http.get<any>(`${environment.apiUrl}` + url, this.httpOptions)
      )
    );
  }

  // API call to get Live Tracking Status in every 5sec | @author: jishna.av@netobjex.com
  public getLiveTrackingStatus(url: any) {
    return timer(0, 5000).pipe(
      switchMap((_) => this.http.get<any>(url, this.httpOptions))
    );
  }
}
