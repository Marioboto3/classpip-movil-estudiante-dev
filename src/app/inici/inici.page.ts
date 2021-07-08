import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ComServerService } from './../servicios/com-server.service';
import { AuthService } from './../servicios/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SesionService } from '../servicios/sesion.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PeticionesAPIService } from '../servicios/index';
import { CalculosService } from '../servicios/calculos.service';
import { Juego, Equipo, Alumno } from '../clases/index';
import { Router } from '@angular/router';
import { JuegoSeleccionadoPage } from '../juego-seleccionado/juego-seleccionado.page';
import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-inici',
  templateUrl: './inici.page.html',
  styleUrls: ['./inici.page.scss'],
})
export class IniciPage implements OnInit {

  /* Creamos los array con los juegos activos e inactivos que solicitaremos a la API */
  id: number;
  alumno: Alumno;
  contNotif = 0;
  juegosActivos: Juego[] = [];
  disablePrevBtn = true;
  disableNextBtn = false;




  @ViewChild(IonSlides, { static: false }) slides: IonSlides;



  //animals: any[];

  constructor(
    private route: Router,
    public navCtrl: NavController,
    private sesion: SesionService,
    private peticionesAPI: PeticionesAPIService,
    private calculos: CalculosService,
    private auth: AuthService,
    private comServer: ComServerService,
    private localNotifications: LocalNotifications
  ) { }


  ngOnInit() {
    let token = this.auth.getAccessToken();
    console.log('token: ', token);
    this.auth.getUserIdByToken(token).subscribe((data: any) => {
      this.auth.getAlumno(data.userId).subscribe((user: Alumno) => {
        console.log('response: ', user);
        this.id = user.id;
        this.alumno = user;
        this.sesion.TomaAlumno(this.alumno);
        this.comServer.Conectar(this.alumno);

        this.calculos.DameJuegosAlumno(this.id)
        .subscribe(listas => {
          this.juegosActivos = listas.activos;
      });
        this.comServer.EsperarNotificaciones()
        .subscribe((notificacion: any) => {
          console.log ('Pongo notificacion:  ' + notificacion );
          this.localNotifications.schedule({
            id: ++this.contNotif,
            text: notificacion,
          });
          console.log('Este es el id del alumno que se ha logado: ' + this.id);
         
        });
      });        
    });
  }


  JuegoSeleccionado(juego: any) {
    console.log("Juego: ", juego);
    console.log("Tipo juego: ", juego.tipo);
    this.sesion.TomaJuego(juego);
    if (juego.tipo === 'Juego De Puntos') {
      this.navCtrl.navigateForward('/juego-puntos');
    } else if (juego.tipo === 'Juego De Competición Liga') {
      this.navCtrl.navigateForward('/juego-competicion-liga');
    } else if (juego.tipo === 'Juego De Competición Fórmula Uno') {
      this.navCtrl.navigateForward('/juego-competicion-f1');
    } else if (juego.tipo === 'Juego De Cuestionario') {
      this.navCtrl.navigateForward('/juego-de-cuestionario');
    } else if (juego.tipo === 'Juego De Geocaching') {
      this.navCtrl.navigateForward('/juego-de-geocaching');
    } else if (juego.tipo === 'Juego De Avatar') {
      this.sesion.TomaJuegoAvatar(juego);
      this.navCtrl.navigateForward('/juego-avatar');
    } else if (juego.tipo === 'Juego De Votación Uno A Todos') {
      this.navCtrl.navigateForward('/juego-votacion-uno-atodos');
    } else if (juego.tipo === 'Juego De Votación Todos A Uno') {
      this.navCtrl.navigateForward('/juego-votacion-todos-auno');
    } else if (juego.tipo === 'Juego De Cuestionario de Satisfacción') {
      this.navCtrl.navigateForward('/juego-cuestionario-satisfaccion');
    } else if (juego.tipo === 'Evaluacion') {
      this.sesion.TomaJuegoEvaluacion(juego);
      this.navCtrl.navigateForward('/juego-evaluacion');
    } else if (juego.tipo === 'Juego De Escape Room') {
      this.sesion.TomaJuegoEscapeRoom(juego);
      console.log("Holaa");
      this.navCtrl.navigateForward('/juego-de-escape-room');}
    else {
      this.navCtrl.navigateForward('/juego-colleccion');
    }
  }
  doCheck() {
    // Para decidir si hay que mostrar los botones de previo o siguiente slide
    const prom1 = this.slides.isBeginning();
    const prom2 = this.slides.isEnd();

    Promise.all([prom1, prom2]).then((data) => {
      data[0] ? this.disablePrevBtn = true : this.disablePrevBtn = false;
      data[1] ? this.disableNextBtn = true : this.disableNextBtn = false;
    });
  }


  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }


}
