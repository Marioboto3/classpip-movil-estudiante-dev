import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as URL from 'src/app/URLs/urls';
import { Alumno } from '../clases';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private host = URL.host;

  private APIUrlAlumnos = this.host +  '3000/api/Alumnos';
  private APIUrlTokens = this.host + '3000/api/AccessTokens'

  constructor(private http: HttpClient) { }

  ///////////////// CHECK LOGGED IN ////////////////////

  //true si esta, false si no
  public isLoggedIn(){
    if(sessionStorage.getItem('ACCESS_TOKEN') != null || localStorage.getItem('ACCESS_TOKEN') !== null)
      return true;

    else return false;
  }

  public setAccessToken(token: string){
    sessionStorage.setItem('ACCESS_TOKEN', token);
  }

  public setLocalAccessToken(token: string){
    localStorage.setItem('ACCESS_TOKEN', token);
  }

  getAccessToken(){
    if(localStorage.getItem('ACCESS_TOKEN') != null){
      return localStorage.getItem('ACCESS_TOKEN');
    } else if(sessionStorage.getItem('ACCESS_TOKEN') != null){
      return sessionStorage.getItem('ACCESS_TOKEN');
    } else {
      return null;
    }
  }

  public getUserIdByToken(token: string){
    return this.http.get(this.APIUrlTokens + '/' + token);
  }

  ///////////////// PETICIONES PROFESOR ///////////////////

  public login(user: any): Observable<any> {
    return this.http.post(this.APIUrlAlumnos + '/login', user);
  }

  public getAlumno(alumnoId: number): Observable<Alumno> {
    return this.http.get<Alumno>(this.APIUrlAlumnos + '/' + alumnoId);
  }

  public register(user: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.APIUrlAlumnos, user);
  }

  public logout(): Observable<any> {
    //No necesita body porque hace el logout con el access token que añade el interceptor
    return this.http.post(this.APIUrlAlumnos + '/logout', null);
  }

  public updateAlumno (id: number, body: Alumno){
    return this.http.put(this.APIUrlAlumnos + '/' + id, body);
  }

  public checkUsername(username: string): Observable<Alumno> {
    return this.http.get<Alumno>(this.APIUrlAlumnos + '?filter[where][username]=' + username);
  }

  public checkEmail(email: string): Observable<Alumno> {
    return this.http.get<Alumno>(this.APIUrlAlumnos + '?filter[where][email]=' + email);
  }
  
  public changePassword(old: String, newPass: String): Observable<any> {
    return this.http.post(this.APIUrlAlumnos + '/change-password', {"oldPassword": old, "newPassword": newPass});
  }
}
