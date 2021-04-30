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
  public remindUser: boolean;
  public email:string;

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

    //Guardar mail en LocalStorage para funcionalidad remember me
    if(localStorage.getItem('email')){
      this.email = localStorage.getItem('email');
      this.remindUser = true;
    }
  }

  login = (form:FormGroup) =>{

    //Validar form
    if(form.valid){

      //Llamada Ajax para login
      this.authService.getToken(form.value)
          .then(res =>{

            //Almacenamos token y user en localstorage
            this.user = res.user;
            this.name = res.user['name'];
            this.token = res.token;
            this.authService.guardarUser(this.user)
            this.authService.guardarToken(this.token);

            //Validación del token
            if(this.token){

              //Validar opción remember me para añadir o quitar mail de localstorage
              if(this.remindUser){
                localStorage.setItem('email', this.user.email);
              }else{
                localStorage.removeItem('email');
              }

              //Entrar al dashboard personal
              this.router.navigateByUrl(`/home`);


              //Alert success
              Swal.fire({
                title: 'Correct credentials',
                text: 'You will be redirect to your account',
                icon: 'success',
                confirmButtonText: 'Ok',
              });
            }
          }).catch(err=>{

            //Alert error
            Swal.fire({
              title: 'This credentials are not correct!',
              text: 'Please try again.',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          });
    }else{
      return;
    }
  }

}
