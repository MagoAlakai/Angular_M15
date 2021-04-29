import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private authService:AuthService
  ) { }

  ngOnInit() {

    //Acceder al nombre del USER a través de param de URL
    this.routeParamName = this.activatedRoute.snapshot!.paramMap.get('name');
    console.log(this.routeParamName);
  }

  logout() {

    let userToken: string = this.authService.leerToken();
    console.log(userToken);
    this.authService.eliminarToken();

    Swal.fire({
      title: 'Thanks for coming by!',
      text: 'We hope to see you soon',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    this.router.navigateByUrl('/login');
    this.authService.logout(userToken)
      .then(resp =>{
        console.log(resp);
      }).catch(error => console.log(error));

  }

}
