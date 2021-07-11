import { Component, OnInit, ViewChild} from '@angular/core';
import { SesionService} from '../servicios/sesion.service';
import { NavController, LoadingController, AlertController} from '@ionic/angular';
import { PeticionesAPIService} from '../servicios/index';
import { CalculosService } from '../servicios/calculos.service';
import {  Juego, Equipo, Alumno, MiAlumnoAMostrarJuegoDePuntos, Grupo, MiEquipoAMostrarJuegoDePuntos} from '../clases/index';
import { IonContent } from '@ionic/angular';
import { MiAlumnoAMostrarJuegoDeCuestionario } from '../clases/MiAlumnoAMostrarJuegoDeCuestionario';
@Component({
  selector: 'app-juego-seleccionado',
  templateUrl: './juego-seleccionado.page.html',
  styleUrls: ['./juego-seleccionado.page.scss'],
})
export class JuegoSeleccionadoPage implements OnInit {


  juegoSeleccionado: Juego;
  misAlumnosAMostrar: MiAlumnoAMostrarJuegoDePuntos[] = [];
  misEquiposJuegoPuntosAMostrar: MiEquipoAMostrarJuegoDePuntos[] = [];
  misAlumnosJuegoColeccion: Alumno[] = [];
  misEquiposJuegoColecciones: Equipo[] = [];
  miAlumno: Alumno;
  nuestroHistorialPuntos: any [] = [];
  grupo: Grupo;
  muestralo: boolean = false;


  constructor(
    private sesion: SesionService,
    public navCtrl: NavController,
    private peticionesAPI: PeticionesAPIService,
    private calculos: CalculosService,
  ) { }

  ngOnInit() {
    this.juegoSeleccionado = this.sesion.DameJuego();
    this.miAlumno = this.sesion.DameAlumno();
    this.nuestroHistorialPuntos = this.calculos.DameHistorialPuntosMiEquipo(this.miAlumno.id, this.juegoSeleccionado.id);
    console.log(this.juegoSeleccionado);
    this.peticionesAPI.DameGrupo(this.juegoSeleccionado.grupoId).subscribe(
      MiGrupo => {
        this.sesion.TomaGrupo(MiGrupo);
        this.grupo = MiGrupo;
        console.log('NO ENTRA AQUI???');
      }
    );

    console.log( 'Este es el grupo' + this.grupo );
    if ( this.juegoSeleccionado.tipo === 'Juego De Puntos' ) {
      if ( this.juegoSeleccionado.modo === 'Individual') {
        this.misAlumnosAMostrar = this.calculos.DameAlumnosJuegoPuntos(this.juegoSeleccionado.id);
        console.log('ya he traido los alumnos con los puntos');
        this.misAlumnosAMostrar = this.OrdenarPorPuntos();
        console.log(this.misAlumnosAMostrar);
      } else {
        this.misEquiposJuegoPuntosAMostrar = this.calculos.DameEquiposJuegoPuntos(this.juegoSeleccionado.id);
        console.log('ya he traido los equipos');
        console.log(this.misEquiposJuegoPuntosAMostrar);
      }
    } else if (this.juegoSeleccionado.tipo === 'Juego De Colección') {
      if ( this.juegoSeleccionado.modo === 'Individual') {
        this.peticionesAPI.DameAlumnosJuegoDeColeccion(this.juegoSeleccionado.id)
        .subscribe (alumnos => this.misAlumnosJuegoColeccion = alumnos);
      } else {
        this.peticionesAPI.DameEquiposJuegoDeColeccion(this.juegoSeleccionado.id).subscribe(
          listaEquipos => {
            this.misEquiposJuegoColecciones = listaEquipos;
            console.log('hola');
            console.log(this.misEquiposJuegoColecciones);
          });
      }
    }
  }

  // Se llama a la funcion al clicar sobre el sobre del equipo
  VerCromosEquipo(equipo: any) {
    console.log ('Voy a buscar los cromos del Equipo');
    this.sesion.TomaEquipo(equipo);
    this.navCtrl.navigateForward('/cromos-amostrar');
  }
  // Se llama a la funcion al clicar sobre el sobre del alumno
  VerCromosAlumno(alumno: any) {
    this.sesion.TomaAlumnoJuegoDeColeccion(alumno);
    this.navCtrl.navigateForward('/cromos-amostrar');
  }

  VerMisPuntos() {
    this.navCtrl.navigateForward('/mis-puntos');
  }

  VerInformacion() {
    this.navCtrl.navigateForward('/informacion');
  }

  IrIntercambiarCromos() {
    this.navCtrl.navigateForward('/intercambiar-cromos');
  }

  OrdenarPorPuntos() {
    // tslint:disable-next-line:only-arrow-functions
    this.misAlumnosAMostrar = this.misAlumnosAMostrar.sort(function(obj1, obj2) {
      return obj2.puntosTotalesAlumno - obj1.puntosTotalesAlumno;
    });
    return this.misAlumnosAMostrar;
  }

  VerRanking() {
    this.muestralo = true;
  }
}
