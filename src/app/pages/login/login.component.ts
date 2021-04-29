import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UsuarioModel } from './../../models/usuario.model';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public token: any;
  public user:any;
  public name:string;

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
            console.log(res)
            console.log(res.token);
            this.token = res.token;
            this.authService.guardarToken(this.token);

            if(this.token){
              this.user = form.value;
              this.authService.getUser(this.user.email)
                  .then(resp =>{
                    console.log(resp)
                    console.log(resp.user[0].name);
                    this.name = resp.user[0].name;
                    this.router.navigateByUrl(`/home/${this.name}`);
                  })
              Swal.fire({
                title: 'Correct credentials',
                text: 'You will be redirect to your account',
                icon: 'success',
                confirmButtonText: 'Ok',
              });
            }
          }).catch(err=>{

            Swal.fire({
              title: 'This credentials are not correct!',
              text: 'Please try again.',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          });
    }
  }

}
