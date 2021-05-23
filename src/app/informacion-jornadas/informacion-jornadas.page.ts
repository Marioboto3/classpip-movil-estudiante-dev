import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PeticionesAPIService } from '../servicios/index';
import { CalculosService } from '../servicios/calculos.service';
import {
  Alumno, Juego, Jornada, TablaJornadas, EnfrentamientoLiga, TablaAlumnoJuegoDeCompeticion,

  TablaEquipoJuegoDeCompeticion, AlumnoJuegoDeCompeticionLiga, TablaClasificacionJornada, Equipo

} from '../clases/index';
import { SesionService } from '../servicios/sesion.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-informacion-jornadas',
  templateUrl: './informacion-jornadas.page.html',
  styleUrls: ['./informacion-jornadas.page.scss'],
})
export class InformacionJornadasPage implements OnInit {

  juegoSeleccionado: Juego;
  jornadas: Jornada[];
  numeroTotalJornadas: number;
  jornadasCompeticion: TablaJornadas[] = [];
  listaAlumnosClasificacion: TablaAlumnoJuegoDeCompeticion[] = [];
  listaEquiposClasificacion: TablaEquipoJuegoDeCompeticion[] = [];
  miAlumno: Alumno;
  miEquipo: Equipo;
  

  enfrentamientosJornadaSeleccionada: EnfrentamientoLiga[] = [];
  botonResultadosDesactivado: boolean;
  alumnosDelGrupo: Alumno[];

  //f1
  tablaf1Jornada: TablaClasificacionJornada[] = [];
  tablaf1Juego: EnfrentamientoLiga[][];
  datosClasificacionJornada: {
    participante: string[];
    puntos: number[];
    posicion: number[];
    participanteId: number[];
  };
  tablaClasificacionJornadaSeleccionada: TablaClasificacionJornada[];
  ganadoresJornadaF1: TablaClasificacionJornada[];
  imagenesDePerfil: string[];

  constructor(
    private sesion: SesionService,
    public navCtrl: NavController,
    private peticionesAPI: PeticionesAPIService,
    private calculos: CalculosService,
  ) { }

  ngOnInit() {
    this.miAlumno = this.sesion.DameAlumno();
    this.miEquipo = this.sesion.DameEquipo();
    this.juegoSeleccionado = this.sesion.DameJuego();
    this.numeroTotalJornadas = this.juegoSeleccionado.numeroTotalJornadas;
    const datos = this.sesion.DameDatosJornadas();
    this.jornadasCompeticion = datos.JornadasCompeticion;
    console.log('Jornadas Competicion: ');
    // Teniendo la tabla de Jornadas puedo sacar los enfrentamientos de cada jornada accediendo a la api
    console.log(this.jornadasCompeticion);
    this.listaAlumnosClasificacion = this.sesion.DameTablaAlumnoJuegoDeCompeticion();
    this.listaEquiposClasificacion = this.sesion.DameTablaEquipoJuegoDeCompeticion();
    console.log('La lista de alumnos es: ');
    console.log(this.listaAlumnosClasificacion);
    this.peticionesAPI.DameAlumnosGrupo (this.juegoSeleccionado.grupoId)
    .subscribe (alumnos => this.alumnosDelGrupo = alumnos);
  }

  

  // Para Competición Fórmula Uno:
  ObtenerEnfrentamientosDeCadaJornada(jornadaSeleccionada: TablaJornadas) {
    if (this.juegoSeleccionado.tipo === "Juego De Competición Liga") {
      console.log('El id de la jornada seleccionada es: ' + jornadaSeleccionada.id);
      this.peticionesAPI.DameEnfrentamientosDeCadaJornadaLiga(jornadaSeleccionada.id)
        .subscribe(enfrentamientos => {
          this.enfrentamientosJornadaSeleccionada = enfrentamientos;
          console.log('Los enfrentamientos de esta jornada son: ');
          console.log(this.enfrentamientosJornadaSeleccionada);
          console.log('Ya tengo los enfrentamientos de la jornada, ahora tengo que mostrarlos en una tabla');
          this.ConstruirTablaEnfrentamientos();
        });
    } else {
      console.log('El id de la jornada seleccionada es: ' + jornadaSeleccionada.id);
      if (jornadaSeleccionada.ganadoresFormulaUno === undefined) {
        this.datosClasificacionJornada = this.calculos.ClasificacionJornada(this.juegoSeleccionado, this.listaAlumnosClasificacion,
          this.listaEquiposClasificacion, undefined, undefined);
      } else {
        this.datosClasificacionJornada = this.calculos.ClasificacionJornada(this.juegoSeleccionado, this.listaAlumnosClasificacion,
          this.listaEquiposClasificacion, jornadaSeleccionada.ganadoresFormulaUno.nombre,
          jornadaSeleccionada.ganadoresFormulaUno.id);
      }
      // console.log(this.datosClasificaciónJornada.participante);
      // console.log(this.datosClasificaciónJornada.puntos);
      // console.log(this.datosClasificaciónJornada.posicion);
      this.ConstruirTablaClasificaciónJornada();
    }
  }

