import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public passwordForm: FormGroup;
  public user:UsuarioModel;

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private authService:AuthService
  ) {
    this.passwordForm = this.formBuilder.group({
      email: ['', Validators.required],
    })
   }

  ngOnInit() {
  }

  sendPasswordMail (form:FormGroup){
    console.log(form.value);
    let email = form.value.email;

    this.authService.getUser(email)
        .then(resp =>{
          console.log(resp)
          this.user = resp;
        }).catch(err=>{
          console.log(err);
        });

    this.authService.forgotPassword(form.value)
        .then(resp =>{
          console.log(resp);
        }).catch(err=>{
          console.log(err);
        })
  }

}
