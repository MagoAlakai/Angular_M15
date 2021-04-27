import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UsuarioModel } from './../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public token: any;

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private authService:AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
   }

  ngOnInit() {
  }

  login = (form:FormGroup) =>{
    if (form.invalid){return;};
    console.log(form);
    console.log(form.valid);
    console.log(form.value);

    if(form.valid){
      this.authService.getToken(form.value)
          .then(res =>{
            this.token = res;
            console.log(res);
            Swal.fire({
              title: 'Correct credentials',
              text: 'You will be redirect to your account',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.router.navigateByUrl('/shops');
          }).catch(err=>{
            Swal.fire({
              title: 'This credentials are not correct!',
              text: err,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          });
    }
  }

}
