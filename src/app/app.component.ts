import { AuthService } from './servicios/auth.service';
import { Component, OnInit} from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Alumno } from '../app/clases/Alumno';
import { SesionService, ComServerService } from '../app/servicios';
import * as URL from '../app//URLs/urls';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  MiAlumno: Alumno;
  navigate: any;
  imagenPerfil: string;

  constructor(
    private sesion: SesionService,
    private comServer: ComServerService,
    private route: Router,
    public navCtrl: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    console.log('cuando se lee esto??');
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(localStorage.getItem('ACCESS_TOKEN') != null){
        this.authService.getUserIdByToken(this.authService.getAccessToken()).subscribe((data: any) => {
          this.authService.getAlumno(data.userId).subscribe((alumno: Alumno) => {
            this.MiAlumno = alumno;
            this.sesion.TomaAlumno(alumno);
            this.comServer.Conectar(alumno);
            if(alumno.imagenPerfil != null){
              this.imagenPerfil = URL.ImagenesPerfil + this.MiAlumno.imagenPerfil;
            } else {
              this.imagenPerfil = URL.ImagenesPerfil + "/UsuarioAlumno.jpg"
            }
          });        
        })
      } else {
        this.sesion.EnviameAlumno().subscribe((alumno) => {
          this.MiAlumno = alumno;
          if(alumno.imagenPerfil != null){
            this.imagenPerfil = URL.ImagenesPerfil + this.MiAlumno.imagenPerfil;
          } else {
            this.imagenPerfil = URL.ImagenesPerfil + "/UsuarioAlumno.jpg"
          }
        })
      }
      
      // this.sesion.EnviameAlumno().subscribe ((alumno) => {
      //   if(alumno != null){
          
      //   }
      // //  this.imagenPerfil = URL.ImagenesPerfil + this.MiAlumno.imagenPerfil;
      // });
    });
  }

  GoOut() {
    this.authService.logout().subscribe(() => {
      if(localStorage.getItem('ACCESS_TOKEN') != null){
        localStorage.removeItem('ACCESS_TOKEN');
      } else {
        sessionStorage.removeItem('ACCESS_TOKEN');
      }
      this.comServer.Desconectar(this.MiAlumno);
      this.route.navigateByUrl('/home');
    }, (error) => {
      Swal.fire('Error','No se puede cerrar sesión ahora, pruebalo de nuevo más tarde', 'error');
    });
  }

  GoMiPerfil() {
    console.log ('vamos a mi perfil');
    this.route.navigateByUrl('tabs/mi-perfil');
    //this.route.navigateByUrl('tabs/mis-grupos');
  }

  GoMisGrupos() {
    this.MiAlumno = this.sesion.DameAlumno();
    console.log ('Estamos');
    console.log (this.MiAlumno);
    this.route.navigateByUrl('tabs/mis-grupos');
  }

  GoMisJuegosActivos() {
    this.route.navigateByUrl('tabs/inici');
  }
  
  GoMisJuegosInactivos() {
    this.route.navigateByUrl('tabs/mis-juegos-inactivos');
  } 
}