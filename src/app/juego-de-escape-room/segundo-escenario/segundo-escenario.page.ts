import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, NavController } from '@ionic/angular';

import { JuegoDeEscapeRoom } from 'src/app/clases/JuegoDeEscapeRoom';
import { ObjetoEnigma } from 'src/app/clases/ObjetoEnigma';
import { ObjetoEscape } from 'src/app/clases/ObjetoEscape';
import { CalculosService, SesionService } from 'src/app/servicios';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ObjetoPista } from 'src/app/clases/ObjetoPista';
import { ObjetoGlobalEscape } from 'src/app/clases/ObjetoGlobalEscape';


@Component({
  selector: 'app-segundo-escenario',
  templateUrl: './segundo-escenario.page.html',
  styleUrls: ['./segundo-escenario.page.scss'],
})
export class SegundoEscenarioPage implements OnInit {

  juegoEscape: JuegoDeEscapeRoom;
  showImage: boolean = false;

  estancia: string;

  pesoTotal: number = 0;

  mapVar: string;

  listaObjetosDepositadosBascula: ObjetoEscape[] = [];

  objetosEnigma: ObjetoEnigma[] = [];
  objetosEscape: ObjetoEscape[] = [];
  objetosGlobales: ObjetoGlobalEscape [] = [];

  objetosEnigmaPrimerEscenario: ObjetoEnigma[] = [];
  objetosEscapePrimerEscenario: ObjetoEscape[] = [];
  objetosGlobalesPrimerEscenario: ObjetoGlobalEscape [] = [];


  objetoEscapeLlave: ObjetoEscape;

  objeto1escape: ObjetoEscape;
  objeto2escape: ObjetoEscape;
  objeto3escape: ObjetoEscape;

  bascula: ObjetoEnigma;
  objeto2enigma: ObjetoEnigma;

  objetoEscape: ObjetoEscape;
  objetoPista: ObjetoPista;
  llave: ObjetoGlobalEscape;

  recogido: boolean;
  recogido2: boolean;
  recogido3: boolean;

  varEscenario: string = "containerHabitacion";

  constructor(private router: Router,
    private modalController: ModalController,
    private sesion: SesionService,
    private calculos: CalculosService,
    private alertController: AlertController,
    public navCtrl: NavController) { }

