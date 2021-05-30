import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Howl } from 'howler';
import { Juego } from 'src/app/clases';
import { Audio } from 'src/app/clases/Audio';
import { JuegoDeEscapeRoom } from 'src/app/clases/JuegoDeEscapeRoom';
import { ObjetoEscape } from 'src/app/clases/ObjetoEscape';
import { CalculosService, SesionService } from 'src/app/servicios';
import Swal from 'sweetalert2';

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

  audioInicial: Audio = new Audio ("audio-inicial", "../../../assets/escape-room/audio-inicial.m4a");
  id: number;
  juegoEscape: JuegoDeEscapeRoom; 
  estado: boolean;
  recogido: boolean;
  objeto1: ObjetoEscape;
  objeto2: ObjetoEscape;

  constructor(private router: Router, private modalController: ModalController, private sesion: SesionService, private calculos: CalculosService) {}

  playlist: Audio[] = [
    {
      name: 'Audio',
      path: '../../../assets/escape-room/audio-inicial.m4a'
    },
    {
      name: 'Audio2',
      path: '../../../assets/escape-room/audio-inicial.m4a'
    }];
  
  reload(){
    this.ngOnInit();
  }
  ngOnInit() {  

    this.recogido = this.sesion.DamePrueba();
    this.id = this.sesion.DameAlumno().id;
    this.juegoEscape = this.sesion.DameJuegoEscapeRoom();
    this.estado = this.sesion.DameEstadoEscapeRoom();

    //Para mostrar el profesor o no
    if(this.estado === true){
      this.showImage = true;
    }

    //Mochila
    console.log("MOCHILA¨: ", this.juegoEscape.mochila);

    //Elegir el mapa
    if(this.juegoEscape.escenario.mapa == "Baño"){
      this.varEscenario = "containerBaño";}
    else{
      if (this.juegoEscape.escenario.mapa == "Cocina"){
        this.varEscenario = "containerCocina";
      } 
      else {
      this.varEscenario = "containerHabitacion";}
    }

    console.log("objeto1: ", this.juegoEscape.escenario.objeto1);
    console.log("objeto2: ", this.juegoEscape.escenario.objeto2);

    this.objeto1 = new ObjetoEscape (this.juegoEscape.escenario.objeto1.nombre, this.juegoEscape.escenario.objeto1.usable, this.juegoEscape.escenario.objeto1.recogido, this.juegoEscape.escenario.objeto1.posicion);
    this.objeto2 = new ObjetoEscape (this.juegoEscape.escenario.objeto2.nombre, this.juegoEscape.escenario.objeto2.usable, this.juegoEscape.escenario.objeto2.recogido, this.juegoEscape.escenario.objeto2.posicion);


  }

  activeTrack: Audio = null;
  player: Howl = null;
  isPlaying = false;
  
  start(){ 

    if (this.player){
      this.player.stop();
    }
    else{
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

togglePlayer(pause){
    this.isPlaying = !pause;
    if(pause){
      this.player.pause();
    } else {
      this.player.play();
    }
  }
escribir(){
  this.router.navigateByUrl('mapa');
}

abrirMochila(){
  this.router.navigateByUrl('mochila');
}

zoom(zoomIn: boolean){}

cogerObjeto(objeto){
  if (objeto == this.objeto1.nombre){
    if(this.objeto1.usable == true){
      this.sesion.TomaPrueba(true);
      Swal.fire({
        title: '¿Seguro que quieres este objeto?   ' + objeto,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro'
      }).then((result) => {
        if (result.value) {
          this.calculos.añadirObjetoMochila(this.objeto1);
          this.reload();
        }
      });
    }
  }if (objeto == this.objeto2.nombre){
    if(this.objeto2.usable == true){
      this.sesion.TomaPrueba(true);
      Swal.fire({
        title: '¿Seguro que quieres este objeto?   ' + objeto,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro'
      }).then((result) => {
        if (result.value) {
          this.calculos.añadirObjetoMochila(this.objeto2);
          this.reload();
        }
      });
    }
  }
}
close(){
  this.modalController.dismiss();
}
}
