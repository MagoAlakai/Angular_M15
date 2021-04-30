import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'

//Models
import { UsuarioModel } from './../../models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public usuario:UsuarioModel;
  public registerForm: FormGroup;
  public token: string;

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private authService:AuthService,
  ) {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    })

   }

  ngOnInit() {

  }

  onSubmit = async (form:FormGroup) =>{

    //Validar form
    if(form.valid){

      //Llamada Ajax para registro
      this.authService.register(form.value)
          .then(resp => {
            this.token = resp.token;
            this.usuario = resp.user;

            //Alert success
            Swal.fire({
              title: 'Registration successful',
              text: 'You can now login into your account',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.router.navigateByUrl('/login');
          }).catch(error => console.log(error.error.errors.email[0]));
    }else{
      return;
    }
  }

}
