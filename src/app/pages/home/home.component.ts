import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

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
    this.routeParamName = this.activatedRoute.snapshot!.paramMap.get('name');
    console.log(this.routeParamName);
  }

  logout = ()=>{
    let userToken: string = this.authService.leerToken();
    console.log(userToken);
    localStorage.removeItem('token');
    this.authService.logout(userToken);
    this.router.navigateByUrl(`/login`);
  }

}
