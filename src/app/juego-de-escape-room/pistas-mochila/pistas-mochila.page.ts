import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoDeEscapeRoom } from 'src/app/clases/JuegoDeEscapeRoom';
import { ObjetoEscape } from 'src/app/clases/objetoEscape';
import { CalculosService, PeticionesAPIService, SesionService } from 'src/app/servicios';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlertController } from '@ionic/angular';
import { ObjetoPista } from 'src/app/clases/ObjetoPista';


@Component({
  selector: 'app-pistas-mochila',
  templateUrl: './pistas-mochila.page.html',
  styleUrls: ['./pistas-mochila.page.scss'],
})
export class PistasMochilaPage implements OnInit {

  juegoEscape: JuegoDeEscapeRoom;

  objetos: ObjetoEscape[] = [];

  pistasGuardadas: ObjetoPista [] = [];
  mostarPistasVar: boolean = false;

  constructor(private router: Router,
    private sesion: SesionService,
    private calculos: CalculosService,
    private peticionesAPI: PeticionesAPIService,
    private alertController: AlertController) { }

  ngOnInit() {

    this.juegoEscape = this.sesion.DameJuegoEscapeRoom();
    this.objetos = this.sesion.DameObjetosEscape();
    this.pistasGuardadas = this.juegoEscape.mochila.pistasGuardadas;

  }
  reload() {
    this.ngOnInit();
  }
  ionViewWillEnter() {
    this.reload();
  }
  mostrarPista (pista: ObjetoPista){
    this.alertController.create({
      header: pista.nombre,
      message: pista.texto,
      buttons: [
        {
          text: 'Volver',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  volver() {
    this.router.navigateByUrl('mochila');
  }
}
