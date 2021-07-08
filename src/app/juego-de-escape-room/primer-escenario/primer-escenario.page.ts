import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { Howl } from 'howler';
import { Juego, Profesor } from 'src/app/clases';
import { Audio } from 'src/app/clases/Audio';
import { JuegoDeEscapeRoom } from 'src/app/clases/JuegoDeEscapeRoom';
import { ObjetoEnigma } from 'src/app/clases/ObjetoEnigma';
import { ObjetoEscape } from 'src/app/clases/ObjetoEscape';
import { CalculosService, SesionService } from 'src/app/servicios';
import Swal from 'sweetalert2';
import { ObjetoGlobalEscape } from 'src/app/clases/ObjetoGlobalEscape';
import { EscenaDeJuego } from 'src/app/clases/EscenaDeJuego';
import { ObjetoJuego } from 'src/app/clases/ObjetoJuego';
import { AlumnoJuegoDeEscapeRoom } from 'src/app/clases/AlumnoJuegoDeEscapeRoom';
import { EscenarioEscapeRoom } from 'src/app/clases/EscenarioEscapeRoom';
import { Llave } from 'src/app/clases/Llave';
import { Pista } from 'src/app/clases/Pista';


@Component({
  selector: 'app-primer-escenario',
  templateUrl: './primer-escenario.page.html',
  styleUrls: ['./primer-escenario.page.scss'],
})
export class PrimerEscenarioPage implements OnInit {

  //@ViewChild('dropzoneA') dropA: ElementRef;
  //@ViewChild('dropzoneB') dropB: ElementRef;

  myTracks: any[];
  allTracks: any[];

  showImage: boolean = false;
  varEscenario: string = "containerHabitacion";

  profesor: Profesor;

  sliderOpts = {
    zoom: {
      maxRatio: 2
    }
  }

  audioInicial: Audio = new Audio("audio-inicial", "../../../assets/escape-room/audio-inicial.m4a");
  id: number;

  juegoEscape: JuegoDeEscapeRoom;
  alumnoJuegoEscapeRoom: AlumnoJuegoDeEscapeRoom;

  escenaActual: EscenaDeJuego;
  escenarioActual: EscenarioEscapeRoom;

  primerEscenario: number = 1;

  notFirst: boolean = false;

  estado: boolean;

  recogido: boolean;
  recogido2: boolean;
  recogido3: boolean;
  recogido4: boolean;
  recogido5: boolean;
  resuelto: boolean;
  resuelto2: boolean;
  resuelto3: boolean;
  resuelto4: boolean;
  resuelto5: boolean;

  recogidaPista: boolean;

  estancia: string;
  escenaAnterior: number = 1;

  objeto1escape: ObjetoEscape;
  objeto2escape: ObjetoEscape;
  objeto3escape: ObjetoEscape;
  objeto4escape: ObjetoEscape;
  objeto5escape: ObjetoEscape;

  objeto1enigma: ObjetoEnigma;
  objeto2enigma: ObjetoEnigma;
  objeto3enigma: ObjetoEnigma;
  objeto4enigma: ObjetoEnigma;
  objeto5enigma: ObjetoEnigma;

  final: boolean = false;

  llaveActual: Llave;
  pistaActual: Pista;

  objetosEnigma: ObjetoEnigma[];
  objetosEscape: ObjetoEscape[];
  objetosGlobales: ObjetoGlobalEscape[] = [];

  mapEscenasPorJuego: Map<number, Map<number, EscenaDeJuego>> = new Map<number, Map<number, EscenaDeJuego>>();
  mapEscenarioPorEscena: Map<number, EscenarioEscapeRoom> = new Map<number, EscenarioEscapeRoom>();
  mapObjetosPorEscena: Map<number, Map<number, ObjetoJuego>> = new Map<number, Map<number, ObjetoJuego>>();
  mapInformacionGlobalDelObjetoJuego: Map<number, ObjetoGlobalEscape> = new Map<number, ObjetoGlobalEscape>();
  mapEscenas: Map<number, EscenaDeJuego> = new Map<number, EscenaDeJuego>();
  mapObjetosJuego: Map<number, ObjetoJuego> = new Map<number, ObjetoJuego>();
  mapObjetosJuegoAuxiliar: Map<number, ObjetoJuego> = new Map<number, ObjetoJuego>();
  mapObjetosEscapeFromObjetosJuego: Map<number, Map<number, ObjetoEscape>> = new Map<number, Map<number, ObjetoEscape>>(); //todos
  mapObjetosEnigmaFromObjetosJuego: Map<number, Map<number, ObjetoEnigma>> = new Map<number, Map<number, ObjetoEnigma>>(); //todos
  mapObjetosEscapeAuxiliar: Map<number, ObjetoEscape> = new Map<number, ObjetoEscape>();
  mapObjetosEnigmaAuxiliar: Map<number, ObjetoEnigma> = new Map<number, ObjetoEnigma>();
  mapPosicionObjetosDeEscena: Map<number, any> = new Map<number, any>(); //escena actual
  mapLlavePorEscena: Map<number, Llave> = new Map<number, Llave>();
  mapPistaPorEscena: Map<number, Pista> = new Map<number, Pista>();
  mapObjetosRequeridosPorEscena: Map<number, Map<number, ObjetoEscape>> = new Map<number, Map<number, ObjetoEscape>>();
  mapPosicionObjetosDeTodasLasEscenas: Map<number, Map<number, any>> = new Map<number, Map<number, any>>(); //escena actual


