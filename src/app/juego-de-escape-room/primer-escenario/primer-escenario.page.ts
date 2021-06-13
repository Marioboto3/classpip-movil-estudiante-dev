import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { Howl } from 'howler';
import { Juego } from 'src/app/clases';
import { Audio } from 'src/app/clases/Audio';
import { JuegoDeEscapeRoom } from 'src/app/clases/JuegoDeEscapeRoom';
import { ObjetoEnigma } from 'src/app/clases/ObjetoEnigma';
import { ObjetoEscape } from 'src/app/clases/ObjetoEscape';
import { CalculosService, SesionService } from 'src/app/servicios';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


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


  sliderOpts = {
    zoom: {
      maxRatio: 2
    }
  }

  audioInicial: Audio = new Audio("audio-inicial", "../../../assets/escape-room/audio-inicial.m4a");
  id: number;

  juegoEscape: JuegoDeEscapeRoom;

  estado: boolean;

  recogido: boolean;
  recogido2: boolean;
  recogido3: boolean;
  resuelto: boolean;
  resuelto2: boolean;
  recogidaPista: boolean;

  objeto1escape: ObjetoEscape;
  objeto2escape: ObjetoEscape;
  objeto3escape: ObjetoEscape;
  objeto1enigma: ObjetoEnigma;
  objeto2enigma: ObjetoEnigma;

  llave: ObjetoEscape = new ObjetoEscape("llave", true, false);

  objetosEnigma: ObjetoEnigma[];
  objetosEscape: ObjetoEscape[];

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
    this.reload();
  }
  ngOnInit() {

    this.juegoEscape = this.sesion.DameJuegoEscapeRoom();

    this.objetosEnigma = this.sesion.DameObjetosEnigma();
    this.objetosEscape = this.sesion.DameObjetosEscape();

    console.log("objetosEscape, ", this.objetosEscape);
    console.log("objetosEnigma: ", this.objetosEnigma);

    //Falta declarar los 5 objetos
    this.juegoEscape.escenario.objetos.forEach(elemento => {
      if (elemento.tipoDeObjeto == "objetoEscape") {
        this.objetosEscape.forEach(objetoEsca => {
          if (objetoEsca.nombre == elemento.nombre) {
            if (elemento.posicion == 1) {
              this.objeto1escape = objetoEsca;
            } if (elemento.posicion == 2) {
              this.objeto2escape = objetoEsca;
            } if (elemento.posicion == 3) {
              this.objeto3escape = objetoEsca;
            }
          }
        });
      } else {
        console.log("elemento dentro enigma: ", elemento);
        this.objetosEnigma.forEach(objetoEnig => {
          if (objetoEnig.nombre == elemento.nombre) {
            if (elemento.posicion == 4) {
              this.objeto1enigma = objetoEnig;
            } if (elemento.posicion == 5) {
              this.objeto2enigma = objetoEnig;
            }
          }
        });
      }
    });

    console.log("ESC 1: ", this.objeto1escape);
    console.log("ESC 2: ", this.objeto2escape);
    console.log("ESC 3: ", this.objeto3escape);

    console.log("ENIG 1: ", this.objeto1enigma);
    console.log("ENIG 2: ", this.objeto2enigma);


    this.recogido = this.objeto1escape.recogido;
    this.recogido2 = this.objeto2escape.recogido;
    this.recogido3 = this.objeto3escape.recogido;


    this.id = this.sesion.DameAlumno().id;
    this.estado = this.sesion.DameEstadoEscapeRoom();

    //Para mostrar el profesor o no

    this.showImage = true;

    if (this.estado === true) {
      this.showImage = true;
    }

    //Mochila
    console.log("MOCHILA¨: ", this.juegoEscape.mochila);

    //Elegir el mapa
    if (this.juegoEscape.escenario.mapa == "Baño") {
      this.varEscenario = "containerBaño";
    }
    else {
      if (this.juegoEscape.escenario.mapa == "Cocina") {
        this.varEscenario = "containerCocina";
      }
      else {
        this.varEscenario = "containerHabitacion";
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
  //ObjetoEnigma
  abrirObjeto(objeto) {
    console.log("Objeto: ", objeto);
    this.alertController.create({
      header: 'Enigma de la caja fuerte',
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
            this.juegoEscape.escenario.objetos.forEach(elemento => {
              console.log("HOLAAA: ", elemento.nombre);
              if (elemento.nombre == objeto.nombre) {
                console.log("PORQUE NO ENTRAS?");
                this.objetosEnigma.forEach(elemen => {
                  console.log("elemen nombre: ",elemen.nombre);
                  console.log("elemento nombre: ",elemento.nombre);

                  if (elemen.nombre == elemento.nombre) {
                    if (elemen.respuesta == data.Respuesta && elemen.resuelta == false) {
                      this.alertController.create({ message: "Perfecto!" }).then(res => {
                        res.present();
                        console.log("Elemen: s", elemen);
                        elemen.resuelta = true;
                        if (elemen.principal == true) {
                          console.log("Entra!");
                          this.conseguirPista(elemen);
                        } else { }
                      });
                    } else {
                      if(elemen.resuelta == true){
                        this.alertController.create({ message: "Ya has resuelto este acertijo!" }).then(res => {
                          res.present();
                        });
                      }else{
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
    });
  }
  conseguirPista(objetoEnigma) {

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

  }
  cogerObjeto(objeto) {

    if (objeto == this.objeto1escape.nombre) {
      if (this.objeto1escape.usable == true) {
        this.sesion.cambiaElEstadoDelObjeto(true, objeto);
        Swal.fire({
          title: '¿Seguro que quieres este objeto?   ' + objeto,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, estoy seguro'
        }).then((result) => {
          if (result.value) {
            this.calculos.añadirObjetoMochila(this.objeto1escape);
            this.reload();
          }
        });
      }
    }
    if (objeto == this.objeto2escape.nombre) {
      if (this.objeto2escape.usable == true) {
        this.sesion.cambiaElEstadoDelObjeto(true, objeto);
        Swal.fire({
          title: '¿Seguro que quieres este objeto?   ' + objeto,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, estoy seguro'
        }).then((result) => {
          if (result.value) {
            this.calculos.añadirObjetoMochila(this.objeto2escape);
            this.reload();
          }
        });
      }
    }
    if (objeto == this.objeto3escape.nombre) {
      if (this.objeto1escape.usable == true) {
        this.sesion.cambiaElEstadoDelObjeto(true, objeto);
        Swal.fire({
          title: '¿Seguro que quieres este objeto?   ' + objeto,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, estoy seguro'
        }).then((result) => {
          if (result.value) {
            this.calculos.añadirObjetoMochila(this.objeto3escape);
            this.reload();
          }
        });
      }
    }
  }
  guardarEscape() {
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
  close() {
    this.modalController.dismiss();
  }
  pasarAlSiguienteEscenario(){

      Swal.fire({
        title: '¿Tiene la llave que abre este portal?',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Sí',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          
          if(this.llave.recogido == true){
          this.router.navigateByUrl('segundo-escenario');
          }else{
            Swal.fire('Me parece aquí que alguien me esta mintiendo... Vuelve al escenario del crimen y encuentra la llave!', '', 'info');

          }
          }
      });
    }
}
