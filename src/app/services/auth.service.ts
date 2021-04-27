import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string = 'http://127.0.0.1:8000/api/';
  userToken:string;

  constructor(
    private httpClient: HttpClient
  ) { }

  getToken = async(loginUser:UsuarioModel):Promise<any> =>{
    return await this.httpClient.post(`${this.url}login`, loginUser).toPromise();
  }

  logout = async() =>{
    return;
  }

  register = async(form:any):Promise<any> =>{
    console.log(form);
    return await this.httpClient.post(`${this.url}register`, form).toPromise() as Promise<any>;
  }

  public guardarToken (token: string){
    this.userToken = token;
    localStorage.setItem('token', token);
  }

  public leerToken (){

    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

    return this.userToken;
  }

}