  ConstruirTablaClasificaciónJornada() {
    console.log('Aquí tendré la tabla de clasificación, los participantes ordenados son:');
    console.log(this.datosClasificacionJornada.participante);
    console.log(this.datosClasificacionJornada.puntos);
    console.log(this.datosClasificacionJornada.posicion);
    console.log('ParticipanteId:');
    console.log(this.datosClasificacionJornada.participanteId);
    this.tablaClasificacionJornadaSeleccionada = this.calculos.PrepararTablaRankingJornadaFormulaUno(this.datosClasificacionJornada);
    this.ganadoresJornadaF1 = this.tablaClasificacionJornadaSeleccionada.slice(0, this.juegoSeleccionado.puntos.length);
    console.log('los ganadores: ');
    console.log(this.ganadoresJornadaF1);
    this.imagenesDePerfil = [];
    this.ganadoresJornadaF1.forEach (participante => {
      const imagen = this.alumnosDelGrupo.filter (alumno => alumno.id === participante.id)[0].imagenPerfil;
      this.imagenesDePerfil.push (imagen);
    })
  }

  DameJornadasDelJuegoDeCompeticionF1() {
    this.peticionesAPI.DameJornadasDeCompeticionFormulaUno(this.juegoSeleccionado.id)
      .subscribe(inscripciones => {
        this.jornadas = inscripciones;
        console.log('Las jornadas son: ');
        console.log(this.jornadas);
        console.log('Vamos a por los enfrentamientos de cada jornada');
      });
  }

  // Para Competicion Liga:
  ConstruirTablaEnfrentamientos() {
    console.log ('Aquí tendré la tabla de enfrentamientos, los enfrentamientos sonc:');
    console.log(this.enfrentamientosJornadaSeleccionada);
    console.log('Distinción entre Individual y equipos');
    if (this.juegoSeleccionado.modo === 'Individual') {
      this.enfrentamientosJornadaSeleccionada = this.calculos.ConstruirTablaEnfrentamientos(this.enfrentamientosJornadaSeleccionada,
                                                                                            this.listaAlumnosClasificacion,
                                                                                            this.listaEquiposClasificacion,
                                                                                            this.juegoSeleccionado);
      
      console.log('La tabla de enfrentamientos individual queda: ');
      console.log(this.enfrentamientosJornadaSeleccionada);

    } else {
      this.enfrentamientosJornadaSeleccionada = this.calculos.ConstruirTablaEnfrentamientos(this.enfrentamientosJornadaSeleccionada,
                                                                                            this.listaAlumnosClasificacion,
                                                                                            this.listaEquiposClasificacion,
                                                                                            this.juegoSeleccionado);
      console.log('La tabla de enfrentamientos por equipos queda: ');
      console.log(this.enfrentamientosJornadaSeleccionada);

    }
  }


  JornadaFinalizada(jornadaSeleccionada: TablaJornadas) {
    const jornadaFinalizada = this.calculos.JornadaFinalizada(this.juegoSeleccionado, jornadaSeleccionada);
    if (jornadaFinalizada === true) {
      this.botonResultadosDesactivado = true;
    } else {
      this.botonResultadosDesactivado = false;
    }
    return jornadaFinalizada;
  }

  ImplicadoEnEnfrentamiento(enfrentamiento) {
    // devuelve cierto si el alumno o el equipo están implicados en el enfrentamiento
    // para que se muestre esta circunstancia al mostrar los enfrentamientos.
    if (this.juegoSeleccionado.modo === 'Individual') {
      return (enfrentamiento.JugadorUno === this.miAlumno.id || enfrentamiento.JugadorDos === this.miAlumno.id);
    } else {
      return (enfrentamiento.JugadorUno === this.miEquipo.id || enfrentamiento.JugadorDos === this.miEquipo.id);
    }
  }

  // sliderConfig = {
  //   slidesPerView: 1.6,
  //   spaceBetween: 10,
  //   centeredSlides: true
  // };

}
