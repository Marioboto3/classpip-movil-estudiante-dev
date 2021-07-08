import { Injectable } from '@angular/core';
import { SesionService, PeticionesAPIService } from './index';
import { HttpClient } from '@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
// tslint:disable-next-line:max-line-length
import {
  // tslint:disable-next-line:max-line-length
  Grupo, Equipo, Juego, Alumno, Nivel, TablaAlumnoJuegoDePuntos, TablaHistorialPuntosAlumno, AlumnoJuegoDePuntos, TablaEquipoJuegoDePuntos, HistorialPuntosAlumno,
  HistorialPuntosEquipo, EquipoJuegoDePuntos, TablaHistorialPuntosEquipo, AlumnoJuegoDeColeccion, AlumnoJuegoDeCompeticionLiga, Album,
  EquipoJuegoDeColeccion, AlbumEquipo, Cromo, Jornada, MiAlumnoAMostrarJuegoDePuntos, MiEquipoAMostrarJuegoDePuntos,
  // tslint:disable-next-line:max-line-length
  EnfrentamientoLiga, TablaAlumnoJuegoDeCompeticion, EquipoJuegoDeCompeticionLiga, InformacionPartidosLiga, TablaJornadas, TablaEquipoJuegoDeCompeticion, AlumnoJuegoDeCompeticionFormulaUno,
  EquipoJuegoDeCompeticionFormulaUno, TablaClasificacionJornada, AlumnoJuegoDeGeocaching, Escenario, MiAlumnoAMostrarJuegoDeGeocaching, PuntoGeolocalizable, Pregunta, TablaAlumnoJuegoDeCuestionario
} from '../clases/index';
// import { MatTableDataSource } from '@angular/material/table';
// import { MiAlumnoAMostrarJuegoDePuntos } from '../clases/MiAlumnoAMostrarJuegoDePuntos';
import { combineLatest, Observable, observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { stringify } from 'querystring';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { MiAlumnoAMostrarJuegoDeCuestionario } from '../clases/MiAlumnoAMostrarJuegoDeCuestionario';
import { AlumnoJuegoDeCuestionario } from '../clases/AlumnoJuegoDeCuestionario';
import { JuegoDeEscapeRoom } from '../clases/JuegoDeEscapeRoom';
import { AlumnoJuegoDeEscapeRoom } from '../clases/AlumnoJuegoDeEscapeRoom';
import { ObjetoEscape } from '../clases/objetoEscape';
import { ObjetoEnigma } from '../clases/ObjetoEnigma';
import { ObjetoPista } from '../clases/ObjetoPista';
import { EscenarioEscapeRoom } from '../clases/EscenarioEscapeRoom';
import Swal from 'sweetalert2';
import { element } from 'protractor';
import { ObjetoGlobalEscape } from '../clases/ObjetoGlobalEscape';
import { PartidaEscape } from '../clases/PartidaEscape';
import { EscenaDeJuego } from '../clases/EscenaDeJuego';
import { ObjetoJuego } from '../clases/ObjetoJuego';
import { Llave } from '../clases/Llave';
import { Pista } from '../clases/Pista';

@Injectable({
  providedIn: 'root'
})
export class CalculosService {

  objetosEnigmaSegundoEscenario: ObjetoEnigma[] = [];
  objetosEscapeAyuda: ObjetoEscape[] = [];
  objetosEscape: ObjetoEscape[] = [];
  objetosEscapeSegundoEscenario: ObjetoEscape[] = [];
  objetosEnigma: ObjetoEnigma[] = [];
  juegosDePuntosActivos: Juego[] = [];
  juegosDePuntosInactivos: Juego[] = [];
  juegosDeColeccionActivos: Juego[] = [];
  juegosDeColeccionInactivos: Juego[] = [];
  juegosDeCompeticionActivos: Juego[] = [];
  juegosDeCompeticionInactivos: Juego[] = [];
  todosLosJuegosActivos: Juego[] = [];
  todosLosJuegosInactivos: Juego[] = [];
  listaJuegosSeleccionadoActivo: Juego[];
  listaJuegosSeleccionadoInactivo: Juego[];
  informacionPartidos: InformacionPartidosLiga[];
  equipos: Equipo[] = [];
  puntos: number;
  miImagenCromo: string;
  alumnoEscape: AlumnoJuegoDeEscapeRoom;
  juegoEscape: JuegoDeEscapeRoom;
  mapEscenasPorJuego: Map<number, Map<number, EscenaDeJuego>> = new Map<number, Map<number, EscenaDeJuego>>();
  mapEscenarioPorEscena: Map<number, EscenarioEscapeRoom> = new Map<number, EscenarioEscapeRoom>();
  mapObjetosPorEscena: Map<number, Map<number, ObjetoJuego>> = new Map<number, Map<number, ObjetoJuego>>();
  mapInformacionGlobalDelObjetoJuego: Map<number, ObjetoGlobalEscape> = new Map<number, ObjetoGlobalEscape>();
  mapObjetosJuego: Map<number, ObjetoJuego> = new Map<number, ObjetoJuego>();
  escenaActualId: number;
  mapPosicionObjetosDeEscena: Map<number, any> = new Map<number, any>(); //escena actual
  mapPosicionObjetosDeTodasLasEscenas: Map<number, Map<number, any>> = new Map<number, Map<number, any>>(); //escena actual
  mapObjetosEscapeFromObjetosJuego: Map<number, Map<number, ObjetoEscape>> = new Map<number, Map<number, ObjetoEscape>>(); //todos
  mapObjetosEnigmaFromObjetosJuego: Map<number, Map<number, ObjetoEnigma>> = new Map<number, Map<number, ObjetoEnigma>>(); //todos
  mapLlavePorEscena: Map<number, Llave> = new Map<number, Llave>();
  mapPistaPorEscena: Map<number, Pista> = new Map<number, Pista>();
  mapEscenas: Map<number, EscenaDeJuego> = new Map<number, EscenaDeJuego>();
  mapObjetosRequeridosPorEscena: Map<number, Map<number,ObjetoEscape>> = new Map<number, Map<number,ObjetoEscape>>();



  constructor(
    private sesion: SesionService,
    private peticionesAPI: PeticionesAPIService,
    public https: Http
  ) {
  }

  public GuardaObjetosEscapeEscenario(escenario: string) {

    this.peticionesAPI.DameObjetosEscapeEscenario(escenario).subscribe(res => {

      if (escenario == "Principal") { }
      if (escenario == "Secundario") {
        this.objetosEscapeSegundoEscenario = res;
        this.sesion.TomaObjetosEscapeSegundoEscenario(this.objetosEscapeSegundoEscenario);
      }
    });

  }
  public GuardaObjetosEnigmaEscenario(escenario: string) {

    this.peticionesAPI.DameObjetosEnigmaEscenario(escenario).subscribe(res => {

      if (escenario == "Principal") { }
      if (escenario == "Secundario") {
        this.objetosEnigmaSegundoEscenario = res;
        this.sesion.TomaObjetosEnigmaSegundoEscenario(this.objetosEnigmaSegundoEscenario);
      }
    });

  }
  public cambiaEstadoObjetoEnigmaConListaObjetos(objetoEnigma: ObjetoEnigma) {
    this.peticionesAPI.ActualizaObjetoEnigma(objetoEnigma).subscribe(res => {
      this.objetosEnigma.forEach(elemento => {
        console.log("res:", res);
        if (elemento.nombre == res.nombre) {
          elemento = res;
        }
      })
    });
    this.sesion.TomaObjetosEnigma(this.objetosEnigma);
  }
  public MapearInformacionEscape(juego: JuegoDeEscapeRoom) {
   
    //Pedimos el alumno del escape room una vez tenemos el juego
    this.peticionesAPI.DameAlumnoDeEscapeRoom(this.sesion.DameAlumno().id, juego.id).subscribe({
      next: data => {
        // console.log("Data alumno: ", data[0]);
        this.sesion.TomaAlumnoEscape(data[0]);
      },
      error: error => {
        console.log("Error: ", error);
      }
      // console.log("Alumno escape room: ", alumno);
    });

    //Pedimos el objeto partida que es la relacion entre Juego y escena para poder pedir la informacion de cada escena
    let map: Map<number, EscenaDeJuego> = new Map<number, EscenaDeJuego>();
    let mapObjetos: Map<number, ObjetoJuego> = new Map<number, ObjetoJuego>();

    this.peticionesAPI.DameTodasLasPartidasDelJuegoEscape(juego.id).subscribe(partidas => {
      // console.log("Partidas: ", partidas);
      if (partidas[0] != null) {
        partidas.forEach(partida => {
          this.peticionesAPI.DameEscenaEscapeRoom(partida.escenaId).subscribe(escena => {
            //   console.log("Escena: ", escena);
            if (escena != null && escena != undefined) {
              map.set(escena.id, escena);
              this.sesion.TomaMapEscenas(map);
              console.log("map escenas: ", map);
              //Pedimos la informacion de los escenarios de todas las escenas y lo guardamos en el map de escenas
              this.peticionesAPI.DameEscenarioEscapePorEscena(escena.escenarioId).subscribe(escenario => {
                //      console.log("Escenario: ", escenario);
                this.mapEscenarioPorEscena.set(escena.id, escenario);
                this.sesion.TomaMapEscenarioPorEscena(this.mapEscenarioPorEscena);
              });

              //Pedimos todos los ObjetosJuego de la escena
              this.peticionesAPI.DameTodosLosObjetosJuegoDeLaEscena(partida.escenaId, juego.id).subscribe(objetosJuego => {
                // console.log("Objetos juego de la escena: ", objetosJuego);
                objetosJuego.forEach(objeto => {
                  mapObjetos.set(objeto.id, objeto);
                  this.sesion.TomaMapObjetosJuego(mapObjetos);
                  // console.log("Objeto: ", objeto);
                  //Pedimos todos los objetosGlobales de todos los objetos juego
                  if (objeto.objetoId == undefined) {
                    // console.log("Objeto undefined: ", objeto)
                  } else {
                    this.peticionesAPI.DameObjetoGlobalEscape(objeto.objetoId).subscribe(objetoGlobal => {
                      if (objetoGlobal != undefined && objetoGlobal != null) {
                        this.mapInformacionGlobalDelObjetoJuego.set(objeto.id, objetoGlobal);
                        this.sesion.TomaMapInformacionGlobalDelObjetoJuego(this.mapInformacionGlobalDelObjetoJuego);
                      } else {
                        // console.log("No hay objeto Global.");
                      }
                    });
                  }
                });
              });
            }
          });
        });
      }
    });
    console.clear();
  }

  public pasarDeObjetoEscapeAObjetoJuego(objetoEscape: ObjetoEscape): ObjetoJuego {

    let objetoJuego: ObjetoJuego = new ObjetoJuego(objetoEscape.objetoGlobalId, objetoEscape.escenaId, "string", "string", objetoEscape.usado, objetoEscape.recogido, false, objetoEscape.posicion, objetoEscape.juegoDeEscapeRoomId, objetoEscape.escenaId, false, objetoEscape.requerido, objetoEscape.requeridoEscenaId);
    objetoJuego.id = objetoEscape.objetoJuegoId;
    return objetoJuego;
  }
  public pasarDeObjetoEnigmaAObjetoJuego(objetoEnigma: ObjetoEnigma): ObjetoJuego {

    let objetoJuego: ObjetoJuego = new ObjetoJuego(objetoEnigma.objetoGlobalId, objetoEnigma.escenaId, objetoEnigma.pregunta, objetoEnigma.respuesta, false, false, objetoEnigma.resuelto, objetoEnigma.posicion, objetoEnigma.juegoDeEscapeRoomId, objetoEnigma.escenaId, objetoEnigma.principal, false, 1);
    objetoJuego.id = objetoEnigma.objetoJuegoId;
    return objetoJuego;
  }
  public pasarDeObjetoLlaveAObjetoJuego(llave: Llave): ObjetoJuego {

    let objetoJuego: ObjetoJuego = new ObjetoJuego(llave.objetoGlobalId, llave.escenaId, "string", "string", false, llave.recogido, false, 1, llave.juegoDeEscapeRoomId, llave.escenaId, false, false, 1);
    objetoJuego.id = llave.objetoJuegoId;
    return objetoJuego;
  }
  public pasarDeObjetoPistaAObjetoJuego(pista: Pista): ObjetoJuego {

    let objetoJuego: ObjetoJuego = new ObjetoJuego(pista.objetoGlobalId, pista.escenaId, pista.texto, "string", false, pista.recogido, false, 1, pista.juegoDeEscapeRoomId, pista.escenaId, false, false, 1);
    objetoJuego.id = pista.objetoJuegoId;
    return objetoJuego;
  }
  public GuardarEscapeRoom() {

    this.escenaActualId = this.sesion.DameEscenaActualId();
    // if (this.escenaActualId == 1) {
    //   this.alumnoEscape = this.sesion.DameAlumnoEscape();
    // } else {
      this.alumnoEscape = this.sesion.DameAlumnoEscapeRoom();
    // }
    console.log("alumno escape: ", this.alumnoEscape);
    this.peticionesAPI.GuardarAlumnoEscapeRoom(this.alumnoEscape).subscribe();
    // this.mapPosicionObjetosDeTodasLasEscenas = this.sesion.DameMapPosicionObjetosDeTodasLasEscenas();
    // console.log("-- Map con todas las posiciones: ", this.mapPosicionObjetosDeTodasLasEscenas);
    // Array.from(this.mapPosicionObjetosDeTodasLasEscenas.values()).forEach(mapObjetos =>{
    //   Array.from(mapObjetos.values()).forEach(objeto =>{
    //     console.log("Objeto: ", objeto);
    //     this.peticionesAPI.GuardarObjetoJuego(objeto).subscribe();
    //   })
    // });
    this.mapObjetosEscapeFromObjetosJuego = this.sesion.DameMapObjetosEscapeFromObjetosJuego();
    console.log("-- map objetos escape: ", this.mapObjetosEscapeFromObjetosJuego);
    let list: ObjetoJuego[] = [];
    Array.from(this.mapObjetosEscapeFromObjetosJuego.values()).forEach(mapObjetos => {
      Array.from(mapObjetos.values()).forEach(objetoEscape => {
        console.log("Objeto escape: ", objetoEscape);
        list.push(this.pasarDeObjetoEscapeAObjetoJuego(objetoEscape));
      });
    });
    this.mapObjetosEnigmaFromObjetosJuego = this.sesion.DameMapObjetosEnigmaFromObjetosJuego();
    console.log("-- map objetos enigma: ", this.mapObjetosEnigmaFromObjetosJuego);

    Array.from(this.mapObjetosEnigmaFromObjetosJuego.values()).forEach(mapObjetos => {
      Array.from(mapObjetos.values()).forEach(objetoEnigma => {
        console.log("Objeto enigma: ", objetoEnigma);
        list.push(this.pasarDeObjetoEnigmaAObjetoJuego(objetoEnigma));
      });
    });
    this.mapLlavePorEscena = this.sesion.DameMapLlaveEscena();
    Array.from(this.mapLlavePorEscena.values()).forEach(llave => {
      console.log("Objeto llave: ", llave);
      list.push(this.pasarDeObjetoLlaveAObjetoJuego(llave));
    });
    this.mapPistaPorEscena = this.sesion.DameMapPistaEscena();
    Array.from(this.mapPistaPorEscena.values()).forEach(pista => {
      console.log("Objeto pista: ", pista);
      list.push(this.pasarDeObjetoPistaAObjetoJuego(pista));
    });
    console.log("Lista: ", list);
    Array.from(list.values()).forEach(objetoJuego => {
      this.peticionesAPI.GuardarObjetoJuego(objetoJuego).subscribe(objReturn => {
        console.log("Obj return: ", objReturn);
      });
    })

    // this.mapEscenasPorJuego = new Map<number, Map<number, EscenaDeJuego>>();
    // this.sesion.TomaMapEscenasPorJuego(this.mapEscenasPorJuego);
    // this.mapEscenarioPorEscena= new Map<number, EscenarioEscapeRoom>();
    // this.sesion.TomaMapEscenarioPorEscena(this.mapEscenarioPorEscena);
    // this.mapObjetosPorEscena = new Map<number, Map<number, ObjetoJuego>>();
    // this.sesion.TomaMapObjetosPorEscena(this.mapObjetosPorEscena);
    // this.mapInformacionGlobalDelObjetoJuego = new Map<number, ObjetoGlobalEscape>();
    // this.sesion.TomaMapInformacionGlobalDelObjetoJuego(this.mapInformacionGlobalDelObjetoJuego);
    // this.mapEscenas = new Map<number, EscenaDeJuego>();
    // this.sesion.TomaMapEscenas(this.mapEscenas);
    // this.mapObjetosJuego = new Map<number, ObjetoJuego>();
    // this.sesion.TomaMapObjetosJuego(this.mapObjetosJuego);
    // this.mapObjetosEscapeFromObjetosJuego = new Map<number, Map<number, ObjetoEscape>>(); //todos
    // this.sesion.TomaMapObjetosEscapeFromObjetosJuego(this.mapObjetosEscapeFromObjetosJuego);
    // this.mapObjetosEnigmaFromObjetosJuego = new Map<number, Map<number, ObjetoEnigma>>(); //todos
    // this.sesion.TomaMapObjetosEnigmaFromObjetosJuego(this.mapObjetosEnigmaFromObjetosJuego);
    // this.mapPosicionObjetosDeEscena= new Map<number, any>(); //escena actual
    // this.sesion.TomaMapPosicionObjetosDeEscena(this.mapPosicionObjetosDeEscena);
    // this.mapLlavePorEscena = new Map<number, Llave>();
    // this.sesion.TomaMapLlaveEscena(this.mapLlavePorEscena);
    // this.mapPistaPorEscena = new Map<number, Pista>();
    // this.sesion.TomaMapPistaEscena(this.mapPistaPorEscena);
    // this.mapObjetosRequeridosPorEscena = new Map<number, Map<number,ObjetoEscape>>();
    // this.sesion.TomaMapObjetosRequeridosPorEscena(this.mapObjetosRequeridosPorEscena);
    // this.mapPosicionObjetosDeTodasLasEscenas = new Map<number, Map<number, any>>(); //escena actual
    // this.sesion.TomaMapPosicionObjetosDeTodasLasEscenas(this.mapPosicionObjetosDeTodasLasEscenas);
    // this.mapObjetosJuego = this.sesion.DameMapObjetosJuego();
    // Array.from(this.mapObjetosJuego.values()).forEach(objetoJuego =>{
    //   this.peticionesAPI.GuardarObjetoJuego(objetoJuego).subscribe();
    // });
  }
  // ESTA FUNCIÓN BORRARÁ EL GRUPO DE ID QUE PASEMOS DEL PROFESOR CON ID QUE PASEMOS Y VOLVERÁ A LA PÁGINA DE LISTAR
  // ACTUALIZANDO LA TABLA
  public EliminarGrupo() {

    this.peticionesAPI.BorraGrupo(
      this.sesion.DameProfesor().id,
      this.sesion.DameGrupo().id)
      .subscribe(() => {

        this.EliminarMatriculas();

        // Ahora elimino el grupo de la lista de grupos para que desaparezca de la pantalla al regresar
        let lista = this.sesion.DameListaGrupos();
        lista = lista.filter(g => g.id !== this.sesion.DameGrupo().id);
        this.sesion.TomaListaGrupos(lista);
      });
  }

  // ESTA FUNCIÓN RECUPERA TODAS LAS MATRICULAS DEL GRUPO QUE VAMOS A BORRAR Y DESPUÉS LAS BORRA. ESTO LO HACEMOS PARA NO
  // DEJAR MATRICULAS QUE NO NOS SIRVEN EN LA BASE DE DATOS
  private EliminarMatriculas() {

    // Pido las matrículas correspondientes al grupo que voy a borrar
    this.peticionesAPI.DameMatriculasGrupo(this.sesion.DameGrupo().id)
      .subscribe(matriculas => {
        if (matriculas[0] !== undefined) {

          // Una vez recibo las matriculas del grupo, las voy borrando una a una
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < matriculas.length; i++) {
            this.peticionesAPI.BorraMatricula(matriculas[i].id)
              .subscribe(() => {
                console.log('matricula borrada correctamente');
              });
          }
        } else {
          console.log('no hay matriculas');
        }

      });
  }

  public borrarElementoLista(number: number, lista: any) {
    lista.forEach((value, index) => {
      if (value == number) {
        lista.splice(index, 1)
        console.log("eeeeee");
      }
    });
    return lista;
  }
  public añadirObjetoMochila(objeto: ObjetoGlobalEscape) {
    /*   let bool: boolean = false;
   
       console.log("Objeto llave que paxa: ", objeto);
       this.juegoEscape = this.sesion.DameJuegoEscapeRoom();
   
       this.juegoEscape.mochila.objetos.forEach(element => {
         if(element.nombre == objeto.nombre){
           bool = true;
           Swal.fire("Ya está añadido el objeto.", "", "info");
         }
       });
       if (bool == false){
         this.juegoEscape.mochila.objetos[this.juegoEscape.mochila.objetos.length] = objeto;
         this.sesion.TomaJuegoEscapeRoom(this.juegoEscape);
       }  */
  }
  public añadirPistaMochila(objeto: ObjetoPista) { /*
    this.juegoEscape = this.sesion.DameJuegoEscapeRoom();
    console.log("JUEGO Mochila pre: ", this.juegoEscape)
    console.log("JUEGO Mochila pre PISTAS: ", this.juegoEscape.mochila.pistasGuardadas);

    if(this.juegoEscape.mochila.pistasGuardadas != undefined){
    this.juegoEscape.mochila.pistasGuardadas[this.juegoEscape.mochila.pistasGuardadas.length] = objeto;
  }else{
    this.juegoEscape.mochila.pistasGuardadas.push(objeto);
  }
  console.log("JUEGO Mochila POST PISTAS: ", this.juegoEscape.mochila.pistasGuardadas);
  this.sesion.TomaJuegoEscapeRoom(this.juegoEscape);
*/}

  public DameJuegosAlumno(AlumnoId: number): any {
    const Observables = new Observable(obs => {
      const JuegosActivos: any[] = [];
      const JuegosInactivos: any[] = [];
      this.peticionesAPI.DameJuegoDePuntosAlumno(AlumnoId)
        .subscribe(lista => {
          for (let i = 0; i < (lista.length); i++) {
            if (lista[i].juegoActivo === true) {
              JuegosActivos.push(lista[i]);
            } else {
              JuegosInactivos.push(lista[i]);
            }
          }
          this.peticionesAPI.DameJuegoDeColeccionesAlumno(AlumnoId)
            // tslint:disable-next-line:no-shadowed-variable
            .subscribe(lista => {
              for (let i = 0; i < (lista.length); i++) {
                if (lista[i].juegoActivo === true) {
                  JuegosActivos.push(lista[i]);
                } else {
                  JuegosInactivos.push(lista[i]);
                }
              }
              this.peticionesAPI.DameJuegoDeGeocachingAlumno(AlumnoId)

                // tslint:disable-next-line:no-shadowed-variable
                .subscribe(lista => {
                  for (let i = 0; i < (lista.length); i++) {
                    if (lista[i].juegoActivo === true) {
                      JuegosActivos.push(lista[i]);
                    } else if (lista[i].juegoTerminado === true) {
                      lista[i].tipo = 'Juego De Geocaching';
                      JuegosInactivos.push(lista[i]);
                    }
                  }
                  console.log(JuegosActivos);
                  console.log('voy a por los juegos de F1 del alumno');
                  this.peticionesAPI.DameJuegoDeCompeticionF1Alumno(AlumnoId)
                    // tslint:disable-next-line:no-shadowed-variable
                    .subscribe(lista => {
                      for (let i = 0; i < (lista.length); i++) {
                        if (lista[i].juegoActivo === true) {
                          JuegosActivos.push(lista[i]);
                        } else {
                          JuegosInactivos.push(lista[i]);
                        }
                      }
                      console.log('yasta la lista de juegos de F1');
                      console.log('voy a por los juegos de liga del alumno');
                      this.peticionesAPI.DameJuegoDeCompeticionLigaAlumno(AlumnoId)
                        // tslint:disable-next-line:no-shadowed-variable
                        .subscribe(lista => {
                          for (let i = 0; i < (lista.length); i++) {
                            if (lista[i].juegoActivo === true) {
                              JuegosActivos.push(lista[i]);
                            } else {
                              JuegosInactivos.push(lista[i]);
                            }
                          }
                          console.log('ya tengo los juegos de liga');
                          console.log('voy a por los juegos de cuestionario del alumno');

                          this.peticionesAPI.DameJuegoDeCuestionarioAlumno(AlumnoId)
                            // tslint:disable-next-line:no-shadowed-variable
                            .subscribe(lista => {
                              for (let i = 0; i < (lista.length); i++) {
                                if (lista[i].juegoActivo === true) {
                                  // Esto lo hago porque la lista que viene de la API es de objetos de tipo JuegoDeCuestionario
                                  // que no tienen el campo tipo de juego. Tengo que añadirselo yo.
                                  lista[i].tipo = 'Juego De Cuestionario';
                                  JuegosActivos.push(lista[i]);
                                } else if (lista[i].juegoTerminado === true) {
                                  lista[i].tipo = 'Juego De Cuestionario';
                                  JuegosInactivos.push(lista[i]);
                                }
                              }

                              console.log('ya tengo los juegos de cuestionario');

                              console.log('voy a por los juegos de avatar');
                              this.peticionesAPI.DameJuegoDeAvatarAlumno(AlumnoId)
                                // tslint:disable-next-line:no-shadowed-variable
                                .subscribe(lista => {
                                  for (let i = 0; i < (lista.length); i++) {
                                    if (lista[i].juegoActivo === true) {
                                      JuegosActivos.push(lista[i]);
                                    } else {
                                      JuegosInactivos.push(lista[i]);
                                    }
                                  }
                                  console.log('ya tengo los juegos de avatar');
                                  console.log('voy a por los juegos de votacion uno a todos');
                                  this.peticionesAPI.DameJuegosDeVotacionUnoATodosAlumno(AlumnoId)
                                    // tslint:disable-next-line:no-shadowed-variable
                                    .subscribe(lista => {
                                      for (let i = 0; i < (lista.length); i++) {
                                        if (lista[i].juegoActivo === true) {
                                          JuegosActivos.push(lista[i]);
                                        } else {
                                          JuegosInactivos.push(lista[i]);
                                        }
                                      }
                                      console.log('voy a por los juegos de votacion todos a uno');
                                      this.peticionesAPI.DameJuegosDeVotacionUnoATodosAlumno(AlumnoId)
                                        // tslint:disable-next-line:no-shadowed-variable
                                        .subscribe(lista => {

                                          for (let i = 0; i < (lista.length); i++) {
                                            if (lista[i].juegoActivo === true) {
                                              JuegosActivos.push(lista[i]);
                                            } else {
                                              JuegosInactivos.push(lista[i]);
                                            }
                                          }
                                          console.log('ya tengo los juegos de votacion todos a uno');
                                          console.log('¡Escape room!');

                                          this.peticionesAPI.DameJuegosDeEscapeRoom(AlumnoId).subscribe(juegosDelAlumno => {
                                            for (let i = 0; i < juegosDelAlumno.length; i++) {
                                              //REVISAR CLASES POR TEMA DE MAYUSCULAS
                                              if (juegosDelAlumno[i].juegoActivo === true) {
                                                console.log("Juego active: ", juegosDelAlumno[i]);
                                                JuegosActivos.push(juegosDelAlumno[i]);
                                              } else {
                                                JuegosInactivos.push(juegosDelAlumno[i]);
                                              }
                                            }
                                            console.log("Juegos escape del alumno: ", juegosDelAlumno);
                                          });
                                          console.log('Ya tengo los juegos de Escape');

                                          console.log('voy a por los juegos de cuestionario de satisfaccion');
                                          this.peticionesAPI.DameJuegosDeCuestiinarioSatisfaccionAlumno(AlumnoId)
                                            // tslint:disable-next-line:no-shadowed-variable
                                            .subscribe(lista => {
                                              for (let i = 0; i < (lista.length); i++) {
                                                if (lista[i].juegoActivo === true) {
                                                  JuegosActivos.push(lista[i]);
                                                } else {
                                                  JuegosInactivos.push(lista[i]);
                                                }
                                              }
                                              console.log('ya tengo los juegos de cuestionario de satisfaccion');
                                              console.log(lista);
                                              console.log('voy a por los juegos de evaluacion');
                                              //this.peticionesAPI.DameJuegosDeEvaluacion(AlumnoId)
                                              this.peticionesAPI.DameJuegosDeCuestiinarioSatisfaccionAlumno(AlumnoId)
                                                // tslint:disable-next-line:no-shadowed-variable
                                                .subscribe(lista => {
                                                  // for (let i = 0; i < (lista.length); i++) {
                                                  //     if (lista[i].JuegoActivo === true) {
                                                  //         JuegosActivos.push(lista[i]);
                                                  //     } else {
                                                  //         JuegosInactivos.push(lista[i]);
                                                  //     }
                                                  // }
                                                  // console.log('ya tengo los juegos de evaluacion', lista);


                                                  console.log('vamos a por los equipos');
                                                  this.peticionesAPI.DameEquiposDelAlumno(AlumnoId)
                                                    // tslint:disable-next-line:no-shadowed-variable
                                                    .subscribe(lista => {
                                                      this.equipos = lista;
                                                      console.log('yasta la lista de equipos');
                                                      console.log(this.equipos);
                                                      if (this.equipos.length === 0) {
                                                        // No hay equipos. Ya puedo retornar las listas de juegos
                                                        const MisObservables = { activos: JuegosActivos, inactivos: JuegosInactivos };
                                                        obs.next(MisObservables);
                                                      } else {
                                                        let cont = 0;
                                                        for (let i = 0; i < (this.equipos.length); i++) {
                                                          console.log('voy a por los juegos de puntos del euqioi ' + this.equipos[i].id);
                                                          this.peticionesAPI.DameJuegoDePuntosEquipo(this.equipos[i].id)
                                                            // tslint:disable-next-line:no-shadowed-variable
                                                            .subscribe(lista => {
                                                              console.log('ya tengo los juegos de puntos del equipo ');
                                                              console.log(lista);
                                                              for (let j = 0; j < (lista.length); j++) {
                                                                if (lista[j].juegoActivo === true) {
                                                                  JuegosActivos.push(lista[j]);
                                                                } else {
                                                                  JuegosInactivos.push(lista[j]);
                                                                }
                                                              }
                                                              console.log('voy a por los juegos de coleccion del euqioi ' + this.equipos[i].id);
                                                              this.peticionesAPI.DameJuegoDeColeccionEquipo(this.equipos[i].id)
                                                                // tslint:disable-next-line:no-shadowed-variable
                                                                .subscribe(lista => {
                                                                  console.log('ya tengo los juegos de coleccion del equipo ');
                                                                  console.log(lista);
                                                                  for (let j = 0; j < (lista.length); j++) {
                                                                    if (lista[j].juegoActivo === true) {
                                                                      JuegosActivos.push(lista[j]);
                                                                    } else {
                                                                      JuegosInactivos.push(lista[j]);
                                                                    }
                                                                  }
                                                                  console.log('voy a por los juegos de F1 del equipo ' + this.equipos[i].id);
                                                                  this.peticionesAPI.DameJuegoDeCompeticionF1Equipo(this.equipos[i].id)
                                                                    // tslint:disable-next-line:no-shadowed-variable
                                                                    .subscribe(lista => {
                                                                      console.log('ya tengo los juegos de F1 del equipo');
                                                                      console.log(lista);
                                                                      for (let j = 0; j < (lista.length); j++) {
                                                                        if (lista[j].juegoActivo === true) {
                                                                          JuegosActivos.push(lista[j]);
                                                                        } else {
                                                                          JuegosInactivos.push(lista[j]);
                                                                        }
                                                                      }
                                                                      console.log('voy a por los juegos de liga del equipo' + this.equipos[i].id);
                                                                      this.peticionesAPI.DameJuegoDeCompeticionLigaEquipo(this.equipos[i].id)
                                                                        // tslint:disable-next-line:no-shadowed-variable
                                                                        .subscribe(lista => {
                                                                          console.log('ya tengo los juegos de liga del equipo');
                                                                          console.log(lista);
                                                                          for (let j = 0; j < (lista.length); j++) {
                                                                            if (lista[j].juegoActivo === true) {
                                                                              JuegosActivos.push(lista[j]);
                                                                            } else {
                                                                              JuegosInactivos.push(lista[j]);
                                                                            }
                                                                          }
                                                                          console.log('voy a por los juegos de evaluacion del grupo ' + this.equipos[i].grupoId);
                                                                          //this.peticionesAPI.DameJuegoDeEvaluacionGrupo(this.equipos[i].grupoId)
                                                                          this.peticionesAPI.DameJuegoDeCompeticionLigaEquipo(this.equipos[i].id)

                                                                            // tslint:disable-next-line:no-shadowed-variable
                                                                            .subscribe(lista => {
                                                                              // console.log('ya tengo los juegos de evaluacion del grupo ', lista);
                                                                              // for (let j = 0; j < (lista.length); j++) {
                                                                              //     if (lista[j].JuegoActivo === true) {
                                                                              //         JuegosActivos.push(lista[j]);
                                                                              //     } else {
                                                                              //         JuegosInactivos.push(lista[j]);
                                                                              //     }
                                                                              // }


                                                                              // vemos si hemos acabado de recogar los juegos de todos los equipos
                                                                              cont = cont + 1;
                                                                              if (cont === this.equipos.length) {
                                                                                const MisObservables = {
                                                                                  activos: JuegosActivos,
                                                                                  inactivos: JuegosInactivos
                                                                                };
                                                                                obs.next(MisObservables);
                                                                              }
                                                                            });
                                                                        }); // juegos de liga del equipo
                                                                    }); // juegos de F1 del equipo
                                                                }); // juegos de coleccion del equipo
                                                            }); // juegos de puntos del equipo
                                                        } // fin bucle for equipos
                                                      } // else de la pregunta de si hay equipos
                                                    }); // equipos del alumno
                                                }); // juegos de evaluacion
                                            }); // juegos de cuestionario de satisfaccion
                                        }); // juegos de votacion todos a uno
                                    }); // juegos de votacion uno a todos
                                });  // juegos de avatar
                            }); // juegos de cuestionario
                        }); // juegos de competicion Liga
                    }); // Juegos de Competicion F1
                }); // juegos de geocaching
            }); // juegos de colección
        }); // juegos de puntos
    }); // observable
    return Observables;
  }

  public DameAlumnosJuegoPuntos(juegoId: number) {
    let InformacionAlumno: MiAlumnoAMostrarJuegoDePuntos[] = [];
    this.peticionesAPI.DameAlumnosJuegoDePuntos(juegoId).subscribe(
      listaAlumnos => {
        console.log('este es el numero de alumnos en este juego' + listaAlumnos.length);
        for (let i = 0; i < (listaAlumnos.length); i++) {
          const MiAlumno = new MiAlumnoAMostrarJuegoDePuntos();
          MiAlumno.nombre = listaAlumnos[i].nombre;
          MiAlumno.primerApellido = listaAlumnos[i].primerApellido;
          MiAlumno.imagenPerfil = listaAlumnos[i].imagenPerfil;
          this.peticionesAPI.DameInscripcionAlumnoJuegoDePuntos(listaAlumnos[i].id, juegoId).subscribe(
            Inscripcion => {
              MiAlumno.puntosTotalesAlumno = Inscripcion[0].PuntosTotalesAlumno;
              MiAlumno.alumnoId = Inscripcion[0].alumnoId;
              MiAlumno.id = Inscripcion[0].id;
              MiAlumno.juegoDePuntosId = Inscripcion[0].juegoDePuntosId;
              MiAlumno.nivelId = Inscripcion[0].nivelId;
            });
          InformacionAlumno.push(MiAlumno);
        }
        // tslint:disable-next-line:only-arrow-functions
        InformacionAlumno = InformacionAlumno.sort(function (obj1, obj2) {
          return obj2.puntosTotalesAlumno - obj1.puntosTotalesAlumno;
        });
      });
    return InformacionAlumno;
  }

  public DameAlumnosJuegoDeCuestionario(juegoId: number): MiAlumnoAMostrarJuegoDeCuestionario[] {
    let InformacionAlumno: MiAlumnoAMostrarJuegoDeCuestionario[] = [];
    this.peticionesAPI.DameAlumnosJuegoDeCuestionario(juegoId).subscribe(
      listaAlumnos => {
        for (let i = 0; i < (listaAlumnos.length); i++) {
          const MiAlumno = new MiAlumnoAMostrarJuegoDeCuestionario();
          MiAlumno.nombre = listaAlumnos[i].nombre;
          MiAlumno.primerApellido = listaAlumnos[i].primerApellido;
          MiAlumno.imagenPerfil = listaAlumnos[i].imagenPerfil;
          this.peticionesAPI.DameInscripcionAlumnoJuegoDeCuestionario(listaAlumnos[i].id, juegoId).subscribe(
            Inscripcion => {
              MiAlumno.nota = Inscripcion[0].Nota;
              MiAlumno.alumnoId = Inscripcion[0].alumnoId;
              MiAlumno.id = Inscripcion[0].id;
              MiAlumno.juegoDeCuestionarioId = Inscripcion[0].juegoDeCuestionarioId;
            });
          InformacionAlumno.push(MiAlumno);
        }
        InformacionAlumno = InformacionAlumno.sort((a, b) => {
          return b.nota - a.nota;
        });
      });
    return InformacionAlumno;
  }

  public DameListaAlumnosJuegoCuestionarioOrdenada(juegoDeCuestionarioId: number): MiAlumnoAMostrarJuegoDeCuestionario[] {
    const InformacionAlumno: MiAlumnoAMostrarJuegoDeCuestionario[] = [];
    let Inscripciones: AlumnoJuegoDeCuestionario[] = [];
    this.peticionesAPI.ListaInscripcionesAlumnosJuegoDeCuestionario(juegoDeCuestionarioId).subscribe(res => {
      Inscripciones = res;
      Inscripciones = Inscripciones.sort(function (a, b) {
        return b.nota - a.nota;
      });
      for (let i = 0; i < (Inscripciones.length); i++) {
        const MiAlumno = new MiAlumnoAMostrarJuegoDeCuestionario();
        MiAlumno.nota = Inscripciones[i].nota;
        MiAlumno.alumnoId = Inscripciones[i].alumnoId;
        MiAlumno.id = Inscripciones[i].id;
        MiAlumno.juegoDeCuestionarioId = Inscripciones[i].juegoDeCuestionarioId;
        this.peticionesAPI.DameAlumnoConId(MiAlumno.alumnoId)
          .subscribe(res => {
            MiAlumno.nombre = res.nombre;
            MiAlumno.primerApellido = res.primerApellido;
            MiAlumno.imagenPerfil = res.imagenPerfil;
          });
        InformacionAlumno.push(MiAlumno);
      }
    });
    return InformacionAlumno;
  }

  public RegalaCromoAlumnos(cromo: Cromo, alumnoDestinatarioId: number, alumnoQueRegalaId: number, juegoSeleccionado: Juego) {

    // No entiendo muy bien por qué esta petición devuelve un vector de inscripciones y no una sola.
    // por eso indexo la inscripcion con [0]
    // Lo mismo pasa al pedir los cromos del alumno (DameAlbumAlumno)
    this.peticionesAPI.DameInscripcionAlumnoJuegoDeColeccion(juegoSeleccionado.id, alumnoDestinatarioId)
      .subscribe(inscripcion => this.peticionesAPI.AsignarCromoAlumno(new Album(inscripcion[0].id, cromo.id)).subscribe()
      );
    this.peticionesAPI.DameInscripcionAlumnoJuegoDeColeccion(juegoSeleccionado.id, alumnoQueRegalaId)
      .subscribe(inscripcion => this.peticionesAPI.DameAlbumAlumno(cromo.id, inscripcion[0].id)
        .subscribe(album => this.peticionesAPI.BorrarAlbumAlumno(album[0].id).subscribe()));
  }

  public RegalaCromoEquipos(cromo: Cromo, equipoDestinatarioId: number, equipoQueRegalaId: number, juegoSeleccionado: Juego) {

    // No entiendo muy bien por qué esta petición devuelve un vector de inscripciones y no una sola.
    // por eso indexo la inscripcion con [0]
    // Lo mismo pasa al pedir los cromos del equipo (DameAlbumEquipo)
    this.peticionesAPI.DameInscripcionEquipoJuegoDeColeccion(juegoSeleccionado.id, equipoDestinatarioId)
      .subscribe(inscripcion => this.peticionesAPI.AsignarCromoEquipo(new AlbumEquipo(inscripcion[0].id, cromo.id)).subscribe()
      );
    this.peticionesAPI.DameInscripcionEquipoJuegoDeColeccion(juegoSeleccionado.id, equipoQueRegalaId)
      .subscribe(inscripcion => this.peticionesAPI.DameAlbumEquipo(cromo.id, inscripcion[0].id)
        .subscribe(album => this.peticionesAPI.BorrarAlbumEquipo(album[0].id).subscribe()));
  }


  public RegalaCromoAlumnoEquipo(cromo: Cromo, alumnoDestinatarioId: number, alumnoQueRegalaId: number, juegoSeleccionado: Juego) {
    // Es un juego en equipo pero asignación individual. Por tanto hay que quitar el cromo de los albunes de los equipos
    this.DameEquipoAlumnoEnJuegoDeColeccion(alumnoDestinatarioId, juegoSeleccionado.id)
      .subscribe(equipoDestinatorio => {
        this.DameEquipoAlumnoEnJuegoDeColeccion(alumnoQueRegalaId, juegoSeleccionado.id)
          .subscribe(equipoDeAlumnoQueRegala => {
            this.RegalaCromoEquipos(cromo, equipoDestinatorio.id, equipoDeAlumnoQueRegala.id, juegoSeleccionado);
          });
      });
  }

  public DameEquiposJuegoPuntos(juegoId: number) {
    const InformacionEquipo: MiEquipoAMostrarJuegoDePuntos[] = [];
    this.peticionesAPI.DameEquiposJuegoDePuntos(juegoId).subscribe(
      listaEquipos => {
        console.log('Equipos del Juego: ' + listaEquipos);
        for (let i = 0; i < (listaEquipos.length); i++) {
          const MiEquipo = new MiEquipoAMostrarJuegoDePuntos();
          MiEquipo.nombre = listaEquipos[i].nombre;
          MiEquipo.fotoEquipo = listaEquipos[i].fotoEquipo;
          MiEquipo.grupoId = listaEquipos[i].grupoId;
          MiEquipo.id = listaEquipos[i].id;
          this.peticionesAPI.DameInscripcionEquipoJuegoDePuntos(juegoId, MiEquipo.id).subscribe(
            EquipoDelJuego => {
              MiEquipo.puntosTotalesEquipo = EquipoDelJuego[0].PuntosTotalesEquipo;
              MiEquipo.juegoDePuntosId = EquipoDelJuego[0].juegoDePuntosId;
            });
          InformacionEquipo.push(MiEquipo);
        }
      });
    return InformacionEquipo;
  }

  //Escape room

  public añadirPersonaje(alumnoId: number, escapeRoomId: number, personaje: string) {
    this.peticionesAPI.DameAlumnoDeEscapeRoom(alumnoId, escapeRoomId)
      .subscribe(alumnoEscapeDevuelto => {
        console.log("Alumno escape devuelto: ", alumnoEscapeDevuelto);
        this.alumnoEscape = new AlumnoJuegoDeEscapeRoom(alumnoId, personaje, escapeRoomId, alumnoEscapeDevuelto[0].escenaActualId);
        this.alumnoEscape.id = alumnoEscapeDevuelto[0].id;
        console.log("Alumno eeeesc: ", this.alumnoEscape);
        this.peticionesAPI.AñadePersonaje(this.alumnoEscape)
          .subscribe(alumnoDevuelto => {
            console.log("alumnoDevuelto: ", alumnoDevuelto);
            this.sesion.TomaAlumnoEscape
            this.juegoEscape = this.sesion.DameJuegoEscapeRoom();
            this.juegoEscape.estado = true;
            console.log("This.juegoEscape: ", this.juegoEscape);
            this.peticionesAPI.ModificaEstadoEscapeRoom(this.juegoEscape).subscribe(juego => {
              console.log("juegoDevuelto: ", juego);
            });
            this.sesion.TomaJuegoEscapeRoom(this.juegoEscape);
          });
      });
  }

  public DameAlumnosJuegoDeColecciones(juegoDeColeccionId: number) {
    const alumnosObservables = new Observable(obs => {
      const Alumnos: Alumno[] = [];
      this.peticionesAPI.DameInscripcionesAlumnoJuegoDeColeccion(juegoDeColeccionId).subscribe(
        ListaAlumnosJuegoColeccion => {
          let cont = 0;
          for (let i = 0; i < (ListaAlumnosJuegoColeccion.length); i++) {
            this.peticionesAPI.DameNombreAlumnoJuegoColeccion(ListaAlumnosJuegoColeccion[i].id).subscribe(
              MiAlumno => {
                Alumnos.push(MiAlumno);
                cont++;
                if (cont === ListaAlumnosJuegoColeccion.length) {
                  // ya tengo todos los nombres
                  obs.next(Alumnos);

                }
              });
          }
        });
    });
    return alumnosObservables;
  }


  public VisualizarLosCromosDelante(listaCromos: any[]) {
    const imagenesCromo: string[] = [];
    console.log(listaCromos.length);
    for (let i = 0; i < listaCromos.length; i++) {
      if (listaCromos[i].cromo.ImagenDelante !== undefined) {
        this.https.get('http://localhost:3000/api/imagenes/ImagenCromo/download/' + listaCromos[i].cromo.ImagenDelante,
          { responseType: ResponseContentType.Blob }).subscribe(
            response => {
              const blob = new Blob([response.blob()], { type: 'image/jpg' });
              const reader = new FileReader();
              reader.addEventListener('load', () => {
                imagenesCromo[i] = reader.result.toString();
              }, false);
              if (blob) {
                reader.readAsDataURL(blob);
              }
            });
      }
    }
    console.log('he acabado el for');
    console.log(listaCromos);
    return imagenesCromo;
  }
  public VisualizarLosCromosDetras(listaCromos: any[]) {
    const imagenesCromo: string[] = [];
    console.log(listaCromos.length);
    for (let i = 0; i < (listaCromos.length); i++) {
      if (listaCromos[i].cromo.ImagenDetras !== undefined) {
        this.https.get('http://localhost:3000/api/imagenes/ImagenCromo/download/' + listaCromos[i].cromo.ImagenDetras,
          { responseType: ResponseContentType.Blob }).subscribe(
            response => {
              const blob = new Blob([response.blob()], { type: 'image/jpg' });
              const reader = new FileReader();
              reader.addEventListener('load', () => {
                imagenesCromo[i] = reader.result.toString();
              }, false);
              if (blob) {
                reader.readAsDataURL(blob);
              }
            });
      }
    }
    console.log('he acabado el for');
    console.log(listaCromos);
    return imagenesCromo;
  }


  public DameImagenCromo(cromo: any) {
    if (cromo.cromo.Imagen !== undefined) {
      this.https.get('http://localhost:3000/api/imagenes/ImagenCromo/download/' + cromo.cromo.Imagen,
        { responseType: ResponseContentType.Blob }).subscribe(
          response => {
            const blob = new Blob([response.blob()], { type: 'image/jpg' });
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              this.miImagenCromo = reader.result.toString();
            }, false);
            if (blob) {
              reader.readAsDataURL(blob);
            }
          });
    }
    return this.miImagenCromo;
  }


  public VisualizarImagenAlumno(MiImagen: string) {
    const ImagenAlumno: string[] = [];
    if (MiImagen !== undefined) {
      this.https.get('http://localhost:3000/api/imagenes/ImagenAlumno/download/' + MiImagen,
        { responseType: ResponseContentType.Blob }).subscribe(
          response => {
            const blob = new Blob([response.blob()], { type: 'image/jpg' });
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              ImagenAlumno[0] = reader.result.toString();
            }, false);
            if (blob) {
              reader.readAsDataURL(blob);
            }
          });
    }
    return ImagenAlumno;
  }


  public DameLosGruposYLosAlumnos(listaGrupos: Grupo[]): any {
    const observableGruposYAlumnos = new Observable(obs => {
      const listaGruposYAlumnos: any[] = [];
      let cont = 0;
      for (let i = 0; i < (listaGrupos.length); i++) {
        console.log(listaGrupos[i].id);
        this.peticionesAPI.DameAlumnosGrupo(listaGrupos[i].id).subscribe(
          MisAlumnos => {
            console.log(MisAlumnos);
            listaGruposYAlumnos.push({ Grupo: listaGrupos[i].descripcion, Alumnos: MisAlumnos });
            cont++;
            if (cont === listaGrupos.length) {
              obs.next(listaGruposYAlumnos);
            }
          });
      }
    });
    return observableGruposYAlumnos;
  }

  public DameLosGruposYLosEquipos(listaGrupos: Grupo[]): any {
    const observableGruposYEquipos = new Observable(obs => {
      const listaGruposYEquipos: any[] = [];
      let cont = 0;
      for (let i = 0; i < (listaGrupos.length); i++) {
        this.peticionesAPI.DameEquiposDelGrupo(listaGrupos[i].id).subscribe(
          MisEquipos => {
            listaGruposYEquipos.push({ Grupo: listaGrupos[i].descripcion, Equipo: MisEquipos });
            cont++;
            if (cont === listaGrupos.length) {
              obs.next(listaGruposYEquipos);
            }
          }
        );
      }
    });
    return observableGruposYEquipos;
  }

  public DameHistorialMisPuntos(juegoId: number, alumnoId: number): any {
    // const HistorialPuntos: any [] = [];
    const Observables = new Observable(obs => {
      const EsteAlumnoJDP: any[] = [];
      const HistorialPuntos: any[] = [];
      this.peticionesAPI.DameInscripcionAlumnoJuegoDePuntos(alumnoId, juegoId).subscribe(
        MiAlumnoJuegoDePuntos => {
          EsteAlumnoJDP.push(MiAlumnoJuegoDePuntos[0].PuntosTotalesAlumno);
          this.peticionesAPI.DamePuntosJuegoDePuntos(juegoId).subscribe(
            TipoDePuntos => {
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < TipoDePuntos.length; i++) {
                this.peticionesAPI.DameHistorialDeUnPunto(MiAlumnoJuegoDePuntos[0].id, TipoDePuntos[i].id).subscribe(
                  HistorialDeUnPunto => {
                    console.log(MiAlumnoJuegoDePuntos);
                    console.log(HistorialDeUnPunto);
                    this.puntos = 0;
                    // tslint:disable-next-line:prefer-for-of
                    for (let j = 0; j < HistorialDeUnPunto.length; j++) {
                      this.puntos = this.puntos + HistorialDeUnPunto[j].valorPunto;
                      console.log('acumulo punto' + this.puntos);
                    }
                    HistorialPuntos.push({ Nombre: TipoDePuntos[i].nombre, Puntos: this.puntos });
                  });
              }
            }
          );
        }
      );
      const MisObservables = { AlumnoJDP: EsteAlumnoJDP, Historial: HistorialPuntos };
      obs.next(MisObservables);
    });
    return Observables;
  }

  public DameHistorialPuntosMiEquipo(alumnoId: number, juegoDePuntosId: number) {
    const HistorialPuntosMiEquipo: any[] = [];
    this.peticionesAPI.DameEquipoAlumnoJuegoDePuntos(alumnoId).subscribe(
      MiEquipo => {
        this.peticionesAPI.DameInscripcionEquipoJuegoDePuntos(juegoDePuntosId, MiEquipo[0].id).subscribe(
          MiEquipoJuegoDePuntos => {
            console.log(MiEquipoJuegoDePuntos);
            this.peticionesAPI.DamePuntosJuegoDePuntos(juegoDePuntosId).subscribe(
              TipoDePuntos => {
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < TipoDePuntos.length; i++) {
                  this.peticionesAPI.DameHistorialDeUnPuntoEquipo(MiEquipoJuegoDePuntos[0].id, TipoDePuntos[i].id).subscribe(
                    HistorialDePunto => {
                      this.puntos = 0;
                      // tslint:disable-next-line:prefer-for-of
                      for (let j = 0; j < HistorialDePunto.length; j++) {
                        this.puntos = this.puntos + HistorialDePunto[j].valorPunto;
                      }
                      HistorialPuntosMiEquipo.push({ Nombre: TipoDePuntos[i].nombre, Puntos: this.puntos });
                    });
                }
              });
          });
      });
    return HistorialPuntosMiEquipo;
  }

  public PrepararTablaRankingEquipoLiga(listaEquiposOrdenadaPorPuntos: EquipoJuegoDeCompeticionLiga[],
    equiposDelJuego: Equipo[], jornadasDelJuego: Jornada[],
    enfrentamientosDelJuego: EnfrentamientoLiga[][]): TablaEquipoJuegoDeCompeticion[] {
    const rankingJuegoDeCompeticion: TablaEquipoJuegoDeCompeticion[] = [];
    console.log(' Vamos a preparar la tabla del ranking por equipos de Competición Liga');
    console.log('la lista de equipos ordenada es: ');
    console.log(listaEquiposOrdenadaPorPuntos);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < listaEquiposOrdenadaPorPuntos.length; i++) {
      let equipo: Equipo;
      const EquipoId = listaEquiposOrdenadaPorPuntos[i].equipoId;
      equipo = equiposDelJuego.filter(res => res.id === EquipoId)[0];
      rankingJuegoDeCompeticion[i] = new TablaEquipoJuegoDeCompeticion(i + 1, equipo.nombre,
        listaEquiposOrdenadaPorPuntos[i].puntosTotalesEquipo, EquipoId);
    }
    const individual = false;
    const informacionPartidos = this.ObtenerInformaciónPartidos(listaEquiposOrdenadaPorPuntos, jornadasDelJuego,
      individual, enfrentamientosDelJuego);
    console.log('Vamos a rellenar la TablaEquipoJuegoDeCompeticion con la informacionPartidos');
    const rankingJuegoDeCompeticionFinal = this.RellenarTablaEquipoJuegoDeCompeticion(rankingJuegoDeCompeticion, informacionPartidos);
    console.log('El ranking es: ');
    console.log(rankingJuegoDeCompeticionFinal);
    return rankingJuegoDeCompeticionFinal;
  }

  public RellenarTablaEquipoJuegoDeCompeticion(rankingJuegoDeCompeticion: TablaEquipoJuegoDeCompeticion[],
    informacionPartidos: InformacionPartidosLiga[]): TablaEquipoJuegoDeCompeticion[] {
    console.log();
    for (let cont = 0; cont < rankingJuegoDeCompeticion.length; cont++) {
      rankingJuegoDeCompeticion[cont].partidosTotales = informacionPartidos[cont].partidosTotales;
      rankingJuegoDeCompeticion[cont].partidosJugados = informacionPartidos[cont].partidosJugados;
      rankingJuegoDeCompeticion[cont].partidosGanados = informacionPartidos[cont].partidosGanados;
      rankingJuegoDeCompeticion[cont].partidosEmpatados = informacionPartidos[cont].partidosEmpatados;
      rankingJuegoDeCompeticion[cont].partidosPerdidos = informacionPartidos[cont].partidosPerdidos;
    }
    return rankingJuegoDeCompeticion;
  }

  public PrepararTablaRankingIndividual(listaAlumnosOrdenadaPorPuntos,
    alumnosDelJuego,
    nivelesDelJuego): any {

    const rankingJuegoDePuntos: any[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < listaAlumnosOrdenadaPorPuntos.length; i++) {
      let alumno: Alumno;
      let nivel: Nivel;
      const alumnoId = listaAlumnosOrdenadaPorPuntos[i].alumnoId;
      const nivelId = listaAlumnosOrdenadaPorPuntos[i].nivelId;
      alumno = alumnosDelJuego.filter(res => res.id === alumnoId)[0];

      if (listaAlumnosOrdenadaPorPuntos[i].nivelId !== undefined) {
        nivel = nivelesDelJuego.filter(res => res.id === nivelId)[0];
      }

      if (nivel !== undefined) {
        rankingJuegoDePuntos[i] = new TablaAlumnoJuegoDePuntos(i + 1, alumno.id, alumno.nombre, alumno.primerApellido, alumno.segundoApellido,
          listaAlumnosOrdenadaPorPuntos[i].PuntosTotalesAlumno, nivel.nombre);

      } else {
        rankingJuegoDePuntos[i] = new TablaAlumnoJuegoDePuntos(i + 1, alumno.id, alumno.nombre, alumno.primerApellido, alumno.segundoApellido,
          listaAlumnosOrdenadaPorPuntos[i].PuntosTotalesAlumno);
      }
    }

    return (rankingJuegoDePuntos);

  }


  public DameRankingPuntoSeleccionadoEquipos(
    listaEquiposOrdenadaPorPuntos: any,
    equiposDelJuego: any,
    nivelesDelJuego: any,
    puntoSeleccionadoId: any
  ): any {

    const rankingObservable = new Observable(obs => {

      let rankingEquiposJuegoDePuntos: any[] = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < listaEquiposOrdenadaPorPuntos.length; i++) {

        let equipo: Equipo;
        let nivel: Nivel;
        // Busca equipo
        equipo = equiposDelJuego.filter(res => res.id === listaEquiposOrdenadaPorPuntos[i].equipoId)[0];

        if (listaEquiposOrdenadaPorPuntos[i].nivelId !== undefined) {
          nivel = nivelesDelJuego.filter(res => res.id === listaEquiposOrdenadaPorPuntos[i].nivelId)[0];
        }

        this.peticionesAPI.DameHistorialDeUnPuntoEquipo(listaEquiposOrdenadaPorPuntos[i].id, puntoSeleccionadoId)
          .subscribe(historial => {

            let puntos = 0;
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < historial.length; j++) {
              puntos = puntos + historial[j].valorPunto;
            }


            if (nivel !== undefined) {
              rankingEquiposJuegoDePuntos[i] = new TablaEquipoJuegoDePuntos(i + 1, equipo.nombre, equipo.id,
                puntos, nivel.nombre);
            } else {
              rankingEquiposJuegoDePuntos[i] = new TablaEquipoJuegoDePuntos(i + 1, equipo.nombre, equipo.id,
                puntos);
            }

            if (i === listaEquiposOrdenadaPorPuntos.length - 1) {
              // tslint:disable-next-line:only-arrow-functions
              rankingEquiposJuegoDePuntos = rankingEquiposJuegoDePuntos.sort(function (obj1, obj2) {
                return obj2.puntos - obj1.puntos;
              });
              obs.next(rankingEquiposJuegoDePuntos);
            }
          });
      }
    });
    return rankingObservable;
  }

  public DameRankingPuntoSeleccionadoAlumnos(
    listaAlumnosOrdenadaPorPuntos: any,
    alumnosDelJuego: any,
    nivelesDelJuego: any,
    puntoSeleccionadoId: any): any {
    const rankingObservable = new Observable(obs => {

      let rankingJuegoDePuntos: any[] = [];

      console.log('Dentro ranking2 ');
      console.log('Recorremos los ' + listaAlumnosOrdenadaPorPuntos.length);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < listaAlumnosOrdenadaPorPuntos.length; i++) {
        console.log('alumno ' + i);

        let alumno: Alumno;
        let nivel: Nivel;

        // Busco al alumno
        alumno = alumnosDelJuego.filter(res => res.id === listaAlumnosOrdenadaPorPuntos[i].alumnoId)[0];
        console.log('nombre ' + alumno.nombre);

        if (listaAlumnosOrdenadaPorPuntos[i].nivelId !== undefined) {
          console.log(listaAlumnosOrdenadaPorPuntos[i].alumnoId);
          // Busco el nivel
          nivel = nivelesDelJuego.filter(res => res.id === listaAlumnosOrdenadaPorPuntos[i].nivelId)[0];
        }

        this.peticionesAPI.DameHistorialDeUnPunto(listaAlumnosOrdenadaPorPuntos[i].id, puntoSeleccionadoId)
          .subscribe(historial => {
            let puntos = 0;
            console.log(alumno.nombre + ' tieme ' + historial.length + 'asignaciones');
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < historial.length; j++) {
              puntos = puntos + historial[j].valorPunto;
            }
            console.log('Puntos ' + puntos);

            if (nivel !== undefined) {
              // tslint:disable-next-line:max-line-length
              rankingJuegoDePuntos[i] = new TablaAlumnoJuegoDePuntos(i + 1, alumno.id, alumno.nombre, alumno.primerApellido, alumno.segundoApellido,
                puntos, nivel.nombre);
            } else {
              // tslint:disable-next-line:max-line-length
              rankingJuegoDePuntos[i] = new TablaAlumnoJuegoDePuntos(i + 1, alumno.id, alumno.nombre, alumno.primerApellido, alumno.segundoApellido,
                puntos);
            }

            if (i === listaAlumnosOrdenadaPorPuntos.length - 1) {
              console.log('vamos a acabar');
              // tslint:disable-next-line:only-arrow-functions
              rankingJuegoDePuntos = rankingJuegoDePuntos.sort(function (obj1, obj2) {
                return obj2.puntos - obj1.puntos;
              });
              obs.next(rankingJuegoDePuntos);
            }

          });
      }
    });
    return rankingObservable;
  }

  // ESTA FUNCIÓN NOS DA DOS LISTA, UNA CON LOS ALUMNOS DEL GRUPO CON EQUIPO Y
  // OTRA CON LOS QUE NO TIENEN EQUIPO
  public DameListasAlumnosConYSinEquipo(equipo: Equipo, alumnosGrupo: Alumno[]): any {
    const listasObservables = new Observable(obs => {
      this.peticionesAPI.DameAsignacionesEquipoDelGrupo(equipo.grupoId)
        .subscribe(asignaciones => {
          console.log('Asignaciones equipo ' + equipo.id);
          console.log(asignaciones);
          let asignacionesEquipo: any[];
          const alumnosConEquipo: Alumno[] = [];
          const alumnosSinEquipo: Alumno[] = [];

          if (asignaciones[0] !== undefined) {
            // cuando recibimos las asignaciones las metemos en su lista
            asignacionesEquipo = asignaciones;
          }
          console.log('Alumnos del grupo: ' + alumnosGrupo);
          // Ahora preparamos dos listas, una de alumnos con equipo y otra de alumnos sin equipo
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < alumnosGrupo.length; i++) {

            // PRIMERO MIRAMOS SI HAY ALGUNA ASIGNACIÓN HECHA EN ESTE GRUPO O NO. SI NO HAY NINGUNA ASIGNACIÓN A NINGÚN EQUIPO HECHA
            // SIGNIFICA QUE TODOS LOS ALUMNOS DEL GRUPO PUEDEN METERSE EN CUALQUIER EQUIPO. SERÍA ILÓGICO BUSCAR EN ALGO VACÍO
            if (asignacionesEquipo != null) {
              // EN CASO DE TENER ASIGNADO UN EQUIPO (TRUE) LO INCLUIMOS EN LA LISTA DE ALUMNOS CON EQUIPO
              if (asignacionesEquipo.filter(res => res.alumnoId === alumnosGrupo[i].id)[0] !== undefined) {
                alumnosConEquipo.push(alumnosGrupo[i]);
                // SI NO ESTA ASIGNADO TODAVIDA A NINGÚN EQUIPO, LO PONEMOS EN LA LISTA DE ALUMNOS SIN EQUIPO
              } else {
                alumnosSinEquipo.push(alumnosGrupo[i]);
              }
              // SI NO HAY NINGUNA ASIGNACIÓN HECHA SIGNIFICA QUE TODOS LOS ALUMNOS DEL GRUPO ESTAN SIN EQUIPO
            } else {
              alumnosSinEquipo.push(alumnosGrupo[i]);
            }
          }
          const resultado = { con: alumnosConEquipo, sin: alumnosSinEquipo };
          obs.next(resultado);
        });
    });
    console.log('Id Equipo ' + equipo.id);
    return listasObservables;
  }


  public DameSiguienteNivel(nivelesDelJuego: Nivel[], nivel: Nivel): Nivel {
    // Retorna el nivel siguiente al que me dan, o undefined si el que me dan es el máximo
    const pos = nivelesDelJuego.indexOf(nivel);
    if (pos === nivelesDelJuego.length - 1) {
      return undefined;
    } else {
      return nivelesDelJuego[pos + 1];
    }
  }

  private DameNivelId(nivelesDelJuego: Nivel[], puntos: number): number {
    let i = 0;
    let encontrado = false;
    while ((i < nivelesDelJuego.length) && !encontrado) {
      if (nivelesDelJuego[i].puntosAlcanzar > puntos) {
        encontrado = true;
        console.log('encontrado');
      } else {
        i = i + 1;
      }
    }
    if (!encontrado) {
      console.log('no encontrado');
      // Tiene el nivel máximo
      return nivelesDelJuego[nivelesDelJuego.length - 1].id;
    } else if (i > 0) {
      return nivelesDelJuego[i - 1].id;
    } else {
      return undefined;
    }
  }

  // // Me da la posición que ocupa en el vector de niveles
  // private DameNivelPos( nivelesDelJuego: Nivel[], puntos: number): number {
  //   let i = 0;
  //   let encontrado = false;
  //   while ((i < nivelesDelJuego.length) && !encontrado) {
  //     if (nivelesDelJuego[i].PuntosAlcanzar > puntos) {
  //           encontrado = true;
  //           console.log ('encontrado');
  //     } else {
  //           i = i + 1;
  //     }
  //   }
  //   if (!encontrado) {
  //     console.log ('no encontrado');
  //     // Tiene el nivel máximo
  //     return nivelesDelJuego.length - 1;
  //   } else if (i > 0) {
  //     return i - 1;
  //   } else {
  //     return undefined;
  //   }
  // }


  public BorrarPunto(punto: TablaHistorialPuntosAlumno, alumnoJuegoDePuntos: any,
    nivelesDelJuego: Nivel[]) {

    alumnoJuegoDePuntos.PuntosTotalesAlumno = alumnoJuegoDePuntos.PuntosTotalesAlumno - punto.valorPunto;
    if (nivelesDelJuego !== undefined) {
      // calculamos el nuevo nivel
      console.log('calculo nuevo nivel ');
      const nivelId = this.DameNivelId(nivelesDelJuego, alumnoJuegoDePuntos.PuntosTotalesAlumno);
      alumnoJuegoDePuntos.nivelId = nivelId;
    }
    this.peticionesAPI.PonPuntosJuegoDePuntos(alumnoJuegoDePuntos, alumnoJuegoDePuntos.id).
      subscribe();
    this.peticionesAPI.BorrarPuntosAlumno(punto.historialId).subscribe();
  }

  //  console.log ('EN calculos ' + alumnoSeleccionado.id);
  //  console.log ('EN calculos ' + alumnoJuegoDePuntos);
  //  const resultadoObservable = new Observable ( obs => {

  //   console.log(punto);
  //   this.peticionesAPI.BorrarPuntosAlumno(punto.historialId).subscribe();

  //   // Buscamos los nuevos puntos
  //   let nuevosPuntos: number;
  //   nuevosPuntos = (Number(alumnoJuegoDePuntos.PuntosTotalesAlumno) - Number(punto.valorPunto));
  //   console.log(nuevosPuntos);
  //   alumnoJuegoDePuntos.PuntosTotalesAlumno = nuevosPuntos;
  //   console.log('Borro los puntos y miro que puntos totales tengo');

  //   // Comprobamos si subimos de nivel o no
  //   // tslint:disable-next-line:curly
  //   if (nivel !== undefined) {
  //     if (nuevosPuntos < nivel.PuntosAlcanzar) {
  //       if (nivel !== undefined) {
  //         console.log('Voy a bajar de nivel');
  //         siguienteNivel = nivel;
  //         nivel = this.DameNivelAnterior(nivelesDelJuego, nivel.id);
  //       }

  //     } else {
  //       console.log('mantengo el nivel');
  //     }
  //   }
  //   console.log ('EN calculos ' + alumnoJuegoDePuntos);

  //   console.log('Voy a editar la base de datos y actualizar la tabla');
  //   if (nivel !== undefined) {
  //     this.peticionesAPI.PonPuntosJuegoDePuntos( new AlumnoJuegoDePuntos(alumnoSeleccionado.id, juegoSeleccionado.id,
  //       nuevosPuntos, nivel.id), alumnoJuegoDePuntos.id).subscribe(res => {
  //         console.log(res);
  //        // alumnoJuegoDePuntos = res;
  //         console.log ('EN calculos 1 ' + alumnoJuegoDePuntos);
  //         const resultado = {alumno: alumnoJuegoDePuntos, n: nivel, sn: siguienteNivel};
  //         obs.next (resultado);
  //    //     this.MostrarHistorialSeleccionado();
  //       });
  //   } else {
  //     this.peticionesAPI.PonPuntosJuegoDePuntos( new AlumnoJuegoDePuntos(alumnoSeleccionado.id, juegoSeleccionado.id,
  //       nuevosPuntos), alumnoJuegoDePuntos.id).subscribe(res => {
  //         console.log(res);
  //         console.log ('EN calculos 2 ' + alumnoJuegoDePuntos);
  //         const resultado = {alumno: alumnoJuegoDePuntos, n: nivel, sn: siguienteNivel};
  //         obs.next (resultado);
  //         //MostrarHistorialSeleccionado();
  //       });
  //   }
  //  });
  //  return resultadoObservable;

  // }

  public BorrarPuntoEquipo(punto: TablaHistorialPuntosEquipo, equipoJuegoDePuntos: any,
    nivelesDelJuego: Nivel[]) {

    equipoJuegoDePuntos.PuntosTotalesEquipo = equipoJuegoDePuntos.PuntosTotalesEquipo - punto.valorPunto;
    if (nivelesDelJuego !== undefined) {
      // calculamos el nuevo nivel
      console.log('calculo nuevo nivel ');
      const nivelId = this.DameNivelId(nivelesDelJuego, equipoJuegoDePuntos.PuntosTotalesEquipo);
      equipoJuegoDePuntos.nivelId = nivelId;
    }
    this.peticionesAPI.PonPuntosEquiposJuegoDePuntos(equipoJuegoDePuntos, equipoJuegoDePuntos.id).
      subscribe();
    this.peticionesAPI.BorraPuntosEquipo(punto.historialId).subscribe();
  }

  // public BorrarPuntoEquipo2(
  //     equipoJuegoDePuntos: any,
  //     punto: TablaHistorialPuntosEquipo,
  //     nivel: any,
  //     siguienteNivel: any,
  //     juegoSeleccionado: any,
  //     equipoSeleccionado: any,
  //     nivelesDelJuego: any,
  //     ): any {
  //   const resultadoObservable = new Observable ( obs => {

  //     console.log(punto);

  //     // Buscamos los nuevos puntos
  //     let nuevosPuntos: number;
  //     nuevosPuntos = (Number(equipoJuegoDePuntos.PuntosTotalesEquipo) - Number(punto.valorPunto));
  //     console.log(nuevosPuntos);
  //     equipoJuegoDePuntos.PuntosTotalesEquipo = nuevosPuntos;

  //     this.peticionesAPI.BorraPuntosEquipo(punto.historialId).subscribe();



  //     console.log('Borro los puntos y miro que puntos totales tengo');

  //     // Comprobamos si subimos de nivel o no
  //     // tslint:disable-next-line:curly
  //     if (nivel !== undefined) {
  //       if (nuevosPuntos < nivel.PuntosAlcanzar) {
  //         if (nivel !== undefined) {
  //           console.log('Voy a bajar de nivel');
  //           siguienteNivel = nivel;
  //           nivel = this.DameNivelAnterior(nivelesDelJuego, nivel.id);
  //         }

  //       } else {
  //         console.log('mantengo el nivel');
  //       }
  //     }

  //     console.log('Voy a editar la base de datos y actualizar la tabla');
  //     if (nivel !== undefined) {
  //       this.peticionesAPI.PonPuntosEquiposJuegoDePuntos( new EquipoJuegoDePuntos(equipoSeleccionado.id,
  //         juegoSeleccionado.id, nuevosPuntos, nivel.id), equipoJuegoDePuntos.id).subscribe(res => {
  //           console.log(res);
  //           const resultado = {equipo: res, n: nivel, sn: siguienteNivel};
  //           obs.next (resultado);

  //         });
  //     } else {
  //       this.peticionesAPI.PonPuntosEquiposJuegoDePuntos( new EquipoJuegoDePuntos(equipoSeleccionado.id,
  //         juegoSeleccionado.id, nuevosPuntos), equipoJuegoDePuntos.id).subscribe(res => {
  //           console.log(res);
  //           const resultado = {equipo: res, n: nivel, sn: siguienteNivel};
  //           obs.next (resultado);
  //         });
  //     }
  //   });
  //   return resultadoObservable;

  // }



  // public DameNivelAnteriorRRRRRRR(nivelesDelJuego: any, nivelId: number): Nivel {

  //   // tslint:disable-next-line:no-inferrable-types
  //   let encontrado: boolean = false;
  //   let i = 0;
  //   while ((i < nivelesDelJuego.length) && (encontrado === false)) {

  //     if (nivelesDelJuego[i].id === nivelId) {
  //       encontrado = true;
  //     }
  //     i = i + 1;
  //   }
  //   if (i >= 2) {
  //     return nivelesDelJuego[i - 2];
  //     console.log('punto plata o mas');
  //   } else {
  //     return undefined;
  //     console.log('punto bronce');
  //   }

  // }
  // public PorcentajeEquipo(

  //   nivel: any,
  //   equipoJuegoDePuntos: any,
  //   nivelesDelJuego: any,
  //   siguienteNivel

  // ): number {

  //   let porcentaje: number;
  //   if (nivel !== undefined) {
  //     // Si no estoy en el útlimo nivel, busco el porcentaje. Sino el porcentaje es 1.
  //     if (equipoJuegoDePuntos.nivelId !== nivelesDelJuego[nivelesDelJuego.length - 1].id) {
  //       porcentaje = (equipoJuegoDePuntos.PuntosTotalesEquipo - nivel.PuntosAlcanzar) /
  //       (siguienteNivel.PuntosAlcanzar - nivel.PuntosAlcanzar);

  //     } else {
  //       porcentaje = 1;
  //     }

  //   } else {
  //     porcentaje = (equipoJuegoDePuntos.PuntosTotalesEquipo - 0) / (siguienteNivel.PuntosAlcanzar - 0);
  //   }

  //   return porcentaje;
  // }

  // public Porcentaje(nivel: any, siguienteNivel: any, alumnoJuegoDePuntos: any, nivelesDelJuego: any): number {

  //   let porcentaje: number;

  //   if (nivel !== undefined) {
  //     // Si no estoy en el útlimo nivel, busco el porcentaje. Sino el porcentaje es 1.
  //     if (alumnoJuegoDePuntos.nivelId !== nivelesDelJuego[nivelesDelJuego.length - 1].id) {
  //       porcentaje = (alumnoJuegoDePuntos.PuntosTotalesAlumno - nivel.PuntosAlcanzar) /
  //       (siguienteNivel.PuntosAlcanzar - nivel.PuntosAlcanzar);
  //       console.log('no estoy en el ultimo nivel');

  //     } else {
  //       porcentaje = 1;
  //     }

  //   } else {
  //     console.log('El sigueinte nivel es el primero');

  //     porcentaje = (alumnoJuegoDePuntos.PuntosTotalesAlumno - 0) / (siguienteNivel.PuntosAlcanzar - 0);
  //   }

  //   return porcentaje;
  // }

  // ESTA FUNCION DEVUELVE DOS LISTAS
  // NO ME GUSTA PORQUE LA DE RANKING INDIVIDUAL DEVUELVE SOLO UNA
  // HAY QUE PENSAR COMO SIMPLIFICAR ESTO DE LAS LISTAS Y LOS RANKINGS
  public PrepararTablaRankingEquipos(
    listaEquiposOrdenadaPorPuntos: any,
    equiposDelJuego: any,
    nivelesDelJuego: any,

  ): any {
    const rankingEquiposJuegoDePuntos: any[] = [];
    // const rankingEquiposJuegoDePuntosTotal: any [] = [];
    for (let i = 0; i < listaEquiposOrdenadaPorPuntos.length; i++) {
      console.log('Bucle principal');
      let equipo: Equipo;
      let nivel: Nivel;
      equipo = equiposDelJuego.filter(res => res.id === listaEquiposOrdenadaPorPuntos[i].equipoId)[0];

      if (listaEquiposOrdenadaPorPuntos[i].nivelId !== undefined) {
        console.log(listaEquiposOrdenadaPorPuntos[i].equipoId);
        nivel = nivelesDelJuego.filter(res => res.id === listaEquiposOrdenadaPorPuntos[i].nivelId)[0];
        console.log(listaEquiposOrdenadaPorPuntos[i].nivelId);
      }

      if (nivel !== undefined) {
        rankingEquiposJuegoDePuntos[i] = new TablaEquipoJuegoDePuntos(i + 1, equipo.nombre, equipo.id,
          listaEquiposOrdenadaPorPuntos[i].PuntosTotalesEquipo, nivel.nombre);

        // rankingEquiposJuegoDePuntosTotal[i] = new TablaEquipoJuegoDePuntos (i + 1, equipo.Nombre, equipo.id,
        //     listaEquiposOrdenadaPorPuntos[i].PuntosTotalesEquipo, nivel.Nombre);
      } else {
        rankingEquiposJuegoDePuntos[i] = new TablaEquipoJuegoDePuntos(i + 1, equipo.nombre, equipo.id,
          listaEquiposOrdenadaPorPuntos[i].PuntosTotalesEquipo);

        // rankingEquiposJuegoDePuntosTotal[i] = new TablaEquipoJuegoDePuntos (i + 1, equipo.Nombre, equipo.id,
        //     listaEquiposOrdenadaPorPuntos[i].PuntosTotalesEquipo);
      }
    }

    // const resultado = {
    //                       ranking: rankingEquiposJuegoDePuntos,
    //                       rankingTotal: rankingEquiposJuegoDePuntosTotal
    // };
    return rankingEquiposJuegoDePuntos;
  }


  public AsignarPuntosAlumno(
    alumno: AlumnoJuegoDePuntos,
    nivelesDelJuego: Nivel[],
    puntosNuevos: any,
    puntoSeleccionadoId: any,
  ) {

    alumno.puntosTotalesAlumno = alumno.puntosTotalesAlumno + puntosNuevos;
    if (nivelesDelJuego !== undefined) {
      const nivelId = this.DameNivelId(nivelesDelJuego, alumno.puntosTotalesAlumno);
      alumno.nivelId = nivelId;
    }
    this.peticionesAPI.PonPuntosJuegoDePuntos(alumno, alumno.id).
      subscribe();
    const fechaAsignacionPunto = new Date();
    const fechaString = fechaAsignacionPunto.toLocaleDateString() + '  ' + fechaAsignacionPunto.toLocaleTimeString();
    // tslint:disable-next-line:max-line-length
    this.peticionesAPI.PonHistorialPuntosAlumno(new HistorialPuntosAlumno(puntosNuevos, puntoSeleccionadoId, alumno.id, fechaString))
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe(res => console.log(res));
  }


  public AsignarPuntosEquipo(
    equipo: EquipoJuegoDePuntos,
    nivelesDelJuego: Nivel[],
    puntosNuevos: any,
    puntoSeleccionadoId: any,
  ) {

    equipo.puntosTotalesEquipo = equipo.puntosTotalesEquipo + puntosNuevos;
    if (nivelesDelJuego !== undefined) {
      const nivelId = this.DameNivelId(nivelesDelJuego, equipo.puntosTotalesEquipo);
      equipo.nivelId = nivelId;
    }
    this.peticionesAPI.PonPuntosEquiposJuegoDePuntos(equipo, equipo.id).
      subscribe();
    const fechaAsignacionPunto = new Date();
    const fechaString = fechaAsignacionPunto.toLocaleDateString() + '  ' + fechaAsignacionPunto.toLocaleTimeString();
    // tslint:disable-next-line:max-line-length
    this.peticionesAPI.PonHistorialPuntosEquipo(new HistorialPuntosEquipo(puntosNuevos, puntoSeleccionadoId, equipo.id, fechaString))
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe(res => console.log(res));
  }


  public PreparaHistorialEquipo(equipoJuegoDePuntos: any, tiposPuntosDelJuego: any,):
    any {
    const historialObservable = new Observable(obs => {

      let historial = [];

      this.peticionesAPI.DameHistorialPuntosEquipo(equipoJuegoDePuntos.id)
        .subscribe(his => {

          if (his[0] !== null) {
            for (let i = 0; i < his.length; i++) {
              console.log('voy ' + i);
              const punto = tiposPuntosDelJuego.filter(res => res.id === his[i].puntoId)[0];

              historial[i] = new TablaHistorialPuntosEquipo(punto.Nombre,
                punto.Descripcion, his[i].valorPunto, his[i].fecha,
                his[i].equipoJuegoDePuntosId, his[i].id, his[i].puntoId);
            }
          } else {
            historial = undefined;
          }
          historial = historial.filter(res => res.nombre !== '');
          obs.next(historial);
        });
    });
    return historialObservable;
  }

  public PreparaHistorialAlumno(alumnoJuegoDePuntos: any, tiposPuntosDelJuego: any,):
    any {
    const historialObservable = new Observable(obs => {

      let historial = [];

      this.peticionesAPI.DameHistorialPuntosAlumno(alumnoJuegoDePuntos.id)
        .subscribe(his => {

          if (his[0] !== null) {
            for (let i = 0; i < his.length; i++) {
              console.log('voy ' + i);
              const punto = tiposPuntosDelJuego.filter(res => res.id === his[i].puntoId)[0];

              historial[i] = new TablaHistorialPuntosAlumno(punto.Nombre,
                punto.Descripcion, his[i].valorPunto, his[i].fecha,
                his[i].alumnoJuegoDePuntosId, his[i].id, his[i].puntoId);
            }
          } else {
            historial = undefined;
          }
          historial = historial.filter(res => res.nombre !== '');
          obs.next(historial);
        });
    });
    return historialObservable;
  }

  public Prueba(profesorId): any {
    const gruposObservable = new Observable(obs => {
      this.peticionesAPI.DameGruposProfesor(profesorId)
        .subscribe(res => {
          if (res[0] !== undefined) {
            obs.next(res.slice(0, 2));
          } else {
            obs.next(undefined);
          }
        });
    });
    return gruposObservable;
  }


  private randomIndex(
    probabilities: number[],
    randomGenerator: () => number = Math.random): number {

    // get the cumulative distribution function
    let acc = 0;
    const cdf = probabilities
      .map(v => acc += v) // running total [4,7,9,10]
      .map(v => v / acc); // normalize to max 1 [0.4,0.7,0.9,1]

    // pick a random number between 0 and 1
    const randomNumber = randomGenerator();

    // find the first index of cdf where it exceeds randomNumber
    // (findIndex() is in ES2015+)
    return cdf.findIndex(p => randomNumber < p);
  }

  public AsignarCromosAleatoriosAlumno(
    alumno: Alumno,
    inscripcionesAlumnos: any,
    numeroCromosRandom: number,
    probabilidadCromos: any,
    cromosColeccion: any,

  ) {
    let alumnoJuegoDeColeccion: AlumnoJuegoDeColeccion;
    alumnoJuegoDeColeccion = inscripcionesAlumnos.filter(res => res.alumnoId === alumno.id)[0];
    console.log(alumnoJuegoDeColeccion);

    // tslint:disable-next-line:prefer-const
    // let hits = this.probabilidadCromos.map(x => 0);


    for (let k = 0; k < numeroCromosRandom; k++) {

      console.log('Voy a hacer el post del cromo ' + k);

      const indexCromo = this.randomIndex(probabilidadCromos);
      // hits[this.indexCromo]++;


      this.peticionesAPI.AsignarCromoAlumno(new Album(alumnoJuegoDeColeccion.id,
        cromosColeccion[indexCromo].id)).subscribe(res => {

          // this.selection.clear();
          // this.selectionEquipos.clear();
          // this.isDisabled = true;
          // this.seleccionados = Array(this.alumnosDelJuego.length).fill(false);
        });
    }

  }

  public AsignarCromosAleatoriosEquipo(
    equipo: Equipo,
    inscripcionesEquipos: any,
    numeroCromosRandom: number,
    probabilidadCromos: any,
    cromosColeccion: any
  ) {
    let equipoJuegoDeColeccion: EquipoJuegoDeColeccion;
    equipoJuegoDeColeccion = inscripcionesEquipos.filter(res => res.equipoId === equipo.id)[0];
    console.log(equipoJuegoDeColeccion);

    for (let k = 0; k < numeroCromosRandom; k++) {

      console.log('Voy a hacer el post del cromo ' + k);

      const indexCromo = this.randomIndex(probabilidadCromos);

      this.peticionesAPI.AsignarCromoEquipo(new AlbumEquipo(equipoJuegoDeColeccion.id,
        cromosColeccion[indexCromo].id)).subscribe(res => {

          console.log(res);

        });
    }

  }

  // Esta función recibe una lista de cromos en la que puede haber repetidos
  // y geneera otra en la que cada cromo aparece una sola vez y se le asocia el número
  // de veces que aparece reperido en la lista de entrada
  GeneraListaSinRepetidos(listaCromos: Cromo[]): any[] {
    const listaCromosSinRepetidos: any[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < listaCromos.length; i++) {
      const n = listaCromos.filter(cromo => cromo.nombre === listaCromos[i].nombre).length;
      if (listaCromosSinRepetidos.filter(res => res.cromo.Nombre === listaCromos[i].nombre).length === 0) {
        listaCromosSinRepetidos.push({ rep: n, cromo: listaCromos[i] });
      }
    }
    return listaCromosSinRepetidos;
  }

  DameCromosQueNoTengo(MisCromos: Cromo[], TodosLosCromos: Cromo[]): any[] {
    const CromosQueNoTengo: any[] = [];
    // tslint:disable-next-line:no-shadowed-variable
    let Cromo: Cromo;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < TodosLosCromos.length; i++) {
      Cromo = MisCromos.filter(res => res.id === TodosLosCromos[i].id)[0];
      if (Cromo === undefined) {
        CromosQueNoTengo.push({ rep: 0, cromo: TodosLosCromos[i] });
      }
    }
    return CromosQueNoTengo;
  }

  /* competicion liga */

  public PrepararTablaRankingIndividualLigaMiAlumno(listaAlumnosOrdenadaPorPuntos: AlumnoJuegoDeCompeticionLiga[],
    alumnosDelJuego: Alumno[], jornadasDelJuego: Jornada[],
    enfrentamientosDelJuego: EnfrentamientoLiga[][], miAlumnoid: number): TablaAlumnoJuegoDeCompeticion[] {
    const rankingJuegoDeCompeticion: TablaAlumnoJuegoDeCompeticion[] = [];
    let informacionAlumno: TablaAlumnoJuegoDeCompeticion[];
    console.log(' Vamos a preparar la tabla del ranking individual de Competición Liga');
    console.log('la lista de alumnos ordenada es: ');
    console.log(listaAlumnosOrdenadaPorPuntos);
    // tslint:disable-next-line:prefer-for-oF
    for (let i = 0; i < listaAlumnosOrdenadaPorPuntos.length; i++) {
      let alumno: Alumno;
      const alumnoId = listaAlumnosOrdenadaPorPuntos[i].alumnoId;
      alumno = alumnosDelJuego.filter(res => res.id === alumnoId)[0];
      rankingJuegoDeCompeticion[i] = new TablaAlumnoJuegoDeCompeticion(i + 1, alumno.nombre, alumno.primerApellido, alumno.segundoApellido,
        listaAlumnosOrdenadaPorPuntos[i].puntosTotalesAlumno, alumnoId);
    }
    const individual = true;
    const informacionPartidos = this.ObtenerInformaciónPartidos(listaAlumnosOrdenadaPorPuntos, jornadasDelJuego,
      individual, enfrentamientosDelJuego);
    console.log('Vamos a rellenar la TablaEquipoJuegoDeCompeticion con la informacionPartidos');
    const rankingJuegoDeCompeticionFinal = this.RellenarTablaAlumnoJuegoDeCompeticion(rankingJuegoDeCompeticion, informacionPartidos);
    for (let i = 0; i < rankingJuegoDeCompeticionFinal.length; i++) {
      if (rankingJuegoDeCompeticionFinal[i].id === miAlumnoid) {
        informacionAlumno[0] = rankingJuegoDeCompeticionFinal[i];
      }
    }
    console.log('El ranking de tu alumno es: ');
    console.log(informacionAlumno);
    return informacionAlumno;
  }

  public PrepararTablaRankingIndividualLiga(listaAlumnosOrdenadaPorPuntos: AlumnoJuegoDeCompeticionLiga[],
    alumnosDelJuego: Alumno[], jornadasDelJuego: Jornada[],
    enfrentamientosDelJuego: EnfrentamientoLiga[][]): TablaAlumnoJuegoDeCompeticion[] {
    const rankingJuegoDeCompeticion: TablaAlumnoJuegoDeCompeticion[] = [];
    console.log(' Vamos a preparar la tabla del ranking individual de Competición Liga');
    console.log('la lista de alumnos ordenada es: ');
    console.log(listaAlumnosOrdenadaPorPuntos);
    // tslint:disable-next-line:prefer-for-oF
    for (let i = 0; i < listaAlumnosOrdenadaPorPuntos.length; i++) {
      let alumno: Alumno;
      const alumnoId = listaAlumnosOrdenadaPorPuntos[i].alumnoId;
      alumno = alumnosDelJuego.filter(res => res.id === alumnoId)[0];
      rankingJuegoDeCompeticion[i] = new TablaAlumnoJuegoDeCompeticion(i + 1, alumno.nombre, alumno.primerApellido, alumno.segundoApellido,
        listaAlumnosOrdenadaPorPuntos[i].puntosTotalesAlumno, alumnoId);
    }
    const individual = true;
    const informacionPartidos = this.ObtenerInformaciónPartidos(listaAlumnosOrdenadaPorPuntos, jornadasDelJuego,
      individual, enfrentamientosDelJuego);
    console.log('Vamos a rellenar la TablaEquipoJuegoDeCompeticion con la informacionPartidos');
    const rankingJuegoDeCompeticionFinal = this.RellenarTablaAlumnoJuegoDeCompeticion(rankingJuegoDeCompeticion, informacionPartidos);
    console.log('El ranking es: ');
    console.log(rankingJuegoDeCompeticionFinal);
    return rankingJuegoDeCompeticionFinal;
  }

  public RellenarTablaAlumnoJuegoDeCompeticion(rankingJuegoDeCompeticion: TablaAlumnoJuegoDeCompeticion[],
    informacionPartidos: InformacionPartidosLiga[]): TablaAlumnoJuegoDeCompeticion[] {
    for (let cont = 0; cont < rankingJuegoDeCompeticion.length; cont++) {
      rankingJuegoDeCompeticion[cont].partidosTotales = informacionPartidos[cont].partidosTotales;
      rankingJuegoDeCompeticion[cont].partidosJugados = informacionPartidos[cont].partidosJugados;
      rankingJuegoDeCompeticion[cont].partidosGanados = informacionPartidos[cont].partidosGanados;
      rankingJuegoDeCompeticion[cont].partidosEmpatados = informacionPartidos[cont].partidosEmpatados;
      rankingJuegoDeCompeticion[cont].partidosPerdidos = informacionPartidos[cont].partidosPerdidos;
    }
    console.log('----------------------------------');
    console.log(rankingJuegoDeCompeticion);
    return rankingJuegoDeCompeticion;
  }

  public ObtenerInformaciónPartidos(listaParticipantesOrdenadaPorPuntos, jornadasDelJuego: Jornada[], individual: boolean,
    enfrentamientosDelJuego: Array<Array<EnfrentamientoLiga>>): InformacionPartidosLiga[] {
    this.informacionPartidos = [];
    console.log('Estoy en ObtenerInformacionPartidos()');
    const listaInformacionPartidos: InformacionPartidosLiga[] = [];
    const listaEnfrentamientosDelJuego: EnfrentamientoLiga[] = this.ObtenerListaEnfrentamientosDelJuego(jornadasDelJuego,
      enfrentamientosDelJuego);
    if (individual === false) {
      // tslint:disable-next-line:prefer-for-of
      for (let equipo = 0; equipo < listaParticipantesOrdenadaPorPuntos.length; equipo++) {
        const informacionPartido = new InformacionPartidosLiga(listaParticipantesOrdenadaPorPuntos[equipo].EquipoId, 0, 0, 0, 0, 0);
        console.log(informacionPartido);
        informacionPartido.partidosTotales = this.CalcularPartidosTotales(listaEnfrentamientosDelJuego,
          listaParticipantesOrdenadaPorPuntos, equipo, individual);
        informacionPartido.partidosJugados = this.CalcularPartidosJugados(listaEnfrentamientosDelJuego,
          listaParticipantesOrdenadaPorPuntos, equipo, individual);
        informacionPartido.partidosGanados = this.CalcularPartidosGanados(listaEnfrentamientosDelJuego,
          listaParticipantesOrdenadaPorPuntos, equipo, individual);
        informacionPartido.partidosEmpatados = this.CalcularPartidosEmpatados(listaEnfrentamientosDelJuego,
          listaParticipantesOrdenadaPorPuntos, equipo, individual);
        informacionPartido.partidosPerdidos = this.CalcularPartidosPerdidos(listaEnfrentamientosDelJuego,
          listaParticipantesOrdenadaPorPuntos, equipo, individual);
        listaInformacionPartidos.push(informacionPartido);
        console.log('Partidos perdidos del participante id ' + listaParticipantesOrdenadaPorPuntos[equipo].EquipoId + 'son: '
          + informacionPartido.partidosPerdidos);
      }
    } else if (individual === true) {
      // tslint:disable-next-line:prefer-for-of
      for (let alumno = 0; alumno < listaParticipantesOrdenadaPorPuntos.length; alumno++) {
        const informacionPartido = new InformacionPartidosLiga(listaParticipantesOrdenadaPorPuntos[alumno].AlumnoId, 0, 0, 0, 0, 0);
        console.log(informacionPartido);
        informacionPartido.partidosTotales = this.CalcularPartidosTotales(listaEnfrentamientosDelJuego,
          listaParticipantesOrdenadaPorPuntos, alumno, individual);
        informacionPartido.partidosJugados = this.CalcularPartidosJugados(listaEnfrentamientosDelJuego,
          listaParticipantesOrdenadaPorPuntos, alumno, individual);
        informacionPartido.partidosGanados = this.CalcularPartidosGanados(listaEnfrentamientosDelJuego,
          listaParticipantesOrdenadaPorPuntos, alumno, individual);
        informacionPartido.partidosEmpatados = this.CalcularPartidosEmpatados(listaEnfrentamientosDelJuego,
          listaParticipantesOrdenadaPorPuntos, alumno, individual);
        informacionPartido.partidosPerdidos = this.CalcularPartidosPerdidos(listaEnfrentamientosDelJuego,
          listaParticipantesOrdenadaPorPuntos, alumno, individual);
        listaInformacionPartidos.push(informacionPartido);
        console.log('Partidos perdidos del participante id ' + listaParticipantesOrdenadaPorPuntos[alumno].AlumnoId + 'son: '
          + informacionPartido.partidosPerdidos);
      }
    }
    console.log('La listaInformacionPartidos es: ');
    console.log(listaInformacionPartidos);
    return listaInformacionPartidos;
  }

  public ObtenerListaEnfrentamientosDelJuego(jornadasDelJuego: Jornada[], enfrentamientosDelJuego: EnfrentamientoLiga[][]) {
    const listaEnfrentamientosDelJuego: EnfrentamientoLiga[] = [];
    for (let jornada = 0; jornada < jornadasDelJuego.length; jornada++) {
      // tslint:disable-next-line:prefer-for-of
      for (let enfrentamiento = 0; enfrentamiento < enfrentamientosDelJuego[jornada].length; enfrentamiento++) {
        listaEnfrentamientosDelJuego.push(enfrentamientosDelJuego[jornada][enfrentamiento]);
      }
    }
    console.log('La lista de enfrentamientos del juego es: ');
    console.log(listaEnfrentamientosDelJuego);
    return listaEnfrentamientosDelJuego;
  }

  public CalcularPartidosTotales(listaEnfrentamientosDelJuego: EnfrentamientoLiga[],
    listaParticipantesOrdenadaPorPuntos, participante: number, individual): number {
    let partidosTotales = 0;
    if (individual === false) {
      // tslint:disable-next-line:prefer-for-of
      for (let contEnfrentamiento = 0; contEnfrentamiento < listaEnfrentamientosDelJuego.length; contEnfrentamiento++) {
        if (listaParticipantesOrdenadaPorPuntos[participante].EquipoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorUno ||
          listaParticipantesOrdenadaPorPuntos[participante].EquipoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorDos) {
          partidosTotales++;
        }
      }
    } else if (individual === true) {
      // tslint:disable-next-line:prefer-for-of
      for (let contEnfrentamiento = 0; contEnfrentamiento < listaEnfrentamientosDelJuego.length; contEnfrentamiento++) {
        if (listaParticipantesOrdenadaPorPuntos[participante].AlumnoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorUno ||
          listaParticipantesOrdenadaPorPuntos[participante].AlumnoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorDos) {
          partidosTotales++;
        }
      }
    }
    return partidosTotales;
  }

  public CalcularPartidosJugados(listaEnfrentamientosDelJuego: EnfrentamientoLiga[],
    listaParticipantesOrdenadaPorPuntos, participante: number, individual): number {
    let partidosJugados = 0;
    if (individual === false) {
      // tslint:disable-next-line:prefer-for-of
      for (let contEnfrentamiento = 0; contEnfrentamiento < listaEnfrentamientosDelJuego.length; contEnfrentamiento++) {
        if (listaParticipantesOrdenadaPorPuntos[participante].EquipoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorUno ||
          listaParticipantesOrdenadaPorPuntos[participante].EquipoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorDos) {

          if (listaEnfrentamientosDelJuego[contEnfrentamiento].ganador !== undefined) {
            partidosJugados++;
          }
        }
      }
    } else if (individual === true) {
      // tslint:disable-next-line:prefer-for-of
      for (let contEnfrentamiento = 0; contEnfrentamiento < listaEnfrentamientosDelJuego.length; contEnfrentamiento++) {
        if (listaParticipantesOrdenadaPorPuntos[participante].AlumnoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorUno ||
          listaParticipantesOrdenadaPorPuntos[participante].AlumnoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorDos) {

          if (listaEnfrentamientosDelJuego[contEnfrentamiento].ganador !== undefined) {
            partidosJugados++;
          }
        }
      }
    }
    return partidosJugados;
  }

  public CalcularPartidosGanados(listaEnfrentamientosDelJuego: EnfrentamientoLiga[],
    listaEquiposOrdenadaPorPuntos, participante: number, individual): number {
    let partidosGanados = 0;
    if (individual === false) {
      // tslint:disable-next-line:prefer-for-of
      for (let contEnfrentamiento = 0; contEnfrentamiento < listaEnfrentamientosDelJuego.length; contEnfrentamiento++) {
        if (listaEquiposOrdenadaPorPuntos[participante].EquipoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorUno ||
          listaEquiposOrdenadaPorPuntos[participante].EquipoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorDos) {

          if (listaEquiposOrdenadaPorPuntos[participante].EquipoId === listaEnfrentamientosDelJuego[contEnfrentamiento].ganador) {
            partidosGanados++;
          }
        }
      }
    } else if (individual === true) {
      // tslint:disable-next-line:prefer-for-of
      for (let contEnfrentamiento = 0; contEnfrentamiento < listaEnfrentamientosDelJuego.length; contEnfrentamiento++) {
        if (listaEquiposOrdenadaPorPuntos[participante].AlumnoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorUno ||
          listaEquiposOrdenadaPorPuntos[participante].AlumnoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorDos) {

          if (listaEquiposOrdenadaPorPuntos[participante].AlumnoId === listaEnfrentamientosDelJuego[contEnfrentamiento].ganador) {
            partidosGanados++;
          }
        }
      }
    }
    return partidosGanados;
  }

  public CalcularPartidosEmpatados(listaEnfrentamientosDelJuego: EnfrentamientoLiga[],
    listaParticipantesOrdenadaPorPuntos,
    participante: number, individual): number {
    let partidosEmpatados = 0;
    if (individual === false) {
      // tslint:disable-next-line:prefer-for-of
      for (let contEnfrentamiento = 0; contEnfrentamiento < listaEnfrentamientosDelJuego.length; contEnfrentamiento++) {
        if (listaParticipantesOrdenadaPorPuntos[participante].EquipoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorUno ||
          listaParticipantesOrdenadaPorPuntos[participante].EquipoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorDos) {

          if (listaEnfrentamientosDelJuego[contEnfrentamiento].ganador === 0) {
            partidosEmpatados++;
          }
        }
      }
    } else if (individual === true) {
      // tslint:disable-next-line:prefer-for-of
      for (let contEnfrentamiento = 0; contEnfrentamiento < listaEnfrentamientosDelJuego.length; contEnfrentamiento++) {
        if (listaParticipantesOrdenadaPorPuntos[participante].AlumnoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorUno ||
          listaParticipantesOrdenadaPorPuntos[participante].AlumnoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorDos) {

          if (listaEnfrentamientosDelJuego[contEnfrentamiento].ganador === 0) {
            partidosEmpatados++;
          }
        }
      }
    }
    return partidosEmpatados;
  }

  public CalcularPartidosPerdidos(listaEnfrentamientosDelJuego: EnfrentamientoLiga[],
    listaParticipantesOrdenadaPorPuntos, contEquipo: number, individual): number {
    let partidosPerdidos = 0;
    if (individual === false) {
      // tslint:disable-next-line:prefer-for-of
      for (let contEnfrentamiento = 0; contEnfrentamiento < listaEnfrentamientosDelJuego.length; contEnfrentamiento++) {
        if (listaParticipantesOrdenadaPorPuntos[contEquipo].EquipoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorUno ||
          listaParticipantesOrdenadaPorPuntos[contEquipo].EquipoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorDos) {

          if ((listaEnfrentamientosDelJuego[contEnfrentamiento].ganador !== 0 &&
            listaEnfrentamientosDelJuego[contEnfrentamiento].ganador !== undefined) &&
            listaEnfrentamientosDelJuego[contEnfrentamiento].ganador !== listaParticipantesOrdenadaPorPuntos[contEquipo].EquipoId) {
            partidosPerdidos++;
          }
        }
      }
    } else if (individual === true) {
      // tslint:disable-next-line:prefer-for-of
      for (let contEnfrentamiento = 0; contEnfrentamiento < listaEnfrentamientosDelJuego.length; contEnfrentamiento++) {
        if (listaParticipantesOrdenadaPorPuntos[contEquipo].AlumnoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorUno ||
          listaParticipantesOrdenadaPorPuntos[contEquipo].AlumnoId === listaEnfrentamientosDelJuego[contEnfrentamiento].jugadorDos) {

          if ((listaEnfrentamientosDelJuego[contEnfrentamiento].ganador !== 0 &&
            listaEnfrentamientosDelJuego[contEnfrentamiento].ganador !== undefined) &&
            listaEnfrentamientosDelJuego[contEnfrentamiento].ganador !== listaParticipantesOrdenadaPorPuntos[contEquipo].AlumnoId) {
            partidosPerdidos++;
          }
        }
      }
    }
    return partidosPerdidos;
  }

  public ConstruirTablaEnfrentamientos(EnfrentamientosJornadaSeleccionada: EnfrentamientoLiga[],
    listaAlumnosClasificacion: TablaAlumnoJuegoDeCompeticion[],
    listaEquiposClasificacion: TablaEquipoJuegoDeCompeticion[],
    juegoSeleccionado: Juego) {
    console.log('Aquí tendré la tabla de enfrentamientos, los enfrentamientos sonc:');
    console.log(EnfrentamientosJornadaSeleccionada);
    console.log('Distinción entre Individual y equipos');
    if (juegoSeleccionado.modo === 'Individual') {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < EnfrentamientosJornadaSeleccionada.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < listaAlumnosClasificacion.length; j++) {
          if (EnfrentamientosJornadaSeleccionada[i].jugadorUno === listaAlumnosClasificacion[j].id) {
            EnfrentamientosJornadaSeleccionada[i].nombreJugadorUno = listaAlumnosClasificacion[j].nombre + ' ' +
              listaAlumnosClasificacion[j].primerApellido + ' ' +
              listaAlumnosClasificacion[j].segundoApellido;
            if (EnfrentamientosJornadaSeleccionada[i].ganador === listaAlumnosClasificacion[j].id) {
              EnfrentamientosJornadaSeleccionada[i].nombreGanador = listaAlumnosClasificacion[j].nombre + ' ' +
                listaAlumnosClasificacion[j].primerApellido + ' ' +
                listaAlumnosClasificacion[j].segundoApellido;
            } else if (EnfrentamientosJornadaSeleccionada[i].ganador === 0) {
              EnfrentamientosJornadaSeleccionada[i].nombreGanador = 'Empate';
            } else if (EnfrentamientosJornadaSeleccionada[i].ganador === undefined) {
              EnfrentamientosJornadaSeleccionada[i].nombreGanador = '-';
            }
          } else if (EnfrentamientosJornadaSeleccionada[i].jugadorDos === listaAlumnosClasificacion[j].id) {
            EnfrentamientosJornadaSeleccionada[i].nombreJugadorDos = listaAlumnosClasificacion[j].nombre + ' ' +
              listaAlumnosClasificacion[j].primerApellido + ' ' +
              listaAlumnosClasificacion[j].segundoApellido;
            if (EnfrentamientosJornadaSeleccionada[i].ganador === listaAlumnosClasificacion[j].id) {
              EnfrentamientosJornadaSeleccionada[i].nombreGanador = listaAlumnosClasificacion[j].nombre + ' ' +
                listaAlumnosClasificacion[j].primerApellido + ' ' +
                listaAlumnosClasificacion[j].segundoApellido;
            } else if (EnfrentamientosJornadaSeleccionada[i].ganador === 0) {
              EnfrentamientosJornadaSeleccionada[i].nombreGanador = 'Empate';
            } else if (EnfrentamientosJornadaSeleccionada[i].ganador === undefined) {
              EnfrentamientosJornadaSeleccionada[i].nombreGanador = '-';
            }
          }
        }
      }

    } else {
      console.log('Estoy en ConstruirTablaEnfrentamientos() equipos');
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < EnfrentamientosJornadaSeleccionada.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < listaEquiposClasificacion.length; j++) {
          if (EnfrentamientosJornadaSeleccionada[i].jugadorUno === listaEquiposClasificacion[j].id) {
            EnfrentamientosJornadaSeleccionada[i].nombreJugadorUno = listaEquiposClasificacion[j].nombre;
            if (EnfrentamientosJornadaSeleccionada[i].ganador === listaEquiposClasificacion[j].id) {
              EnfrentamientosJornadaSeleccionada[i].nombreGanador = listaEquiposClasificacion[j].nombre;
            } else if (EnfrentamientosJornadaSeleccionada[i].ganador === 0) {
              EnfrentamientosJornadaSeleccionada[i].nombreGanador = 'Empate';
            } else if (EnfrentamientosJornadaSeleccionada[i].ganador === undefined) {
              EnfrentamientosJornadaSeleccionada[i].nombreGanador = '-';
            }
          } else if (EnfrentamientosJornadaSeleccionada[i].jugadorDos === listaEquiposClasificacion[j].id) {
            EnfrentamientosJornadaSeleccionada[i].nombreJugadorDos = listaEquiposClasificacion[j].nombre;
            if (EnfrentamientosJornadaSeleccionada[i].ganador === listaEquiposClasificacion[j].id) {
              EnfrentamientosJornadaSeleccionada[i].nombreGanador = listaEquiposClasificacion[j].nombre;
            } else if (EnfrentamientosJornadaSeleccionada[i].ganador === 0) {
              EnfrentamientosJornadaSeleccionada[i].nombreGanador = 'Empate';
            } else if (EnfrentamientosJornadaSeleccionada[i].ganador === undefined) {
              EnfrentamientosJornadaSeleccionada[i].nombreGanador = '-';
            }
          }
        }
      }
    }
    return EnfrentamientosJornadaSeleccionada;
  }

  public JornadaFinalizada(juegoSeleccionado: Juego, jornadaSeleccionada: TablaJornadas) {
    let jornadaFinalizada = false;
    if (jornadaSeleccionada.disputada === true) {
      jornadaFinalizada = true;
    }
    return jornadaFinalizada;
  }

  public GenerarTablaJornadasLiga(juegoSeleccionado, jornadas, enfrentamientosJuego: EnfrentamientoLiga[][]) {
    const TablaJornada: TablaJornadas[] = [];
    console.log('juego seleccionado:');
    console.log(juegoSeleccionado);
    for (let i = 0; i < jornadas.length; i++) {
      let jornada: Jornada;
      const jornadaId = jornadas[i].id;
      jornada = jornadas.filter(res => res.id === jornadaId)[0];
      const enfrentamientosJornada: EnfrentamientoLiga[] = [];
      enfrentamientosJuego[i].forEach(enfrentamientoDeLaJornada => {
        if (enfrentamientoDeLaJornada.jornadaDeCompeticionLigaId === jornadaId) {
          enfrentamientosJornada.push(enfrentamientoDeLaJornada);
        }
      });
      console.log('Los enfrentamientosJornada con id ' + jornadaId + ' son:');
      console.log(enfrentamientosJornada);
      const Disputada: boolean = this.JornadaFinalizadaLiga(jornada, enfrentamientosJornada);
      TablaJornada[i] = new TablaJornadas(i + 1, jornada.fecha, jornada.criterioGanador, jornada.id, undefined, undefined, Disputada);
    }
    return TablaJornada;
  }

  public JornadaFinalizadaLiga(jornadaSeleccionada: Jornada, EnfrentamientosJornada: EnfrentamientoLiga[]) {
    let HayGanador = true;
    let jornadaFinalizada = true;
    if (jornadaSeleccionada.id === EnfrentamientosJornada[0].jornadaDeCompeticionLigaId) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < EnfrentamientosJornada.length; i++) {
        if (EnfrentamientosJornada[i].ganador === undefined) {
          HayGanador = false;
        }
      }
      if (HayGanador === false) {
        jornadaFinalizada = false;
      }
    }
    return jornadaFinalizada;
  }

  //////////////////////////////////////// JUEGO DE COMPETICIÓN FÓRUMULA UNO ///////////////////////////////////
  public PrepararTablaRankingIndividualFormulaUno(listaAlumnosOrdenadaPorPuntos: AlumnoJuegoDeCompeticionFormulaUno[],
    alumnosDelJuego: Alumno[]): TablaAlumnoJuegoDeCompeticion[] {
    const rankingJuegoDeCompeticion: TablaAlumnoJuegoDeCompeticion[] = [];
    console.log(' Vamos a preparar la tabla del ranking individual de Competición Fórmula Uno');
    console.log('la lista de alumnos ordenada es: ');
    console.log(listaAlumnosOrdenadaPorPuntos);
    // tslint:disable-next-line:prefer-for-oF
    for (let i = 0; i < listaAlumnosOrdenadaPorPuntos.length; i++) {
      let alumno: Alumno;
      const alumnoId = listaAlumnosOrdenadaPorPuntos[i].alumnoId;
      alumno = alumnosDelJuego.filter(res => res.id === alumnoId)[0];
      rankingJuegoDeCompeticion[i] = new TablaAlumnoJuegoDeCompeticion(i + 1, alumno.nombre, alumno.primerApellido, alumno.segundoApellido,
        listaAlumnosOrdenadaPorPuntos[i].puntosTotalesAlumno, alumnoId);
    }
    return rankingJuegoDeCompeticion;
  }

  public PrepararTablaRankingEquipoFormulaUno(listaEquiposOrdenadaPorPuntos: EquipoJuegoDeCompeticionFormulaUno[],
    equiposDelJuego: Equipo[]) {
    const rankingJuegoDeCompeticion: TablaEquipoJuegoDeCompeticion[] = [];
    console.log(' Vamos a preparar la tabla del ranking por equipos de Competición Fórmula Uno');
    console.log('la lista de equipos ordenada es: ');
    console.log(listaEquiposOrdenadaPorPuntos);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < listaEquiposOrdenadaPorPuntos.length; i++) {
      let equipo: Equipo;
      const EquipoId = listaEquiposOrdenadaPorPuntos[i].equipoId;
      equipo = equiposDelJuego.filter(res => res.id === EquipoId)[0];
      rankingJuegoDeCompeticion[i] = new TablaEquipoJuegoDeCompeticion(i + 1, equipo.nombre,
        listaEquiposOrdenadaPorPuntos[i].puntosTotalesEquipo, EquipoId);
    }
    return rankingJuegoDeCompeticion;
  }

  // Clasificación F1
  public ClasificacionJornada(juegoSeleccionado: Juego, alumnoJuegoDeCompeticionFormulaUno: TablaAlumnoJuegoDeCompeticion[],
    equipoJuegoDeCompeticionFormulaUno: TablaEquipoJuegoDeCompeticion[], GanadoresFormulaUno: string[],
    GanadoresFormulaUnoId: number[]) {
    console.log('Estoy en calculos.ClasificacionJornada()');
    const ParticipantesFormulaUno: string[] = [];
    const PuntosFormulaUno: number[] = [];
    const Posicion: number[] = [];
    const ParticipantesId: number[] = [];
    if (GanadoresFormulaUno !== undefined) {
      GanadoresFormulaUno.forEach(ganador => {
        ParticipantesFormulaUno.push(ganador);
        // tslint:disable-next-line:max-line-length
        const alumno = alumnoJuegoDeCompeticionFormulaUno.find(a => (a.nombre + ' ' + a.primerApellido + ' ' + a.segundoApellido) === ganador);
        ParticipantesId.push(alumno.id);
      });
      juegoSeleccionado.puntos.forEach(punto => {
        PuntosFormulaUno.push(punto);
        console.log('Los Puntos del juego son: ' + punto);
      });
      // const PuntosFormulaUno: number[] = juegoSeleccionado.Puntos;
      if (juegoSeleccionado.modo === 'Individual') {
        alumnoJuegoDeCompeticionFormulaUno.forEach(a => {
          const ParticipanteFormulaUno = a.nombre + ' ' + a.primerApellido + ' ' + a.segundoApellido;
          const ParticipanteId = a.id;
          const indexNoGanador = GanadoresFormulaUno.indexOf(ParticipanteFormulaUno);
          if (indexNoGanador === -1) {
            ParticipantesFormulaUno.push(ParticipanteFormulaUno);
            PuntosFormulaUno.push(0);
            ParticipantesId.push(ParticipanteId);
          }
        });
        for (let j = 0; j < ParticipantesFormulaUno.length; j++) {
          Posicion[j] = j + 1;
        }
      } else {
        console.log('Estamos en ClasificacionJornada() equipo');
        equipoJuegoDeCompeticionFormulaUno.forEach(a => {
          const ParticipanteFormulaUno = a.nombre;
          const ParticipanteId = a.id;
          const indexNoGanador = GanadoresFormulaUno.indexOf(ParticipanteFormulaUno);
          if (indexNoGanador === -1) {
            ParticipantesFormulaUno.push(ParticipanteFormulaUno);
            PuntosFormulaUno.push(0);
            ParticipantesId.push(ParticipanteId);
          }
        });
        for (let j = 0; j < ParticipantesFormulaUno.length; j++) {
          Posicion[j] = j + 1;
        }
      }
    } else {
      console.log('Esta jornada aún no tiene ganadores asignados');
      if (juegoSeleccionado.modo === 'Individual') {
        alumnoJuegoDeCompeticionFormulaUno.forEach(a => {
          const ParticipanteFormulaUno = a.nombre + ' ' + a.primerApellido + ' ' + a.segundoApellido;
          const ParticipanteId = a.id;
          ParticipantesFormulaUno.push(ParticipanteFormulaUno);
          PuntosFormulaUno.push(0);
          ParticipantesId.push(ParticipanteId);
        });
        for (let j = 0; j < ParticipantesFormulaUno.length; j++) {
          Posicion[j] = j + 1;
        }
      } else {
        console.log('Estamos en ClasificacionJornada() equipo');
        equipoJuegoDeCompeticionFormulaUno.forEach(a => {
          const ParticipanteFormulaUno = a.nombre;
          const ParticipanteId = a.id;
          ParticipantesFormulaUno.push(ParticipanteFormulaUno);
          PuntosFormulaUno.push(0);
          ParticipantesId.push(ParticipanteId);
        });
        for (let j = 0; j < ParticipantesFormulaUno.length; j++) {
          Posicion[j] = j + 1;
        }
      }
    }
    const datosClasificaciónJornada = {
      participante: ParticipantesFormulaUno,
      puntos: PuntosFormulaUno,
      posicion: Posicion,
      participanteId: ParticipantesId
    };
    return datosClasificaciónJornada;
  }

  // Preparamos la tabla de la competicion f1
  public PrepararTablaRankingJornadaFormulaUno(datosClasificacionJornadaSeleccionada: {
    participante: string[];
    puntos: number[];
    posicion: number[];
    participanteId: number[]
  }) {
    console.log('Estoy en PrepararTablaRankingJornadaFormulaUno');
    const rankingJornadaFormulaUno: TablaClasificacionJornada[] = [];
    for (let i = 0; i < datosClasificacionJornadaSeleccionada.participante.length; i++) {
      rankingJornadaFormulaUno[i] = new TablaClasificacionJornada(datosClasificacionJornadaSeleccionada.participante[i],
        datosClasificacionJornadaSeleccionada.puntos[i],
        datosClasificacionJornadaSeleccionada.posicion[i],
        datosClasificacionJornadaSeleccionada.participanteId[i]);
    }
    return rankingJornadaFormulaUno;
  }

  public GenerarTablaJornadasF1(juegoSeleccionado, jornadas, alumnoJuegoDeCompeticionFormulaUno,
    equipoJuegoDeCompeticionFormulaUno) {

    const TablaJornada: TablaJornadas[] = [];
    console.log('juego seleccionado:');
    console.log(juegoSeleccionado);
    for (let i = 0; i < juegoSeleccionado.NumeroTotalJornadas; i++) {
      let jornada: Jornada;
      const jornadaId = jornadas[i].id;
      jornada = jornadas.filter(res => res.id === jornadaId)[0];

      console.log('Ganadores de la jornada:');
      console.log(jornada.ganadoresFormulaUno);
      console.log('Fecha de la jornada');
      console.log(jornada.fecha);
      if (juegoSeleccionado.Tipo === 'Juego De Competición Fórmula Uno') {

        if (jornada.fecha === undefined && jornada.ganadoresFormulaUno === undefined) {
          const Disputada = false;
          TablaJornada[i] = new TablaJornadas(i + 1, jornada.fecha, jornada.criterioGanador, jornada.id, undefined, undefined, Disputada);

        } else if (jornada.fecha === undefined && jornada.ganadoresFormulaUno !== undefined) {
          const GanadoresFormulaUno = this.ObtenerNombreGanadoresFormulaUno(juegoSeleccionado, jornada, alumnoJuegoDeCompeticionFormulaUno,
            equipoJuegoDeCompeticionFormulaUno);
          const Disputada = true;
          TablaJornada[i] = new TablaJornadas(i + 1, jornada.fecha, jornada.criterioGanador, jornada.id, GanadoresFormulaUno.nombre,
            GanadoresFormulaUno.id, Disputada);

        } else if (jornada.fecha !== undefined && jornada.ganadoresFormulaUno === undefined) {
          const Disputada = false;
          TablaJornada[i] = new TablaJornadas(i + 1, jornada.fecha, jornada.criterioGanador, jornada.id,
            undefined, undefined, Disputada);

        } else {
          const GanadoresFormulaUno = this.ObtenerNombreGanadoresFormulaUno(juegoSeleccionado, jornada,
            alumnoJuegoDeCompeticionFormulaUno,
            equipoJuegoDeCompeticionFormulaUno);
          const Disputada = true;
          TablaJornada[i] = new TablaJornadas(i + 1, jornada.fecha, jornada.criterioGanador, jornada.id, GanadoresFormulaUno.nombre,
            GanadoresFormulaUno.id, Disputada);
        }
      }
    }
    return (TablaJornada);
  }

  public ObtenerNombreGanadoresFormulaUno(juegoSeleccionado: Juego, jornada, alumnoJuegoDeCompeticionFormulaUno,
    equipoJuegoDeCompeticionFormulaUno) {
    console.log('Estoy en ObtenerNombreGanadoresFormulaUno()');
    const GanadoresFormulaUno: {
      nombre: string[]
      id: number[]
    } = { nombre: [], id: [] };
    GanadoresFormulaUno.nombre = [];
    GanadoresFormulaUno.id = jornada.GanadoresFormulaUno;
    if (juegoSeleccionado.modo === 'Individual') {
      for (let j = 0; j < GanadoresFormulaUno.id.length; j++) {
        // tslint:disable-next-line:prefer-for-of
        for (let k = 0; k < alumnoJuegoDeCompeticionFormulaUno.length; k++) {
          if (GanadoresFormulaUno.id[j] === alumnoJuegoDeCompeticionFormulaUno[k].id) {
            GanadoresFormulaUno.nombre[j] = alumnoJuegoDeCompeticionFormulaUno[k].nombre + ' '
              + alumnoJuegoDeCompeticionFormulaUno[k].primerApellido + ' '
              + alumnoJuegoDeCompeticionFormulaUno[k].segundoApellido;
          }
        }
      }
      console.log(GanadoresFormulaUno);
      return GanadoresFormulaUno;
    } else {
      for (let j = 0; j < GanadoresFormulaUno.id.length; j++) {
        // tslint:disable-next-line:prefer-for-of
        for (let k = 0; k < equipoJuegoDeCompeticionFormulaUno.length; k++) {
          console.log('GanadoresFormulaUno[j].id === equipoJuegoDeCompeticionFormulaUno[k].id :');
          console.log(GanadoresFormulaUno.id[j] + '===' + equipoJuegoDeCompeticionFormulaUno[k].id);
          if (GanadoresFormulaUno.id[j] === equipoJuegoDeCompeticionFormulaUno[k].id) {
            GanadoresFormulaUno.nombre[j] = equipoJuegoDeCompeticionFormulaUno[k].nombre;
          }
        }
      }
      console.log('GanadoresFormulaUno:');
      console.log(GanadoresFormulaUno);
      return GanadoresFormulaUno;
    }
  }
  public DameAlumnosJuegoDeGeocaching(juegoId: number): MiAlumnoAMostrarJuegoDeGeocaching[] {
    let InformacionAlumno: MiAlumnoAMostrarJuegoDeGeocaching[] = [];
    this.peticionesAPI.DameAlumnosJuegoDeGeocaching(juegoId).subscribe(
      listaAlumnos => {
        for (let i = 0; i < (listaAlumnos.length); i++) {
          const MiAlumno = new MiAlumnoAMostrarJuegoDeGeocaching();
          MiAlumno.nombre = listaAlumnos[i].nombre;
          MiAlumno.primerApellido = listaAlumnos[i].primerApellido;
          MiAlumno.imagenPerfil = listaAlumnos[i].imagenPerfil;
          this.peticionesAPI.DameInscripcionAlumnoJuegoDeGeocaching(listaAlumnos[i].id, juegoId).subscribe(
            Inscripcion => {
              MiAlumno.puntuacion = Inscripcion[0].Puntuacion;
              MiAlumno.etapa = Inscripcion[0].Etapa;
              MiAlumno.alumnoId = Inscripcion[0].alumnoId;
              MiAlumno.id = Inscripcion[0].id;
              MiAlumno.juegoDeGeocachingId = Inscripcion[0].juegoDeGeocachingId;
            });
          InformacionAlumno.push(MiAlumno);
        }

        InformacionAlumno = InformacionAlumno.sort((a, b) => {

          return b.puntuacion - a.puntuacion;
        });
      });
    return InformacionAlumno;
  }

  public DameListaAlumnosJuegoGeocachingOrdenada(juegoDeGeocachingId: number): MiAlumnoAMostrarJuegoDeGeocaching[] {

    const InformacionAlumno: MiAlumnoAMostrarJuegoDeGeocaching[] = [];

    let Inscripciones: AlumnoJuegoDeGeocaching[] = [];
    this.peticionesAPI.ListaInscripcionesAlumnosJuegoDeGeocaching(juegoDeGeocachingId).subscribe(res => {
      Inscripciones = res;
      Inscripciones = Inscripciones.sort(function (a, b) {
        return b.puntuacion - a.puntuacion;
      });
      for (let i = 0; i < (Inscripciones.length); i++) {
        const MiAlumno = new MiAlumnoAMostrarJuegoDeGeocaching();
        MiAlumno.puntuacion = Inscripciones[i].puntuacion;
        MiAlumno.etapa = Inscripciones[i].etapa;
        MiAlumno.alumnoId = Inscripciones[i].alumnoId;
        MiAlumno.id = Inscripciones[i].id;
        MiAlumno.juegoDeGeocachingId = Inscripciones[i].juegoDeGeocachingId;
        this.peticionesAPI.DameAlumnoConId(MiAlumno.alumnoId)
          .subscribe(res => {
            MiAlumno.nombre = res.nombre;
            MiAlumno.primerApellido = res.primerApellido;
            MiAlumno.imagenPerfil = res.imagenPerfil;
          });

        InformacionAlumno.push(MiAlumno);

      }
    });
    return InformacionAlumno;
  }

  public DamePreguntasJuegoDeGeocaching(PreguntasId: number[]): any {
    const preguntasObservable = new Observable(obs => {

      let contador = 0;
      const preguntas: Pregunta[] = [];
      for (let i = 0; i < (PreguntasId.length); i++) {
        this.peticionesAPI.DamePreguntas(PreguntasId[i])
          .subscribe(res => {
            preguntas.push(res);
            contador = contador + 1;
            if (contador === PreguntasId.length) {
              obs.next(preguntas);
            }
          });

      }
    });
    return preguntasObservable;
  }


  public DameEquipoAlumnoEnJuegoDeColeccion(alumnoId: number, juegoId: number): any {
    const equipoObservable = new Observable(obs => {
      console.log('voy a por el equipo de este alumno en el juego');
      // primero traigo los equipos que participan en el juego
      this.peticionesAPI.DameEquiposJuegoDeColeccion(juegoId)
        .subscribe(equiposJuego => {
          console.log('equipos del juego');
          console.log(equiposJuego);
          // ahora traigo los equipos a los que pertenece el alumno
          this.peticionesAPI.DameEquiposDelAlumno(alumnoId)
            .subscribe(equiposAlumno => {
              console.log('equipos del alumno');
              console.log(equiposAlumno);
              // ahora miro cual es el equipo que está en ambas listas
              const equipo = equiposAlumno.filter(e => equiposJuego.some(a => a.id === e.id))[0];
              console.log('interseccion');
              console.log(equipo);
              obs.next(equipo);
            });

        });

    });
    return equipoObservable;
  }

  //////////////////////////////////////// JUEGO DE CUESTIONARIO ///////////////////////////////////
  public PrepararTablaRankingCuestionario(listaAlumnosOrdenadaPorPuntos: AlumnoJuegoDeCuestionario[],
    alumnosDelJuego: Alumno[]): TablaAlumnoJuegoDeCuestionario[] {
    const rankingJuegoDeCompeticion: TablaAlumnoJuegoDeCuestionario[] = [];
    // tslint:disable-next-line:prefer-for-oF
    for (let i = 0; i < listaAlumnosOrdenadaPorPuntos.length; i++) {
      let alumno: Alumno;
      const alumnoId = listaAlumnosOrdenadaPorPuntos[i].alumnoId;
      alumno = alumnosDelJuego.filter(res => res.id === alumnoId)[0];
      // tslint:disable-next-line:max-line-length
      rankingJuegoDeCompeticion[i] = new TablaAlumnoJuegoDeCuestionario(alumno.nombre, alumno.primerApellido, alumno.segundoApellido, alumno.imagenPerfil,
        // tslint:disable-next-line:max-line-length
        listaAlumnosOrdenadaPorPuntos[i].nota, listaAlumnosOrdenadaPorPuntos[i].contestado, alumnoId, listaAlumnosOrdenadaPorPuntos[i].tiempoEmpleado);
      console.log('nueva tabla');
      console.log(rankingJuegoDeCompeticion[i]);
    }
    return rankingJuegoDeCompeticion;
  }


}

