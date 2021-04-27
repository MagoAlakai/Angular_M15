import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string = 'http://127.0.0.1:8000/api/';

  constructor(
    private httpClient: HttpClient
  ) { }

  getToken = async(loginUser:UsuarioModel):Promise<Object> =>{
    return await this.httpClient.post(`${this.url}login`, loginUser ).toPromise();
  }

  logout = async() =>{
    return;
  }

  register = async() =>{
    return;
  }


}