  constructor(private router: Router,
    private modalController: ModalController,
    private sesion: SesionService,
    private calculos: CalculosService,
    private alertController: AlertController,
    public navCtrl: NavController) { }

  playlist: Audio[] = [
    {
      name: 'Audio',
      path: '../../../assets/escape-room/audio-inicial.m4a'
    },
    {
      name: 'Audio2',
      path: '../../../assets/escape-room/audio-inicial.m4a'
    }];

  reload() {
    this.ngOnInit();
  }
  ionViewWillEnter() {
    //   this.reload();
  }
  ngOnInit() {

    console.clear();
    if (this.final != true) {
      //Recoger toda la info que nos ha quedado de la pantalla anterior y mostrarla

      this.juegoEscape = this.sesion.DameJuegoEscapeRoom();
       console.log("Juego: ", this.juegoEscape);

      if (this.primerEscenario == 1) {
        this.alumnoJuegoEscapeRoom = this.sesion.DameAlumnoEscapeRoom();
           console.log("Alumno si es primer escenario: ", this.alumnoJuegoEscapeRoom);

      } else {
        this.alumnoJuegoEscapeRoom = this.sesion.DameAlumnoEscapeRoom();
          console.log("Alumno si NO es primer escenario: ", this.alumnoJuegoEscapeRoom);

      }
        console.log("Alumno Escape: ", this.alumnoJuegoEscapeRoom);
      this.mapEscenas = this.sesion.DameMapEscenas();
         console.log("Map escenas:", this.mapEscenas.size);

      this.mapEscenasPorJuego = this.sesion.DameMapEscenasPorJuego();
      if (this.mapEscenasPorJuego.size == 0) {
        if (this.mapEscenas.size != 0) {
          this.mapEscenasPorJuego.set(this.juegoEscape.id, this.mapEscenas);
          this.sesion.TomaMapEscenasPorJuego(this.mapEscenasPorJuego);
        }
      }
      console.log("Map escenas:", this.mapEscenas);

      this.mapObjetosJuego = this.sesion.DameMapObjetosJuego();
        console.log("Map objetos juego inicial: ", this.mapObjetosJuego);
      this.mapObjetosPorEscena = this.sesion.DameMapObjetosPorEscena();
         console.log("Map objetos por escena del dame sesion: ", this.mapObjetosPorEscena);

      if (this.mapObjetosPorEscena.size == 0) {
        // this.mapObjetosPorEscena = new Map<number, Map<number, ObjetoJuego>>();
        this.mapEscenas.forEach(escena => {
          let mapObjetosJuegoAuxiliar: Map<number, ObjetoJuego> = new Map<number, ObjetoJuego>();
          this.mapObjetosJuego.forEach(objeto => {
            if (objeto.escenaId == escena.id) {
              mapObjetosJuegoAuxiliar.set(objeto.id, objeto);
            }
          });
          this.mapObjetosPorEscena.set(escena.id, mapObjetosJuegoAuxiliar);
        });
        this.sesion.TomaMapObjetosPorEscena(this.mapObjetosPorEscena);
      }

      //      console.log("Map objetos por escena inicial: ", this.mapObjetosPorEscena);

      this.mapEscenarioPorEscena = this.sesion.DameMapEscenarioPorEscena();
      //   this.mapObjetosPorEscena = this.sesion.DameMapObjetosPorEscena();
      this.mapInformacionGlobalDelObjetoJuego = this.sesion.DameMapInformacionGlobalDelObjetoJuego();

      // console.log("Map escenas por juego:", this.mapEscenasPorJuego);
      // console.log("Map escenarios por escena:", this.mapEscenarioPorEscena);
      // console.log("Map objetos por escena:", this.mapObjetosPorEscena);
      console.log("Map info por objeto:", this.mapInformacionGlobalDelObjetoJuego);


      //Conseguir escena actual para cargar el escenario

      this.escenaActual = this.mapEscenasPorJuego.get(this.juegoEscape.id).get(this.alumnoJuegoEscapeRoom.escenaActualId);
      if (this.escenaActual.id != 1) {
        this.notFirst = true;
      }
      this.sesion.TomaEscenaActualId(this.escenaActual.id);
      //  console.log("Primero partida: ", this.mapEscenasPorJuego.get(this.juegoEscape.id));
      // console.log("Escena actual: ", this.escenaActual);
      this.escenarioActual = this.mapEscenarioPorEscena.get(this.escenaActual.id);

      if (this.escenarioActual.imagenId == 3) {
        this.varEscenario = "containerBaño";
      }
      else {
        if (this.escenarioActual.imagenId == 2) {
          this.varEscenario = "containerCocina";
        }
        else {
          this.varEscenario = "containerHabitacion";
        }
      }

      //Pasar los objetosJuego a Objetos escape y Objetos Enigma 
      let objetoGlobal: ObjetoGlobalEscape;
      let objetoEscape: ObjetoEscape;
      let objetoEnigma: ObjetoEnigma;
      let llave: Llave;
      let pista: Pista;

      this.mapObjetosEnigmaFromObjetosJuego = this.sesion.DameMapObjetosEnigmaFromObjetosJuego();
      this.mapObjetosEscapeFromObjetosJuego = this.sesion.DameMapObjetosEscapeFromObjetosJuego();
      this.mapLlavePorEscena = this.sesion.DameMapLlaveEscena();
      this.mapPistaPorEscena = this.sesion.DameMapPistaEscena();

      if (this.mapObjetosEnigmaFromObjetosJuego.size == 0 && this.mapObjetosEscapeFromObjetosJuego.size == 0 && this.mapLlavePorEscena.size == 0 && this.mapPistaPorEscena.size == 0) {
        this.mapEscenas.forEach(escena => {

          this.mapObjetosEscapeAuxiliar = new Map<number, ObjetoEscape>();
          this.mapObjetosEnigmaAuxiliar = new Map<number, ObjetoEnigma>();

          this.mapObjetosPorEscena.get(escena.id).forEach(objetoJuego => {
            objetoGlobal = this.mapInformacionGlobalDelObjetoJuego.get(objetoJuego.id);
            if (objetoGlobal.tipo == "objetoEscape") {
              objetoEscape = this.convertirObjetoJuegoEnObjetoEscape(objetoJuego, objetoGlobal);
              this.mapObjetosEscapeAuxiliar.set(objetoJuego.id, objetoEscape);
            } if (objetoGlobal.tipo == "objetoEnigma") {
              objetoEnigma = this.convertirObjetoJuegoEnObjetoEnigma(objetoJuego, objetoGlobal);
              this.mapObjetosEnigmaAuxiliar.set(objetoJuego.id, objetoEnigma);
            } if (objetoGlobal.tipo == "llave") {
              llave = this.convertirObjetoJuegoEnLlave(objetoJuego, objetoGlobal);
              this.mapLlavePorEscena.set(escena.id, llave);
            } if (objetoGlobal.tipo == "pista") {
              pista = this.convertirObjetoJuegoEnPista(objetoJuego, objetoGlobal);
              this.mapPistaPorEscena.set(escena.id, pista);
            }
          });
          this.mapObjetosEscapeFromObjetosJuego.set(escena.id, this.mapObjetosEscapeAuxiliar);
          this.mapObjetosEnigmaFromObjetosJuego.set(escena.id, this.mapObjetosEnigmaAuxiliar);
        });

        this.sesion.TomaMapObjetosEnigmaFromObjetosJuego(this.mapObjetosEnigmaFromObjetosJuego);
        this.sesion.TomaMapObjetosEscapeFromObjetosJuego(this.mapObjetosEscapeFromObjetosJuego);
        this.sesion.TomaMapLlaveEscena(this.mapLlavePorEscena);
        this.sesion.TomaMapPistaEscena(this.mapPistaPorEscena);


        // console.log("Map de llaves por escenas: ", this.mapLlavePorEscena);
        // console.log("Map de pistas por escenas: ", this.mapPistaPorEscena);
        console.log("---------------");
        console.log("Map de objetos escape: ", this.mapObjetosEscapeFromObjetosJuego);
       console.log("Map de objetos enigma: ", this.mapObjetosEnigmaFromObjetosJuego);


      }

      this.llaveActual = this.mapLlavePorEscena.get(this.escenaActual.id);
      this.pistaActual = this.mapPistaPorEscena.get(this.escenaActual.id);

      //  console.log("Map de llaves por escenas: ", this.mapLlavePorEscena);
      //  console.log("Map de pistas por escenas: ", this.mapPistaPorEscena);

      // console.log("ObjetosEscape antes del for: ", this.mapObjetosEscapeFromObjetosJuego);

      this.mapPosicionObjetosDeEscena = this.sesion.DameMapPosicionObjetosDeEscena();

      if (this.mapPosicionObjetosDeEscena.size == 0 || this.escenaAnterior != this.escenaActual.id) {
        let mapEnigma: Map<number, ObjetoEnigma> = new Map<number, ObjetoEnigma>();
        let mapEscape: Map<number, ObjetoEscape> = new Map<number, ObjetoEscape>();
        this.mapPosicionObjetosDeEscena = new Map<number, any>();

        this.mapEscenas.forEach(escena => {
          this.mapPosicionObjetosDeEscena = new Map<number, Map<number, ObjetoJuego>>();
          if (this.mapPosicionObjetosDeTodasLasEscenas.get(escena.id) == undefined) {

            mapEnigma = this.mapObjetosEnigmaFromObjetosJuego.get(escena.id);
            Array.from(mapEnigma.values()).forEach(objetoEnigma => {
              if (objetoEnigma.escenaId == escena.id) {
                this.mapPosicionObjetosDeEscena.set(objetoEnigma.posicion, objetoEnigma);
              }
            });
            mapEscape = this.mapObjetosEscapeFromObjetosJuego.get(escena.id);
            Array.from(mapEscape.values()).forEach(objetoEscape => {
              if (objetoEscape.escenaId == escena.id) {
                this.mapPosicionObjetosDeEscena.set(objetoEscape.posicion, objetoEscape);
              }
            });
            if (escena.id == this.escenaActual.id) {
              this.sesion.TomaMapPosicionObjetosDeEscena(this.mapPosicionObjetosDeEscena);

            }
            this.mapPosicionObjetosDeTodasLasEscenas.set(escena.id, this.mapPosicionObjetosDeEscena);
            this.sesion.TomaMapPosicionObjetosDeTodasLasEscenas(this.mapPosicionObjetosDeTodasLasEscenas);
          }
        });
        // console.log("-- Map con todas las posiciones: ", this.mapPosicionObjetosDeTodasLasEscenas);

      }

      this.mapObjetosRequeridosPorEscena = this.sesion.DameMapObjetosRequeridosPorEscena();

      if (this.mapObjetosRequeridosPorEscena.size == 0) {

        this.mapEscenas.forEach(escena => {

          let mapObjetosAuxiliar: Map<number, ObjetoEscape> = new Map<number, ObjetoEscape>();

          this.mapEscenas.forEach(escenaIn => {

            // console.log("Escena in: ", escenaIn.id);


            this.mapObjetosEscapeFromObjetosJuego.get(escenaIn.id).forEach(objetoEscape => {

              // console.log("Objeto escape: ", objetoEscape);
              if (escena.id == objetoEscape.requeridoEscenaId && objetoEscape.requerido == true) {
                // console.log("Entra");
                mapObjetosAuxiliar.set(objetoEscape.objetoJuegoId, objetoEscape);
              }

            });

          });
          this.mapObjetosRequeridosPorEscena.set(escena.id, mapObjetosAuxiliar);

        });

       console.log("MAP OPBJETOS REQUERIDOS: ", this.mapObjetosRequeridosPorEscena);
        this.sesion.TomaMapObjetosRequeridosPorEscena(this.mapObjetosRequeridosPorEscena);
      }
      //    console.log("Map de objetos escape: ", this.mapObjetosEscapeFromObjetosJuego);
      //    console.log("Map de objetos enigma: ", this.mapObjetosEnigmaFromObjetosJuego);




      console.log("Map de posiciones con objetos escape y enigma: ", this.mapPosicionObjetosDeEscena);
      console.log("ObjetoEnigma: 1, ", this.objeto4enigma);
      console.log("ObjetoEnigma: 2, ", this.objeto5enigma);
       console.log("ObjetoEnigma: 1, ", this.objeto1escape);
     console.log("ObjetoEnigma: 2, ", this.objeto2escape);
     console.log("ObjetoEnigma: 3, ", this.objeto3escape);
      console.log("ObjetoEnigma: 4, ", this.objeto4escape);
      console.log("ObjetoEnigma: 5, ", this.objeto5escape);


      if (this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(1) != undefined) {
        if (this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(1).tipo == "objetoEscape") {
          objetoEscape = this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(1);
          this.objeto1escape = new ObjetoEscape(objetoEscape.nombre, objetoEscape.imagen, objetoEscape.usado, objetoEscape.recogido, objetoEscape.posicion, objetoEscape.escenaId, objetoEscape.juegoDeEscapeRoomId, objetoEscape.objetoGlobalId, objetoEscape.objetoJuegoId, objetoEscape.tipo, objetoEscape.requerido, objetoEscape.requeridoEscenaId);
          this.recogido = this.objeto1escape.recogido;
          // console.log("Objeto1: ", this.objeto1escape);

        } else {
          objetoEnigma = this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(1);
          this.objeto1enigma = new ObjetoEnigma(objetoEnigma.nombre, objetoEnigma.imagen, objetoEnigma.pregunta, objetoEnigma.respuesta, objetoEnigma.resuelto, objetoEnigma.posicion, objetoEnigma.escenaId, objetoEnigma.juegoDeEscapeRoomId, objetoEnigma.objetoGlobalId, objetoEnigma.objetoJuegoId, objetoEnigma.tipo, objetoEnigma.principal);
          this.resuelto = this.objeto1enigma.resuelto;
          // console.log("Objeto1: ", this.objeto1enigma);

        }
      }
      if (this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(2) != undefined) {

        if (this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(2).tipo == "objetoEscape") {
          objetoEscape = this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(2);
          this.objeto2escape = new ObjetoEscape(objetoEscape.nombre, objetoEscape.imagen, objetoEscape.usado, objetoEscape.recogido, objetoEscape.posicion, objetoEscape.escenaId, objetoEscape.juegoDeEscapeRoomId, objetoEscape.objetoGlobalId, objetoEscape.objetoJuegoId, objetoEscape.tipo, objetoEscape.requerido, objetoEscape.requeridoEscenaId);
          this.recogido2 = this.objeto2escape.recogido;
          // console.log("Objeto2: ", this.objeto2escape);

        } else {
          objetoEnigma = this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(2);
          this.objeto2enigma = new ObjetoEnigma(objetoEnigma.nombre, objetoEnigma.imagen, objetoEnigma.pregunta, objetoEnigma.respuesta, objetoEnigma.resuelto, objetoEnigma.posicion, objetoEnigma.escenaId, objetoEnigma.juegoDeEscapeRoomId, objetoEnigma.objetoGlobalId, objetoEnigma.objetoJuegoId, objetoEnigma.tipo, objetoEnigma.principal);
          this.resuelto2 = this.objeto2enigma.resuelto;
          // console.log("Objeto2: ", this.objeto2enigma);

        }
      }
      if (this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(3) != undefined) {

        if (this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(3).tipo == "objetoEscape") {
          objetoEscape = this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(3);
          this.objeto3escape = new ObjetoEscape(objetoEscape.nombre, objetoEscape.imagen, objetoEscape.usado, objetoEscape.recogido, objetoEscape.posicion, objetoEscape.escenaId, objetoEscape.juegoDeEscapeRoomId, objetoEscape.objetoGlobalId, objetoEscape.objetoJuegoId, objetoEscape.tipo, objetoEscape.requerido, objetoEscape.requeridoEscenaId);
          this.recogido3 = this.objeto3escape.recogido;
          // console.log("Objeto3: ", this.objeto3escape);

        } else {
          objetoEnigma = this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(3);
          this.objeto3enigma = new ObjetoEnigma(objetoEnigma.nombre, objetoEnigma.imagen, objetoEnigma.pregunta, objetoEnigma.respuesta, objetoEnigma.resuelto, objetoEnigma.posicion, objetoEnigma.escenaId, objetoEnigma.juegoDeEscapeRoomId, objetoEnigma.objetoGlobalId, objetoEnigma.objetoJuegoId, objetoEnigma.tipo, objetoEnigma.principal);
          this.resuelto3 = this.objeto3enigma.resuelto;
          // console.log("Objeto3: ", this.objeto3enigma);

        }
      }
      if (this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(4) != undefined) {

        console.log("objetooooo 4: ", this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(4));
        if (this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(4).tipo == "objetoEscape") {
          objetoEscape = this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(4);
          this.objeto4escape = new ObjetoEscape(objetoEscape.nombre, objetoEscape.imagen, objetoEscape.usado, objetoEscape.recogido, objetoEscape.posicion, objetoEscape.escenaId, objetoEscape.juegoDeEscapeRoomId, objetoEscape.objetoGlobalId, objetoEscape.objetoJuegoId, objetoEscape.tipo, objetoEscape.requerido, objetoEscape.requeridoEscenaId);;
          this.recogido4 = this.objeto4escape.recogido;
          // console.log("Objeto4: ", this.objeto4escape);

        } else {
          objetoEnigma = this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(4);
          this.objeto4enigma = new ObjetoEnigma(objetoEnigma.nombre, objetoEnigma.imagen, objetoEnigma.pregunta, objetoEnigma.respuesta, objetoEnigma.resuelto, objetoEnigma.posicion, objetoEnigma.escenaId, objetoEnigma.juegoDeEscapeRoomId, objetoEnigma.objetoGlobalId, objetoEnigma.objetoJuegoId, objetoEnigma.tipo, objetoEnigma.principal);
          this.resuelto4 = this.objeto4enigma.resuelto;
           console.log("Objeto4: ", this.objeto4enigma);

        }
      }
      if (this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(5) != undefined) {

        if (this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(5).tipo == "objetoEscape") {
          objetoEscape = this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(5);
          this.objeto5escape = new ObjetoEscape(objetoEscape.nombre, objetoEscape.imagen, objetoEscape.usado, objetoEscape.recogido, objetoEscape.posicion, objetoEscape.escenaId, objetoEscape.juegoDeEscapeRoomId, objetoEscape.objetoGlobalId, objetoEscape.objetoJuegoId, objetoEscape.tipo, objetoEscape.requerido, objetoEscape.requeridoEscenaId);
          this.recogido5 = this.objeto5escape.recogido;
          // console.log("Objeto5: ", this.objeto5escape);

        } else {
          objetoEnigma = this.mapPosicionObjetosDeTodasLasEscenas.get(this.escenaActual.id).get(5);
          this.objeto5enigma = new ObjetoEnigma(objetoEnigma.nombre, objetoEnigma.imagen, objetoEnigma.pregunta, objetoEnigma.respuesta, objetoEnigma.resuelto, objetoEnigma.posicion, objetoEnigma.escenaId, objetoEnigma.juegoDeEscapeRoomId, objetoEnigma.objetoGlobalId, objetoEnigma.objetoJuegoId, objetoEnigma.tipo, objetoEnigma.principal);
          this.resuelto5 = this.objeto5enigma.resuelto;
          // console.log("Objeto5: ", this.objeto5enigma);

        }
      }
      this.id = this.sesion.DameAlumno().id;
      this.estado = this.sesion.DameEstadoEscapeRoom();

      //Para mostrar el profesor o no

      this.showImage = true;

      if (this.estado === true) {
        this.showImage = true;
      }
    }
  }
  activeTrack: Audio = null;
  player: Howl = null;
  isPlaying = false;

