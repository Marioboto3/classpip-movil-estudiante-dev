import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoDeEscapeRoom } from 'src/app/clases/JuegoDeEscapeRoom';
import { ObjetoEscape } from 'src/app/clases/objetoEscape';
import { CalculosService, PeticionesAPIService, SesionService } from 'src/app/servicios';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlertController } from '@ionic/angular';
import { ObjetoPista } from 'src/app/clases/ObjetoPista';
import { Pista } from 'src/app/clases/Pista';
import { ObjetoJuego } from 'src/app/clases/ObjetoJuego';


@Component({
  selector: 'app-pistas-mochila',
  templateUrl: './pistas-mochila.page.html',
  styleUrls: ['./pistas-mochila.page.scss'],
})
export class PistasMochilaPage implements OnInit {

  juegoEscape: JuegoDeEscapeRoom;

  pistasGuardadas: Pista [] = [];

  objetos: ObjetoEscape[] = [];

  mostarPistasVar: boolean = false;
  mapPistaPorEscena: Map<number, Pista> = new Map<number, Pista>();

  constructor(private router: Router,
    private sesion: SesionService,
    private calculos: CalculosService,
    private peticionesAPI: PeticionesAPIService,
    private alertController: AlertController) { }

  ngOnInit() {

  
    this.mapPistaPorEscena = this.sesion.DameMapPistaEscena();

    Array.from(this.mapPistaPorEscena.values()).forEach(pista =>{
      if(pista.recogido == true){
        this.pistasGuardadas.push(pista);
      }
    });
  }
  reload() {
    this.ngOnInit();
  }
  ionViewWillEnter() {
  //  this.reload();
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
