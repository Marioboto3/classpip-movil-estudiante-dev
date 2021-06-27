import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as URL from 'src/app/URLs/urls';
import { Alumno } from '../clases';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private base = URL.host;

  private APIUrlAlumnos = this.base +  '3000/api/Alumnos';

  constructor(private http: HttpClient) { }

  public login(user: any): Observable<any> {
    return this.http.post(this.APIUrlAlumnos + '/login', user);
  }

  public getAlumno(alumnoId: number): Observable<Alumno> {
    return this.http.get<Alumno>(this.APIUrlAlumnos + '/' + alumnoId);
  }

  public register(user: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.APIUrlAlumnos, user);
  }
}
