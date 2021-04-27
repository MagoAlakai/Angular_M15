import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Models
import { UsuarioModel } from './../../models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:UsuarioModel;
  public registerForm: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
  ) {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

   }

  ngOnInit() {

  }

  onSubmit = (form:FormGroup) =>{
    if (form.invalid){return;};
    console.log(form);
    console.log(form.valid);
    console.log(form.value);
  }

}
