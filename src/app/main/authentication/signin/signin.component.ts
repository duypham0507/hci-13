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
    

    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    
  }

}
