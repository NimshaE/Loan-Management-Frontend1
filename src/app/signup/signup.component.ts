import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from './../services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstents } from '../shared/global-constents';
import { error } from 'console';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  password = true;
  confirmPassword = true;
  signupForm:any = FormGroup;
  responseMessage:any;


  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private SnackbarService:SnackbarService,
    public dialogRef:MatDialogRef<SignupComponent>,
    private ngxService:NgxUiLoaderService
    ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname:[null,[Validators.required,Validators.pattern(GlobalConstents.nameRegex)]],
      dob:[null,[Validators.required,Validators.pattern(GlobalConstents.dateRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstents.emailRegex)]],
      insPlan:[null,[Validators.required,Validators.pattern(GlobalConstents.nameRegex)]],
      password:[null,[Validators.required]],
      confirmPassword: [null,[Validators.required]]
    })
  }

  validateSubmit(){
    if(this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value){
      return true;
    }
    else{
      return false;
    }
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      fullname: formData.fullname,
      dob: formData.dob,
      email:formData.email,
      insPlan:formData.insPlan,
      password: formData.password
    }
    this.userService.signup(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.SnackbarService.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/']);
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstents.genericError;
      }
      this.SnackbarService.openSnackBar(this.responseMessage,GlobalConstents.error);
    })
  }

}
