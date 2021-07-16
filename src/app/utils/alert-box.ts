/**
 * File - AlertBox
 * @author Jishna AV (jishna.av@netobjex.com)
 */
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AlertBox {
  constructor(private toastr: ToastrService) {}

  public success(title: string, content: string) {
    this.toastr.success(content, title);
  }

  public error(title: string, content: string, statusCode: number) {
    if (statusCode === 500) {
      this.toastr.error('Internal Server Error. Please try again.', 'Oops!');
    } else {
      this.toastr.error(content, title);
    }
  }

  public info(title: string, content: string) {
    this.toastr.info(content, title);
  }

  public warning(title: string, content: string) {
    this.toastr.warning(content, title);
  }
}
