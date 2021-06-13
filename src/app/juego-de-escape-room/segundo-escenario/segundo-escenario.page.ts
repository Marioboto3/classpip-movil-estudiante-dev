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


@Component({
  selector: 'app-segundo-escenario',
  templateUrl: './segundo-escenario.page.html',
  styleUrls: ['./segundo-escenario.page.scss'],
})
export class SegundoEscenarioPage implements OnInit {

  juegoEscape: JuegoDeEscapeRoom;
  showImage: boolean = false;

  objetosEnigma: ObjetoEnigma[];
  objetosEscape: ObjetoEscape[];

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

    this.objetosEnigma = this.sesion.DameObjetosEnigma();
    this.objetosEscape = this.sesion.DameObjetosEscape();

    if (this.juegoEscape.escenarioSecundario.mapa == "baño") {
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

  }

}
