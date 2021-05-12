import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Howl } from 'howler';
import { Juego } from 'src/app/clases';
import { Audio } from 'src/app/clases/Audio';
import { JuegoDeEscapeRoom } from 'src/app/clases/JuegoDeEscapeRoom';
import { MALOJuegoDeEscapeRoom } from 'src/app/clases/MALOJuegoDeEscapeRoom';
import { SesionService } from 'src/app/servicios';

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

  showImage: boolean;
  varEscenario: string;
  varEscenarioSinDifuminar: string;

  sliderOpts = {
    zoom: {
      maxRatio: 2
    }
  }
  audioInicial: Audio = new Audio ("audio-inicial", "../../../assets/escape-room/audio-inicial.m4a");
  id: number;
  juegoEscape: MALOJuegoDeEscapeRoom; 

  constructor(private router: Router, private modalController: ModalController, private sesion: SesionService) {}

  playlist: Audio[] = [
    {
      name: 'Audio',
      path: '../../../assets/escape-room/audio-inicial.m4a'
    },
    {
      name: 'Audio2',
      path: '../../../assets/escape-room/audio-inicial.m4a'
    }];
  
  ngOnInit() {  
    this.showImage = null ;
    this.id = this.sesion.DameAlumno().id;
    this.juegoEscape = this.sesion.DameJuegoEscape();
    console.log("Mapa: ", this.juegoEscape.escenario.Mapa);
    if(this.juegoEscape.escenario.Mapa == "Baño"){
      this.varEscenario = "containerBaño";
      this.varEscenarioSinDifuminar = "containerBañoSinDifuminar";}
    else{
      if (this.juegoEscape.escenario.Mapa == "Cocina"){
        this.varEscenario = "containerCocina";
        this.varEscenarioSinDifuminar = "containerCocinaSinDifuminar";
        console.log("ENTRA!");
      } 
      else {
      this.varEscenario = "containerHabitacion";
      this.varEscenarioSinDifuminar = "containerHabitacionSinDifuminar";}
    }
    console.log("Mapa: ", this.varEscenario);
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

zoom(zoomIn: boolean){}

close(){
  this.modalController.dismiss();
}
}