  start() {

    if (this.player) {
      this.player.stop();
    }
    else {
      this.player = new Howl({
        src: [this.audioInicial.path],
        onplay: () => {
          console.log('onplay');
          this.isPlaying = true;
          this.activeTrack = this.audioInicial;
        },
        onend: () => {
          console.log('onend');
          this.showImage = true;
        }
      })
      this.player.play();
    }
  }

  togglePlayer(pause) {
    this.isPlaying = !pause;
    if (pause) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }
  zoom(zoomIn: boolean) {
  }
  abrirMochila() {
    this.router.navigateByUrl('mochila');
  }
  abrirObjeto(objeto: ObjetoEnigma) {

    let objetoE: ObjetoEnigma;

    this.alertController.create({
      header: 'Enigma de' + objeto.nombre,
      subHeader: 'Responde con el código correcto.',
      message: objeto.pregunta,
      inputs: [
        {
          name: 'Respuesta',
          placeholder: 'Código...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Done!',
          handler: (data: any) => {

            if (data.Respuesta == objeto.respuesta && objeto.resuelto == false) {
              this.mapObjetosEnigmaAuxiliar = new Map<number, ObjetoEnigma>();
              this.mapObjetosEnigmaAuxiliar = this.mapObjetosEnigmaFromObjetosJuego.get(this.escenaActual.id);
              objetoE = this.mapObjetosEnigmaAuxiliar.get(objeto.objetoJuegoId);
              // console.log("Objeto E: ", objetoE);
              if (objetoE != undefined) {
                objetoE.resuelto = true;
                this.mapObjetosEnigmaAuxiliar.set(objetoE.objetoJuegoId, objetoE);
                this.mapObjetosEnigmaFromObjetosJuego.set(objetoE.id, this.mapObjetosEnigmaAuxiliar);
                this.sesion.TomaMapObjetosEnigmaFromObjetosJuego(this.mapObjetosEnigmaFromObjetosJuego);
                if (objetoE.principal == true) {
                  this.conseguirLlave();
                } else {
                  this.conseguirPista();
                }
              }
              this.alertController.create({ message: "¡Perfecto!" }).then(res => {
                res.present();
                this.reload();
              });
            } else {
              if (objeto.resuelto == true) {
                this.alertController.create({ message: "¡Ya has resuelto este enigma!" }).then(res => {
                  res.present();
                });
              } else {
                this.alertController.create({ message: "¡Error!" }).then(res => {
                  res.present();
                });
              }
            }
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  conseguirPista() {
    Swal.fire({
      title: 'Felicidades! Has conseguido una pista',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Recoger'
    }).then((result) => {
      if (result.value) {
        this.pistaActual.recogido = true;
        this.mapPistaPorEscena.set(this.escenaActual.id, this.pistaActual);
        this.sesion.TomaMapPistaEscena(this.mapPistaPorEscena);
        this.reload();
      }
    });
  }
  conseguirLlave() {

    Swal.fire({
      title: 'Felicidades! Has conseguido la llave',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Recoger'
    }).then((result) => {
      if (result.value) {
        this.llaveActual.recogido = true;
        this.mapLlavePorEscena.set(this.escenaActual.id, this.llaveActual);
        this.sesion.TomaMapLlaveEscena(this.mapLlavePorEscena);
        this.reload();
      }
    });
  }
  cogerObjeto(objetoEscape: ObjetoEscape) {
    let objeto: ObjetoEscape;
    let mapObjetosRequeridos: Map<number, ObjetoEscape> = new Map<number, ObjetoEscape>();

    Swal.fire({
      title: '¿Seguro que quieres este objeto?   ' + objetoEscape.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {
        //coger el objeto del mapa y cambiarle el estado
        this.mapObjetosEscapeAuxiliar = new Map<number, ObjetoEscape>();
        this.mapObjetosEscapeAuxiliar = this.mapObjetosEscapeFromObjetosJuego.get(this.escenaActual.id);
        console.log("Escena actual id: ", this.escenaActual.id);
        console.log("Objeto escape: ", objetoEscape);

        console.log("Objeto: ", this.mapObjetosEscapeAuxiliar.get(objetoEscape.objetoJuegoId));
        objeto = this.mapObjetosEscapeAuxiliar.get(objetoEscape.objetoJuegoId);
        objeto.recogido = true;
        this.mapObjetosEscapeAuxiliar.set(objetoEscape.objetoJuegoId, objeto);
        this.mapObjetosEscapeFromObjetosJuego.set(this.escenaActual.id, this.mapObjetosEscapeAuxiliar);
        console.log("Map objetos escape cuando cojo objeto: ", this.mapObjetosEscapeFromObjetosJuego);
        console.log("-----------------------");
        //ver si el objeto es requerido o no.
        if (objeto.requerido == true) {
          mapObjetosRequeridos = this.mapObjetosRequeridosPorEscena.get(objeto.requeridoEscenaId);
          mapObjetosRequeridos.set(objeto.objetoJuegoId, objeto);
          this.mapObjetosRequeridosPorEscena.set(objeto.requeridoEscenaId, mapObjetosRequeridos);
          this.sesion.TomaMapObjetosRequeridosPorEscena(this.mapObjetosRequeridosPorEscena);
        }
        this.sesion.TomaMapObjetosEscapeFromObjetosJuego(this.mapObjetosEscapeFromObjetosJuego);
        this.reload();
      }
    });
  }
  guardarEscape() {
    Swal.fire({
      title: '¿Quieres guardar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.value) {
        this.calculos.GuardarEscapeRoom();
        Swal.fire({
          title: '¿Quieres continuar o salir del juego?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Salir',
          confirmButtonText: 'Continuar'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('¡Continua disfrutando del juego!');
          } else {
            Swal.fire("Vuelve pronto, te estaremos esperando.");
            this.navCtrl.navigateForward('/inici');
          }
        });
      }
    });
  }
  close() {
    this.modalController.dismiss();
  }
  pasarAlSiguienteEscenario() {

    let cont: number = 0;
    let mapObjetosRequeridos: Map<number, ObjetoEscape> = new Map<number, ObjetoEscape>();

    Swal.fire({
      title: '¿Tienes todo lo necesario para pasar al siguiente escenario?',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        // console.log("Escena actual id: ", this.escenaActual.id);
        // console.log("Llave: ", this.llaveActual);
        // console.log("Map objetos requeridos de todas las escenas: ", this.mapObjetosRequeridosPorEscena);
        mapObjetosRequeridos = this.sesion.DameMapObjetosRequeridosPorEscena().get(this.escenaActual.id);
        console.log(mapObjetosRequeridos.size);
        mapObjetosRequeridos.forEach(objeto => {
          if (objeto.recogido == true) {
            cont = cont + 1;
            objeto.usado = true;
          }
        });
        if (cont == mapObjetosRequeridos.size) {
          if (this.llaveActual.recogido == true) {
            Swal.fire('¡Listo!', '', 'info');

            this.mapObjetosRequeridosPorEscena.set(this.escenaActual.id, mapObjetosRequeridos);
            this.sesion.TomaMapObjetosRequeridosPorEscena(this.mapObjetosRequeridosPorEscena);
            // this.mapObjetosEscapeFromObjetosJuego.set(this.escenaActual.id, mapObjetosRequeridos);
            // this.sesion.TomaMapObjetosEscapeFromObjetosJuego(this.mapObjetosEscapeFromObjetosJuego);
            if (this.escenaActual.id != 1) {
              this.escenaAnterior = this.escenaAnterior + 1;
            }
           

              if (this.alumnoJuegoEscapeRoom.escenaActualId >= (this.mapEscenas.size)) {
                this.final = true;
                let mapEscape: Map<number, ObjetoEscape> = new Map<number, ObjetoEscape>();
                this.mapPosicionObjetosDeEscena = new Map<number, any>();

                //  console.log("Map objetos juego: ", this.mapObjetosJuego);
                //  console.log("Map objetos escape: ", this.mapObjetosEscapeFromObjetosJuego);
                //  console.log("Map objetos enigmaº: ", this.mapObjetosJuego);

                mapEscape = this.mapObjetosEscapeFromObjetosJuego.get(this.escenaActual.id);
                Array.from(mapEscape.values()).forEach(objetoEscape => {
                  if (objetoEscape.escenaId == this.escenaActual.id) {
                    this.mapPosicionObjetosDeEscena.set(objetoEscape.posicion, objetoEscape);
                  }
                });
                this.mapPosicionObjetosDeTodasLasEscenas.set(this.escenaActual.id, this.mapPosicionObjetosDeEscena);
                this.sesion.TomaMapPosicionObjetosDeTodasLasEscenas(this.mapPosicionObjetosDeTodasLasEscenas);
                //    this.calculos.GuardarEscapeRoom();
                Swal.fire('¡FINAL!', '', 'info');
              }
              else {
                this.alumnoJuegoEscapeRoom.escenaActualId = this.escenaActual.id + 1;
              }

            // console.log("Alumno: ", this.alumnoJuegoEscapeRoom);
            this.sesion.TomaAlumnoEscape(this.alumnoJuegoEscapeRoom);
            this.primerEscenario = this.primerEscenario + 1;
            // console.clear();
            this.reload();
          } else {
            Swal.fire('Me parece aquí que alguien me esta mintiendo... Vuelve al escenario del crimen y encuentra la llave!', '', 'info');

          }
        } else {
          if (this.llaveActual.recogido == true) {
            Swal.fire('¡Ahora hacen falta los objetos requeridos, pero la llave la tienes!', '', 'info');
          } else {
            Swal.fire('Me parece aquí que alguien me esta mintiendo... Vuelve al escenario del crimen y encuentra la llave!', '', 'info');

          }
        }
      }
    });
    ;
  }
  convertirObjetoJuegoEnObjetoEscape(objetoJuego: ObjetoJuego, objetoGlobal: ObjetoGlobalEscape): ObjetoEscape {
    let objetoEscape: ObjetoEscape = new ObjetoEscape(objetoGlobal.nombre, objetoGlobal.imagen, objetoJuego.usado, objetoJuego.recogido, objetoJuego.posicion, objetoJuego.escenaId, objetoJuego.juegoDeEscapeRoomId, objetoJuego.objetoId, objetoJuego.id, objetoGlobal.tipo, objetoJuego.requerido, objetoJuego.requeridoEscenaId);
    return objetoEscape;
  }
  convertirObjetoJuegoEnObjetoEnigma(objetoJuego: ObjetoJuego, objetoGlobal: ObjetoGlobalEscape): ObjetoEnigma {
    let objetoEnigma: ObjetoEnigma = new ObjetoEnigma(objetoGlobal.nombre, objetoGlobal.imagen, objetoJuego.pregunta, objetoJuego.respuesta, objetoJuego.resuelto, objetoJuego.posicion, objetoJuego.escenaId, objetoJuego.juegoDeEscapeRoomId, objetoJuego.objetoId, objetoJuego.id, objetoGlobal.tipo, objetoJuego.principal);
    return objetoEnigma;
  }
  convertirObjetoJuegoEnLlave(objetoJuego: ObjetoJuego, objetoGlobal: ObjetoGlobalEscape): Llave {
    let llave: Llave = new Llave(objetoGlobal.nombre, objetoJuego.recogido, objetoJuego.escenaId, objetoJuego.juegoDeEscapeRoomId, objetoJuego.objetoId, objetoJuego.id, objetoGlobal.tipo);
    return llave;
  }
  convertirObjetoJuegoEnPista(objetoJuego: ObjetoJuego, objetoGlobal: ObjetoGlobalEscape): Pista {
    let pista: Pista = new Pista(objetoGlobal.nombre, objetoJuego.recogido, objetoJuego.escenaId, objetoJuego.pregunta, objetoJuego.juegoDeEscapeRoomId, objetoJuego.objetoId, objetoJuego.id, objetoGlobal.tipo);
    return pista;
  }
  volver() {
    Swal.fire({
      title: '¿Deseas volver al escenario anterior?',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.escenaActual.id == this.escenaAnterior + 1) {
          this.escenaAnterior = this.escenaAnterior + 1;
          this.alumnoJuegoEscapeRoom.escenaActualId = this.escenaActual.id - 1;
        }
        else {
          this.escenaAnterior = this.escenaAnterior - 1;
          this.alumnoJuegoEscapeRoom.escenaActualId = this.escenaActual.id - 1;

        }
        this.sesion.TomaAlumnoEscape(this.alumnoJuegoEscapeRoom);
        this.reload();
      }
    });
  }
}
