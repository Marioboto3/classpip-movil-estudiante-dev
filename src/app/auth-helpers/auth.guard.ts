import { Alumno } from '../clases/Alumno';
import { SesionService } from '../servicios/sesion.service';
import { AuthService } from '../servicios/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private sesion: SesionService) { }

    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        if (!this.authService.isLoggedIn()) {
            console.log('No estás logueado');
            this.router.navigate(['/home']);
            return false;
        }

        return true;
    }
}