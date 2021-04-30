import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public routeParamName: string| number | null;
  public user:any;

  constructor(
    private router:Router,
    private authService:AuthService
  ) { }

  ngOnInit() {

    //Acceder al USER a través de localStorage para ser usado en vistas
    this.user = this.authService.leerUser();
  }

  logout() {

    //Accedemos al token y enviamos petición ajax para logout
    let userToken: string = this.authService.leerToken();
    this.authService.logout(userToken)
      .then(resp =>{
        console.log(resp);
      }).catch(error => console.log(error));

    //Eliminamos token y user de localStorage
    this.authService.eliminarToken();
    this.authService.eliminarUser();

    //Alert success
    Swal.fire({
      title: 'Thanks for coming by!',
      text: 'We hope to see you soon',
      icon: 'success',
      confirmButtonText: 'Ok',
    });

    //Redirigimos a vista de login
    this.router.navigateByUrl('/login');

  }

}
