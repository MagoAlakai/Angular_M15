import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getUser = async(email:string):Promise<any> =>{
    return await this.httpClient.get(`${this.url}user/${email}`).toPromise();
  }

  logout = async(token:string) =>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return await this.httpClient.get(`${this.url}logout`, httpOptions).toPromise();
  }

  register = async(form:any):Promise<any> =>{
    console.log(form);
    return await this.httpClient.post(`${this.url}register`, form).toPromise() as Promise<any>;
  }

  public guardarToken (token: string){
    this.userToken = token;
    localStorage.setItem('token', token);
  }

  public eliminarToken (){
    localStorage.removeItem('token');
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
