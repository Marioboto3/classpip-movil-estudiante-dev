import { Injectable } from '@angular/core';
import {
  Profesor, Grupo, Juego, Equipo, Alumno, Coleccion, Cromo, Punto, Insignia, TablaAlumnoJuegoDeCompeticion,
  TablaJornadas, Jornada, TablaEquipoJuegoDeCompeticion, JuegoDeAvatar
} from '../clases';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ReplaySubject } from 'rxjs';
import { JuegoDeEvaluacion } from '../clases/JuegoDeEvaluacion';
import { JuegoDeEscapeRoom } from '../clases/JuegoDeEscapeRoom';
import { ObjetoEscape } from '../clases/objetoEscape';
import { ObjetoEnigma } from '../clases/ObjetoEnigma';
import { ObjetoGlobalEscape } from '../clases/ObjetoGlobalEscape';
import { ObjetoPista } from '../clases/ObjetoPista';
import { AlumnoJuegoDeEscapeRoom } from '../clases/AlumnoJuegoDeEscapeRoom';
import { EscenaDeJuego } from '../clases/EscenaDeJuego';
import { EscenarioEscapeRoom } from '../clases/EscenarioEscapeRoom';
import { ObjetoJuego } from '../clases/ObjetoJuego';
import { Llave } from '../clases/Llave';
import { Pista } from '../clases/Pista';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  prueba: boolean;
  objetosEnigma: ObjetoEnigma[];
  objetosEnigmaSegundoEscenario: ObjetoEnigma[];

  objetosEscape: ObjetoEscape[];
  objetosEscapeSegundoEscenario: ObjetoEscape[];

  objetosGlobalesPrimerEscenario: ObjetoGlobalEscape [];
  objetosGlobalesSegundoEscenario: ObjetoGlobalEscape [];

  llave: ObjetoGlobalEscape;
  objetosMochila: ObjetoGlobalEscape [] = [];
  alumno: Alumno;
  alumnoObservable = new ReplaySubject(1);
  profesor: Profesor;
  grupo: Grupo;
  juego: Juego;
  juegodeAvatar: JuegoDeAvatar;
  juegoDeEvaluacion: JuegoDeEvaluacion;
  equipo: Equipo;
  alumnosEquipo: Alumno[];
  alumnosGrupo: Alumno[];
  coleccion: Coleccion;
  cromos: Cromo[];
  cromo: Cromo;
  posicion: any;
  tiposPuntosDelJuego: any;
  nivelesDelJuego: any;
  alumnoSeleccionado: any;
  inscripcionAlumnoJuego: any;
  equipoSeleccionado: any;
  inscripcionEquipoJuego: any;
  objetoEnigma: ObjetoEnigma;
  objetoEnigmaSegundoEscenario: ObjetoEnigma;
  alumnoEscapeRoom: AlumnoJuegoDeEscapeRoom;

  objetosDepositadosBascula: ObjetoEscape[] = [];

  alumnosDelJuego: any;
  listaAlumnosOrdenadaPorPuntos: any;
  rankingJuegoDePuntos: any;
  equiposDelJuego: any;
  listaEquiposOrdenadaPorPuntos: any;
  rankingEquiposJuegoDePuntos: any;

  juegoEscapeRoom: JuegoDeEscapeRoom;

  estancia: string;
  pistasGuardadas: ObjetoPista [] = [];
  alumnoJuegoDeColeccion: Alumno;
  alumnosJuegoDeColeccion: Alumno[];
  inscripcionAlumno: any;
  inscripcionEquipo: any;
  listaGrupos: any;
  imagenLogoEquipo: any;

  punto: Punto;
  insignia: Insignia;
  cromosSinRepetidos: any[];
  cromosQueNoTengo: any[];

  tablaAlumnoJuegoDeCompeticion: TablaAlumnoJuegoDeCompeticion[];
  tablaEquipoJuegoDeCompeticion: TablaEquipoJuegoDeCompeticion[];
  jornadas: any;
  JornadasCompeticion: any;

  privilegiosAlumno: any;
  // listaEquiposGrupo: any;
  estado: boolean;
  elem;
  pos;
  cromosQueTengo;
  cromosQueTengoImagenDelante;
  cromosQueTengoImagenDetras;
  cromosQueNoTengoImagenDelante;
  cromosQueNoTengoImagenDetras;
  nickName;

  escenaActual: number;

  mapEscenasPorJuego: Map<number, Map<number, EscenaDeJuego>> = new Map<number, Map<number, EscenaDeJuego>>();
  mapEscenarioPorEscena: Map<number, EscenarioEscapeRoom> = new Map<number, EscenarioEscapeRoom>();
  mapObjetosPorEscena: Map<number, Map<number, ObjetoJuego>> = new Map<number, Map<number, ObjetoJuego>>();
  mapInformacionGlobalDelObjetoJuego: Map<number, ObjetoGlobalEscape> = new Map<number, ObjetoGlobalEscape>();
  mapEscenas: Map<number, EscenaDeJuego> = new Map<number, EscenaDeJuego>();
  mapObjetosJuego:  Map<number, ObjetoJuego> = new Map<number, ObjetoJuego>();
  mapObjetosEscapeFromObjetosJuego: Map<number, Map<number, ObjetoEscape>> = new Map<number, Map<number, ObjetoEscape>>(); //todos
  mapObjetosEnigmaFromObjetosJuego: Map<number, Map<number, ObjetoEnigma>> = new Map<number, Map<number, ObjetoEnigma>>(); //todos
  mapPosicionObjetosDeEscena: Map<number, any> = new Map<number, any>(); //escena actual
  mapLlavePorEscena: Map<number, Llave> = new Map<number, Llave>();
  mapPistaPorEscena: Map<number, Pista> = new Map<number, Pista>();
  mapObjetosRequeridosPorEscena: Map<number, Map<number,ObjetoEscape>> = new Map<number, Map<number,ObjetoEscape>>();
  mapPosicionObjetosDeTodasLasEscenas: Map<number, Map<number, any>> = new Map<number, Map<number, any>>(); //escena actual

  constructor() { }
  public TomaProfesor(profesor: Profesor) {
    this.profesor = profesor;
  }
  public DameProfesor(): Profesor {
    return this.profesor;
  }



  // public TomaProfesor(profesor: Profesor) {
  //   this.profesor.next(profesor);
  // }


  // public  DameProfesor(): any {
  //   return this.profesor;
  // }

  public TomaAlumnosJuegoDeColeccion(alumnos: Alumno[]) {
    this.alumnosJuegoDeColeccion = alumnos;
  }
  public DameAlumnosJuegoDeColeccion(): Alumno[] {
    return this.alumnosJuegoDeColeccion;
  }

  public TomaAlumnoJuegoDeColeccion(alumno: Alumno) {
    this.alumnoJuegoDeColeccion = alumno;
  }
  public DameAlumnoJuegoDeColeccion(): Alumno {
    return this.alumnoJuegoDeColeccion;
  }

  public TomaGrupo(grupo: Grupo) {
    this.grupo = grupo;
  }

  public TomaListaGrupos(listaGrupos: any) {
    this.listaGrupos = listaGrupos;
  }

  //ESCAPE ROOM

  public TomaAlumnoEscape(alumno: AlumnoJuegoDeEscapeRoom) {
    this.alumnoEscapeRoom = alumno;
  }
  public DameAlumnoEscape(): AlumnoJuegoDeEscapeRoom {
    return this.alumnoEscapeRoom[0];
  }
  public DameAlumnoEscapeRoom(): AlumnoJuegoDeEscapeRoom {
    return this.alumnoEscapeRoom;
  }
  public TomaMapEscenasPorJuego(map: Map<number, Map<number, EscenaDeJuego>>) {
    this.mapEscenasPorJuego = map;
  }
  public DameMapEscenasPorJuego(): any {
    return this.mapEscenasPorJuego;
  }
  public TomaMapEscenas(map: Map<number, EscenaDeJuego>) {
    this.mapEscenas = map;
  }
  public DameMapEscenas(): any {
    return this.mapEscenas;
  }
  public DameEscenaActualId(): number {
    return this.escenaActual;
  }
  public TomaEscenaActualId(escenaActualId: number){
    this.escenaActual = escenaActualId;
  }
  public TomaMapLlaveEscena(map: Map<number, Llave>) {
    this.mapLlavePorEscena = map;
  }
  public DameMapLlaveEscena(): any {
    return this.mapLlavePorEscena;
  }
  public TomaMapObjetosRequeridosPorEscena(map: Map<number, Map<number,ObjetoEscape>> ) {
    this.mapObjetosRequeridosPorEscena = map;
  }
  public DameMapObjetosRequeridosPorEscena(): any {
    return this.mapObjetosRequeridosPorEscena;
  }
  public TomaMapPistaEscena(map: Map<number, Pista>) {
    this.mapPistaPorEscena = map;
  }
  public DameMapPistaEscena(): any {
    return this.mapPistaPorEscena;
  }
  public TomaMapObjetosJuego(map: Map<number, ObjetoJuego>) {
    this.mapObjetosJuego = map;
  }
  public DameMapObjetosJuego(): any {
    return this.mapObjetosJuego;
  }
  public TomaMapObjetosEscapeFromObjetosJuego(map: Map<number, Map<number, ObjetoEscape>>) {
    this.mapObjetosEscapeFromObjetosJuego = map;
  }
  public DameMapObjetosEscapeFromObjetosJuego(): any {
    return this.mapObjetosEscapeFromObjetosJuego;
  }
  public TomaMapObjetosEnigmaFromObjetosJuego(map:  Map<number, Map<number, ObjetoEnigma>>) {
    this.mapObjetosEnigmaFromObjetosJuego = map;
  }
  public DameMapObjetosEnigmaFromObjetosJuego(): any {
    return this.mapObjetosEnigmaFromObjetosJuego;
  }
  public TomaMapEscenarioPorEscena(map: Map<number, EscenarioEscapeRoom>){
   this.mapEscenarioPorEscena = map;
  }
  public DameMapEscenarioPorEscena(): any {
    return this.mapEscenarioPorEscena;
  }
  public TomaMapObjetosPorEscena(map: Map<number, Map<number, ObjetoJuego>>) {
    this.mapObjetosPorEscena = map;
  }
  public DameMapObjetosPorEscena(): any {
    return this.mapObjetosPorEscena;
  }
  public TomaMapPosicionObjetosDeEscena(map: Map<number, any>) {
    this.mapPosicionObjetosDeEscena = map;
  }
  public DameMapPosicionObjetosDeEscena(): any {
    return this.mapPosicionObjetosDeEscena;
  }
  public TomaMapPosicionObjetosDeTodasLasEscenas(map:  Map<number, Map<number, any>>) {
    this.mapPosicionObjetosDeTodasLasEscenas = map;
  }
  public DameMapPosicionObjetosDeTodasLasEscenas(): any {
    return this.mapPosicionObjetosDeTodasLasEscenas;
  }
  public TomaMapInformacionGlobalDelObjetoJuego(map: Map<number, ObjetoGlobalEscape>) {
    this.mapInformacionGlobalDelObjetoJuego = map;
  }
  public DameMapInformacionGlobalDelObjetoJuego(): any {
    return this.mapInformacionGlobalDelObjetoJuego;
  }
  public TomaObjetosEscape(objetosEscape: ObjetoEscape[]) {
    this.objetosEscape = objetosEscape;
  } 
  public DamePistasGuardadas(): ObjetoPista[] {
    return this.pistasGuardadas;
  }
  public TomaPistasGuardadas(pistas: ObjetoPista[]) {
    this.pistasGuardadas = pistas;
  }
  public DameObjetosMochila(): ObjetoGlobalEscape[] {
    return this.objetosMochila;
  }
  public TomaObjetosMochila(objetosGlobales: ObjetoGlobalEscape[]) {
    this.objetosMochila = objetosGlobales;
  }
  public DameObjetosGlobalesPrimerEscenario(): ObjetoGlobalEscape[] {
    return this.objetosGlobalesPrimerEscenario;
  }
  public TomaObjetosGlobalesPrimerEscenario(objetosGlobales: ObjetoGlobalEscape[]) {
    this.objetosGlobalesPrimerEscenario = objetosGlobales;
  }
  public DameObjetosGlobalesSegundoEscenario(): ObjetoGlobalEscape[] {
    return this.objetosGlobalesSegundoEscenario;
  }
  public TomaObjetosGlobalesSegundoEscenario(objetosGlobales: ObjetoGlobalEscape[]) {
    this.objetosGlobalesSegundoEscenario = objetosGlobales;
  }
  public DameObjetosEscape(): ObjetoEscape[] {
    return this.objetosEscape;
  }
  public DameObjetosEscapeSegundoEscenario(): ObjetoEscape[] {
    return this.objetosEscapeSegundoEscenario;
  }
  public TomaObjetosEscapeSegundoEscenario(objetosEscape: ObjetoEscape[]) {
    this.objetosEscapeSegundoEscenario = objetosEscape;
  }
  public TomaObjetosEnigma(objetosEnigma: ObjetoEnigma[]) {
    this.objetosEnigma = objetosEnigma;
  }
  public DameObjetosEnigma(): ObjetoEnigma[] {
    return this.objetosEnigma;
  }
  public DameObjetosEnigmaSegundoEscenario(): ObjetoEnigma[] {
    return this.objetosEnigmaSegundoEscenario;
  }
  public TomaObjetosEnigmaSegundoEscenario(objetosEnigma: ObjetoEnigma[]) {
    this.objetosEnigmaSegundoEscenario = objetosEnigma;
  }
  public TomaObjetoEnigmaSegundoEscenario(objetoEnigma: ObjetoEnigma) {
    this.objetosEnigmaSegundoEscenario.push(objetoEnigma);
    this.objetoEnigmaSegundoEscenario = objetoEnigma;
  }

  public TomaObjetoEnigma(objetoEnigma: ObjetoEnigma) {
    this.objetosEnigma.push(objetoEnigma);
    this.objetoEnigma = objetoEnigma;
  }

  public DameObjetoEnigma(): ObjetoEnigma {
    return this.objetoEnigma;
  }
  public TomaLlave(llave: ObjetoGlobalEscape) {
    this.llave = llave;
  }

  public DameLlave(): ObjetoGlobalEscape {
    return this.llave;
  }

  public TomaListaObjetosDepositadosBascula(objetos: ObjetoEscape[]) {
    this.objetosDepositadosBascula = objetos;
  }

  public DameListaObjetosDepositadosBascula(): ObjetoEscape[] {
    return this.objetosDepositadosBascula;
  }

  public DameListaGrupos(): any {
    return this.listaGrupos;
  }

  public DameGrupo(): Grupo {
    return this.grupo;
  }

  // public TomaEquiposGrupo(listaEquipos: any) {
  //   this.listaEquiposGrupo = listaEquipos;
  // }

  // public DameEquiposGrupo(): any {
  //   return this.listaEquiposGrupo;
  // }

  public cambiaElEstadoDelObjeto(estado: boolean, objeto: string) {
    /*this.objetosGlobalesPrimerEscenario.forEach(element => {
      if (element.nombre == objeto) {
        element.recogido = estado;
      }
    });
    console.log("this.objetosEscape", this.objetosEscape);
  */}
  public cambiaElEstadoDelObjetoSegundoEscenario(estado: boolean, objeto: string) {
    /*console.log("Objetos escape segundo escenario: ", this.objetosEnigmaSegundoEscenario);
    this.objetosGlobalesSegundoEscenario.forEach(element => {
      console.log("elemento: ", element);
      if (element.nombre == objeto) {
        element.recogido = estado;
      }
    });
    console.log("this.objetosEscape", this.objetosEscapeSegundoEscenario);
  */}


  public TomaJuego(juego: Juego) {
    this.juego = juego;
  }
  public DameJuego(): Juego {
    return this.juego;
  }
  public DameEstanciaEscenario() {
    return this.estancia;
  }
  public TomaEstanciaEscenario(escenario: string) {
    this.estancia = escenario;
  }
  public TomaEstadoEscapeRoom(estado: boolean) {
    this.estado = estado;
  }
  public DameEstadoEscapeRoom(): boolean {
    return this.estado;
  }
  public TomaJuegoEscapeRoom(juegoDeEscapeRoom: JuegoDeEscapeRoom) {
    this.juegoEscapeRoom = juegoDeEscapeRoom;
  }
  public DameJuegoEscapeRoom(): JuegoDeEscapeRoom {
    return this.juegoEscapeRoom;
  }
  public TomaJuegoAvatar(juego: JuegoDeAvatar) {
    this.juegodeAvatar = juego;
  }
  public DameJuegoAvatar() {
    return this.juegodeAvatar;
  }
  public TomaEquipo(equipo: Equipo) {
    this.equipo = equipo;
  }
  public TomaAlumnosEquipo(alumnos: Alumno[]) {
    this.alumnosEquipo = alumnos;
  }
  public DameEquipo(): Equipo {
    return this.equipo;
  }
  public DameAlumnosEquipo(): Alumno[] {
    return this.alumnosEquipo;
  }
  public TomaAlumnosGrupo(alumnos: Alumno[]) {
    this.alumnosGrupo = alumnos;
  }
  public DameAlumnosGrupo(): Alumno[] {
    return this.alumnosGrupo;
  }
  public TomaColeccion(coleccion: Coleccion) {
    this.coleccion = coleccion;
  }
  public DameColeccion(): Coleccion {
    return this.coleccion;
  }
  public TomaCromos(cromosColeccion: Cromo[]) {
    this.cromos = cromosColeccion;
  }
  public DameCromos(): Cromo[] {
    return this.cromos;
  }
  public TomaCromosSinRepetidos(MisCromos: any[]) {
    this.cromosSinRepetidos = MisCromos;
  }
  public TomaCromosQueNoTengo(cromos: any[]) {
    this.cromosQueNoTengo = cromos;
  }
  public DameCromosQueNoTengo(): any[] {
    return this.cromosQueNoTengo;
  }
  public DameCromosSinRepetidos(): any[] {
    return this.cromosSinRepetidos;
  }
  public TomaCromo(cromo: Cromo) {
    this.cromo = cromo;
  }
  public DameCromo(): Cromo {
    return this.cromo;
  }
  public TomaDatosEvolucionAlumnoJuegoPuntos(posicion: any,
    tiposPuntosDelJuego: any,
    nivelesDelJuego: any,
    alumnoSeleccionado: any,
    inscripcionAlumnoJuego: any) {
    this.posicion = posicion;
    this.tiposPuntosDelJuego = tiposPuntosDelJuego;
    this.nivelesDelJuego = nivelesDelJuego;
    this.alumnoSeleccionado = alumnoSeleccionado;
    this.inscripcionAlumnoJuego = inscripcionAlumnoJuego;
  }
  public DameDatosEvolucionAlumnoJuegoPuntos(): any {
    const datos = {
      posicion: this.posicion,
      tiposPuntosDelJuego: this.tiposPuntosDelJuego,
      nivelesDelJuego: this.nivelesDelJuego,
      alumnoSeleccionado: this.alumnoSeleccionado,
      inscripcionAlumnoJuego: this.inscripcionAlumnoJuego
    };
    return datos;
  }
  public TomaDatosEvolucionEquipoJuegoPuntos(
    posicion: any,
    equipoSeleccionado: any,
    inscripcionEquipoJuego: any,
    nivelesDelJuego: any,
    tiposPuntosDelJuego) {
    this.posicion = posicion;
    this.equipoSeleccionado = equipoSeleccionado;
    this.inscripcionEquipoJuego = inscripcionEquipoJuego;
    this.nivelesDelJuego = nivelesDelJuego;
    this.tiposPuntosDelJuego = tiposPuntosDelJuego;
  }
  public DameDatosEvolucionEquipoJuegoPuntos(): any {
    const datos = {
      posicion: this.posicion,
      equipoSeleccionado: this.equipoSeleccionado,
      inscripcionEquipoJuego: this.inscripcionEquipoJuego,
      nivelesDelJuego: this.nivelesDelJuego,
      tiposPuntosDelJuego: this.tiposPuntosDelJuego
    };
    return datos;
  }
  public TomaInformacionJuego(nivelesDelJuego: any,
    tiposPuntosDelJuego: any) {
    this.nivelesDelJuego = nivelesDelJuego;
    this.tiposPuntosDelJuego = tiposPuntosDelJuego;
  }
  public DameInformacionJuego(): any {
    const datos = {
      nivelesDelJuego: this.nivelesDelJuego,
      tiposPuntosDelJuego: this.tiposPuntosDelJuego
    };
    return datos;
  }
  public TomaDatosParaAsignarPuntos(
    tiposPuntosDelJuego: any,
    nivelesDelJuego: any,
    alumnosDelJuego: any,
    listaAlumnosOrdenadaPorPuntos: any,
    rankingJuegoDePuntos: any,
    equiposDelJuego: any,
    listaEquiposOrdenadaPorPuntos: any,
    rankingEquiposJuegoDePuntos: any
  ) {
    this.tiposPuntosDelJuego = tiposPuntosDelJuego;
    this.nivelesDelJuego = nivelesDelJuego;
    this.alumnosDelJuego = alumnosDelJuego;
    this.listaAlumnosOrdenadaPorPuntos = listaAlumnosOrdenadaPorPuntos;
    this.rankingJuegoDePuntos = rankingJuegoDePuntos;
    this.equiposDelJuego = equiposDelJuego;
    this.listaEquiposOrdenadaPorPuntos = listaEquiposOrdenadaPorPuntos;
    this.rankingEquiposJuegoDePuntos = rankingEquiposJuegoDePuntos;
    console.log('Sesion ' + this.rankingEquiposJuegoDePuntos);
    console.log('Sesion ' + this.equiposDelJuego);
    console.log('Sesion ' + this.listaEquiposOrdenadaPorPuntos);
  }
  public DameDatosParaAsignarPuntos(): any {
    const datos = {
      tiposPuntosDelJuego: this.tiposPuntosDelJuego,
      nivelesDelJuego: this.nivelesDelJuego,
      alumnosDelJuego: this.alumnosDelJuego,
      listaAlumnosOrdenadaPorPuntos: this.listaAlumnosOrdenadaPorPuntos,
      rankingJuegoDePuntos: this.rankingJuegoDePuntos,
      equiposDelJuego: this.equiposDelJuego,
      listaEquiposOrdenadaPorPuntos: this.listaEquiposOrdenadaPorPuntos,
      rankingEquiposJuegoDePuntos: this.rankingEquiposJuegoDePuntos
    };
    console.log('Sesion regreso ' + datos.rankingEquiposJuegoDePuntos);
    return datos;
  }
  public DameRankingEquipos(): any {
    return this.rankingEquiposJuegoDePuntos;
  }
  public TomaAlumnosDelJuego(alumnos: any) {
    this.alumnosDelJuego = alumnos;
  }
  public DameAlumnosDelJuego(): any {
    return this.alumnosDelJuego;
  }
  public DameEquiposDelJuego(): any {
    return this.equiposDelJuego;
  }
  public TomaEquiposDelJuego(equipos: any) {
    this.equiposDelJuego = equipos;
  }
  // public TomaAlumno(alumno: Alumno) {
  //   this.alumno = alumno;
  // }
  public DameAlumno(): Alumno {
    return this.alumno;
  }
  public EnviameAlumno(): any {
    return this.alumnoObservable;
  }
  public TomaAlumno(alumno: Alumno) {
    this.alumno = alumno;
    this.alumnoObservable.next(alumno);
  }
  // public  DameProfesor(): any {
  //   return this.profesor;
  // }
  public TomaInscripcionAlumno(inscripcionAlumno: any) {
    this.inscripcionAlumno = inscripcionAlumno;
  }
  public DameInscripcionAlumno(): any {
    return this.inscripcionAlumno;
  }
  public TomaInscripcionEquipo(inscripcionEquipo: any) {
    this.inscripcionEquipo = inscripcionEquipo;
  }
  public DameInscripcionEquipo(): any {
    return this.inscripcionEquipo;
  }
  public TomaImagenLogoEquipo(imagenLogoEquipo: any) {
    this.imagenLogoEquipo = imagenLogoEquipo;
  }
  public DameImagenLogoEquipo(): any {
    return this.imagenLogoEquipo;
  }
  public TomaTipoPunto(punto: any) {
    this.punto = punto;
  }
  public DameTipoPunto(): any {
    return this.punto;
  }
  public TomaInsignia(insignia: any) {
    this.insignia = insignia;
  }
  public DameInsignia(): any {
    return this.insignia;
  }
  public TomaTablaAlumnoJuegoDeCompeticion(Tabla: TablaAlumnoJuegoDeCompeticion[]) {
    this.tablaAlumnoJuegoDeCompeticion = Tabla;
  }
  public DameTablaAlumnoJuegoDeCompeticion(): TablaAlumnoJuegoDeCompeticion[] {
    const Tabla = this.tablaAlumnoJuegoDeCompeticion;
    return Tabla;
  }
  public TomaDatosJornadas(
    jornadas: Jornada[],
    JornadasCompeticion: TablaJornadas[]
  ) {
    this.JornadasCompeticion = JornadasCompeticion;
    this.jornadas = jornadas;
    console.log('jornadas:');
    console.log(this.JornadasCompeticion);
    console.log('TablaJornadas:');
    console.log(this.jornadas);
  }
  public DameDatosJornadas(): any {
    const datos = {
      jornadas: this.jornadas,
      JornadasCompeticion: this.JornadasCompeticion
    };
    console.log('Aqui estan las jornadas guardadas y la tabla de jornadas: ');
    console.log(this.jornadas);
    console.log(this.JornadasCompeticion);

    return datos;
  }
  public TomaTablaEquipoJuegoDeCompeticion(Tabla: TablaEquipoJuegoDeCompeticion[]) {
    this.tablaEquipoJuegoDeCompeticion = Tabla;
  }
  public DameTablaEquipoJuegoDeCompeticion(): TablaEquipoJuegoDeCompeticion[] {
    const Tabla = this.tablaEquipoJuegoDeCompeticion;
    return Tabla;
  }
  public TomaInfoParaRegaloCromo(
    elem,
    pos,
    cromosSinRepetidos,
    cromosQueTengo,
    cromosQueTengoImagenDelante,
    cromosQueTengoImagenDetras,
    cromosQueNoTengo,
    cromosQueNoTengoImagenDelante,
    cromosQueNoTengoImagenDetras,
    coleccion) {
    this.elem = elem;
    this.pos = pos;
    this.cromosSinRepetidos = cromosSinRepetidos;
    this.cromosQueTengo = cromosQueTengo;
    this.cromosQueTengoImagenDelante = cromosQueTengoImagenDelante;
    this.cromosQueTengoImagenDetras = cromosQueTengoImagenDetras;
    this.cromosQueNoTengo = cromosQueNoTengo;
    this.cromosQueNoTengoImagenDelante = cromosQueNoTengoImagenDelante;
    this.cromosQueNoTengoImagenDetras = cromosQueNoTengoImagenDetras;
    this.coleccion = coleccion;
  }
  public DameInfoParaRegaloCromo(): any {
    const datos = {
      elem: this.elem,
      pos: this.pos,
      cromosSinRepetidos: this.cromosSinRepetidos,
      cromosQueTengo: this.cromosQueTengo,
      cromosQueTengoImagenDelante: this.cromosQueTengoImagenDelante,
      cromosQueTengoImagenDetras: this.cromosQueTengoImagenDetras,
      cromosQueNoTengo: this.cromosQueNoTengo,
      cromosQueNoTengoImagenDelante: this.cromosQueNoTengoImagenDelante,
      cromosQueNoTengoImagenDetras: this.cromosQueNoTengoImagenDetras,
      coleccion: this.coleccion
    };
    return datos;
  }
  public TomaPrivilegiosAlumno(Priv: any) {
    this.privilegiosAlumno = Priv;
  }
  public DamePrivilegiosAlumno() {
    return this.privilegiosAlumno;
  }
  public TomaNickName(nick: string) {
    this.nickName = nick;
  }
  public DameNickName(): string {
    return this.nickName;
  }
  public TomaJuegoEvaluacion(juegoDeEvaluacion: JuegoDeEvaluacion) {
    this.juegoDeEvaluacion = juegoDeEvaluacion;
  }
  public DameJuegoEvaluacion(): JuegoDeEvaluacion {
    return this.juegoDeEvaluacion;
  }
}