  reload() {
    this.ngOnInit();
  }
  ionViewWillEnter() {
    this.reload();
  }
  ngOnInit() {
    this.juegoEscape = this.sesion.DameJuegoEscapeRoom();

    this.estancia = "Secundario";
    this.sesion.TomaEstanciaEscenario(this.estancia);

    this.objetosEscape = this.sesion.DameObjetosEscapeSegundoEscenario();
    this.objetosEnigma = this.sesion.DameObjetosEnigmaSegundoEscenario();
    this.objetosGlobales = this.sesion.DameObjetosGlobalesSegundoEscenario();

    this.objetosEscapePrimerEscenario = this.sesion.DameObjetosEscape();
    this.objetosEnigmaPrimerEscenario = this.sesion.DameObjetosEnigma();
    this.objetosGlobalesPrimerEscenario = this.sesion.DameObjetosGlobalesPrimerEscenario();

    this.listaObjetosDepositadosBascula = this.sesion.DameListaObjetosDepositadosBascula();

 
  /*  this.objetosGlobales.forEach(elemento => {
      if (elemento.tipoDeObjeto == "objetoEscape") {
        this.objetosEscape.forEach(objetoEsca => {
          if (objetoEsca.nombre == elemento.nombre) {
            if (elemento.posicion == 1) {
              this.objeto1escape = objetoEsca;
              this.recogido = elemento.recogido;
            } if (elemento.posicion == 2) {
              this.objeto2escape = objetoEsca;
              this.recogido2 = elemento.recogido;
            } if (elemento.posicion == 3) {
              this.objeto3escape = objetoEsca;
              this.recogido3 = elemento.recogido;
            }
          }
        });
      } else {
        this.objetosEnigma.forEach(enigma => {
          if (enigma.nombre == elemento.nombre) {
            if (elemento.posicion == 1) {
              this.bascula = enigma;
            } if (elemento.posicion == 2) {
              this.objeto2enigma = enigma;
            }
          }
        });
      }
    });
 */
    this.listaObjetosDepositadosBascula.forEach(elemento => {
    });

//    this.objetoPista = new ObjetoPista ("Segunda pista", this.juegoEscape.escenario.mapa, "Secundario", "Quizás tendrás que hacer una combinación de objetos proximamente...");


  /*  if (this.juegoEscape.escenarioSecundario.mapa == "baño") {
      this.mapVar = "bano";
      this.varEscenario = "containerBaño";
    }
    else {
      if (this.juegoEscape.escenarioSecundario.mapa == "cocina") {
        this.varEscenario = "containerCocina";
      }
      else {
        this.varEscenario = "containerHabitacion";
      }
    }
    this.showImage = true;
 */
  }
  abrirMochila() {
    this.router.navigateByUrl('mochila');
  }
  guardarEscape() {
    this.sesion.TomaObjetosEnigmaSegundoEscenario(this.objetosEnigma);
    this.sesion.TomaObjetosEscapeSegundoEscenario(this.objetosEscape);
    this.calculos.GuardaEscapeRoom();
    Swal.fire({
      title: '¿Quieres guardar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.value) {
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
  cogerObjeto(objeto) {

    if (objeto == this.objeto1escape.nombre) {
      if (this.objeto1escape.usable == true) {

        this.sesion.cambiaElEstadoDelObjetoSegundoEscenario(true, objeto);
        Swal.fire({
          title: '¿Seguro que quieres este objeto?   ' + objeto,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, estoy seguro'
        }).then((result) => {
          if (result.value) {
            this.objetosGlobales.forEach(objeto => {
              console.log("Objeto: ", objeto);
              if(objeto.nombre == this.objeto1escape.nombre){
                this.calculos.añadirObjetoMochila(objeto);
              }
            });
            this.reload();
          }
        });
      }
    }
    if (objeto == this.objeto2escape.nombre) {
      if (this.objeto2escape.usable == true) {
        console.log("ENTRAS PORFAPPLIS 2?");
        this.sesion.cambiaElEstadoDelObjetoSegundoEscenario(true, objeto);
        Swal.fire({
          title: '¿Seguro que quieres este objeto?   ' + objeto,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, estoy seguro'
        }).then((result) => {
          if (result.value) {
            this.objetosGlobales.forEach(objeto => {
              console.log("Objeto: ", objeto);
              if(objeto.nombre == this.objeto2escape.nombre){
                this.calculos.añadirObjetoMochila(objeto);
              }
            });
            this.reload();
          }
        });
      }
    }
    if (objeto == this.objeto3escape.nombre) {
      if (this.objeto3escape.usable == true) {
        console.log("ENTRAS PORFAPPLIS 3?");

        this.sesion.cambiaElEstadoDelObjetoSegundoEscenario(true, objeto);
        Swal.fire({
          title: '¿Seguro que quieres este objeto?   ' + objeto,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, estoy seguro'
        }).then((result) => {
          if (result.value) {
            this.objetosGlobales.forEach(objeto => {
              console.log("Objeto: ", objeto);
              if(objeto.nombre == this.objeto3escape.nombre){
                this.calculos.añadirObjetoMochila(objeto);
              }
            });
            this.reload();
          }
        });
      }
    }
  }
  abrirObjeto(objeto) {
   /* console.log("Objeto: ", objeto);
    this.alertController.create({
      header: 'Enigma',
      subHeader: 'Responde con el código correcto.',
      message: '¿' + objeto.pregunta + '?',
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
            this.objetosGlobales.forEach(elemento => {
              if (elemento.nombre == objeto.nombre) {
                this.objetosEnigma.forEach(elemen => {

                  if (elemen.nombre == elemento.nombre) {
                    if (elemen.respuesta == data.Respuesta && elemento.resuelta == false) {
                      this.alertController.create({ message: "Perfecto!" }).then(res => {
                        res.present();
                        elemento.resuelta = true;
                        if (elemen.principal == true) {
                          this.conseguirLlave(elemen);
                        } else {
                          this.conseguirPista(elemen);
                        }
                      });
                    } else {
                      if (elemento.resuelta == true) {
                        this.alertController.create({ message: "Ya has resuelto este acertijo!" }).then(res => {
                          res.present();
                        });
                      } else {
                        this.alertController.create({ message: "Error!" }).then(res => {
                          res.present();
                        });
                      }
                    }
                  }
                });
              }
            });
          }
        }
      ]
    }).then(res => {
      res.present();
    }); */
  }
  abrirObjetoBascula(objeto: ObjetoEnigma) {

    /*this.juegoEscape.mochila.objetos.forEach(elemento => {
      console.log("Elemento: ", elemento);
      console.log("ObjetosEscape: ", this.objetosEscape);
      console.log("ObjetosEscapePrimerEscenario: ", this.objetosEscapePrimerEscenario);
      this.objetosEscape.forEach(objeto => {
        if(elemento.id == objeto.objetoId){
          console.log("Entras??");
          this.pesoTotal = objeto.peso + this.pesoTotal;
        }
      });
      this.objetosEscapePrimerEscenario.forEach(objeto => {
        if(elemento.id == objeto.objetoId){
          this.pesoTotal = objeto.peso + this.pesoTotal;
        }
      });
    
    });

    console.log("this.peso: ", this.pesoTotal);

    console.log("Objeto: ", objeto);
    this.alertController.create({
      header: 'Enigma',
      subHeader: 'Responde con el código correcto.',
      message: '¡' + objeto.pregunta + '!' + ' Actualmente el peso es de ' + this.pesoTotal + 'kg.',
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },{
          text: 'Abrir lista',
          handler: (data: any) => {
          }
        },
        {
          text: '¡Pesar!',
          handler: (data: any) => {
            
            let respuestaNumero = Number(objeto.respuesta);
            if (respuestaNumero == this.pesoTotal) {
              this.alertController.create({ message: "Perfecto!" }).then(res => {
                res.present();
                this.objetosEnigma.forEach(elemen => {
                  if (elemen.nombre == objeto.nombre) {
                    this.objetosGlobales.forEach(elemento => {
                      if(elemento.nombre == elemen.nombre){
                        elemento.resuelta = true;
                      }
                    })
                    if (elemen.principal == true) {
                      this.conseguirLlave(elemen);
                    } else {
                      this.conseguirPista(elemen);
                    }
                  }
                });
              });
            }else{
              this.alertController.create({ message: "No tienes el peso ideal, ¡Vuelve a intentarlo cuando cambies!" }).then(res => {
                res.present();
              });
            }
          }
        }
      ]
    }).then(res => {
      res.present();
    }); */
  }
  conseguirLlave(objetoEnigma) {
  /*
    Swal.fire({
      title: 'Felicidades! Has conseguido la llave',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Recoger'
    }).then((result) => {
      if (result.value) {
        this.calculos.añadirObjetoMochila(this.llave);
        this.llave.recogido = true;
        this.sesion.TomaObjetoEnigma(objetoEnigma);
        this.reload();
      }
    });
   */
  }
  conseguirPista(objetoEnigma) {
    Swal.fire({
      title: 'Felicidades! Has conseguido una pista',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Recoger'
    }).then((result) => {
      if (result.value) {
        this.calculos.añadirPistaMochila(this.objetoPista);
        this.objetoPista.recogida = true;
        this.sesion.TomaObjetoEnigma(objetoEnigma);
        this.reload();
      }
    });
  }
}
