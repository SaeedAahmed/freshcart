import { Component } from '@angular/core';
import { FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../srvices/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
   constructor(private _FormBuilder:FormBuilder ,private _AuthService:AuthService , private _Router:Router) { }

 msg:string = ''

  register:FormGroup = this._FormBuilder.group({
    name:[null,[Validators.required , Validators.pattern(/^\w{3,}(\s+\w+)*$/)]],
    email:[null,[Validators.required , Validators.pattern(/^.+@[a-zA-Z]+(\.[a-zA-Z]+)+$/)]],
    password:[null,[Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/)]],
    rePassword:[null] ,
    phone:[null,[Validators.required , Validators.pattern(/^(\+2)*01(1|0|2|5){1}[0-9]{8}$/)]]
  } , {Validators:[this.confirmPassword]} as FormControlOptions);

  confirmPassword(group: FormGroup): void {
    let password = group.get('password');
    let rePassword = group.get('rePassword');
  
    if (rePassword?.value == null || rePassword?.value ==' ') {
      rePassword?.setErrors({ required:true }); 
    } else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ misMatch:true });
    } else {
      rePassword?.setErrors(null);
    }
  }
  

  onSubmit(){
   if(this.register.valid){
    this._AuthService.signUp(this.register.value).subscribe({
      next:(res)=>{
        if(res.message == 'success'){
          this._Router.navigate(['/login']);
        }
      },
      error:(err)=>{
        this.msg=err.error.message
      }
    })
   }
   else{
    this.register.markAllAsTouched();
   }
   
  }

}
