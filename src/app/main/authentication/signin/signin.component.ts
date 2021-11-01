import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../shared/services/AuthenticationService';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  public username: string = '';
  public password: string = '';
  public rememberMe: boolean = false;
  public errorMessage: string = '';

  constructor(
    private fb: FormBuilder
    , private router: Router
    , private authenService: AuthenticationService) { }

  ngOnInit() {
    if (this.authenService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.username != '' && this.password != '') {
      this.authenService.login(this.username, this.password).then(rs => {
        if (rs) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = "Đăng nhập thất bại, vui lòng kiểm tra tài khoản và mật khẩu.";
        }
      },
        error => {
          this.errorMessage = "Đăng nhập thất bại, vui lòng kiểm tra tài khoản và mật khẩu.";
        });
    }
  }

}
