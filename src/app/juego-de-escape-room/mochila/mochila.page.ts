import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoDeEscapeRoom } from 'src/app/clases/JuegoDeEscapeRoom';
import { ObjetoEscape } from 'src/app/clases/objetoEscape';
import { CalculosService, PeticionesAPIService, SesionService } from 'src/app/servicios';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-mochila',
  templateUrl: './mochila.page.html',
  styleUrls: ['./mochila.page.scss'],
})
export class MochilaPage implements OnInit {

  juegoEscape: JuegoDeEscapeRoom;
  objetos: ObjetoEscape [] = [];

  constructor(private router: Router, 
    private sesion: SesionService,
    private calculos: CalculosService,
    private peticionesAPI: PeticionesAPIService,
    private alertController: AlertController) { }

  ngOnInit() {
    
    this.juegoEscape = this.sesion.DameJuegoEscapeRoom();
    console.log("mochila objetos: ", this.juegoEscape.mochila.objetos);
    this.objetos = this.juegoEscape.mochila.objetos;
    console.log("objetos: ", this.objetos);
  }

  volver(){
    this.router.navigateByUrl('primer-escenario');
  }

  ensenarObjeto(objeto: ObjetoEscape){
    this.alertController.create({
      header: objeto.nombre,
      message: '<img src="../../../assets/escape-room/objetos/botella.png">',
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Usar',
          handler: (data: any) => {
              this.alertController.create({message: "Perfecto!"}).then(res => {
                res.present();
              });
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
}
