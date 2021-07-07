import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoDeEscapeRoom } from 'src/app/clases/JuegoDeEscapeRoom';
import { ObjetoEscape } from 'src/app/clases/objetoEscape';
import { CalculosService, PeticionesAPIService, SesionService } from 'src/app/servicios';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlertController } from '@ionic/angular';
import { ObjetoPista } from 'src/app/clases/ObjetoPista';
import { ObjetoGlobalEscape } from 'src/app/clases/ObjetoGlobalEscape';
import { ObjetoEnigma } from 'src/app/clases/ObjetoEnigma';
import { ObjetoJuego } from 'src/app/clases/ObjetoJuego';
import { EscenaDeJuego } from 'src/app/clases/EscenaDeJuego';



@Component({
  selector: 'app-mochila',
  templateUrl: './mochila.page.html',
  styleUrls: ['./mochila.page.scss'],
})
export class MochilaPage implements OnInit {

  juegoEscape: JuegoDeEscapeRoom;

  estancia: string;

  mapObjetosEscapeFromObjetosJuego: Map<number, Map<number, ObjetoEscape>> = new Map<number, Map<number, ObjetoEscape>>(); //todos
  listaObjetosEscapeNoUsados: ObjetoEscape[] = [];
  pistasGuardadas: ObjetoPista[] = [];
  mapEscenas: Map<number, EscenaDeJuego> = new Map<number, EscenaDeJuego>();


  constructor(private router: Router,
    private sesion: SesionService,
   private alertController: AlertController) { }

  ngOnInit() {

    this.mapObjetosEscapeFromObjetosJuego = this.sesion.DameMapObjetosEscapeFromObjetosJuego();
    this.mapEscenas = this.sesion.DameMapEscenas();
    this.mapEscenas.forEach(escena =>{
      
     Array.from(this.mapObjetosEscapeFromObjetosJuego.get(escena.id).values()).forEach(objetoEscape =>{

      if(objetoEscape.usado == false && objetoEscape.recogido == true && objetoEscape.usado == false){
        this.listaObjetosEscapeNoUsados.push(objetoEscape);
      }
     });
    });
    
  }

  reload() {
    this.ngOnInit();
  }
  ionViewWillEnter() {
  //  this.reload();
  }

  volver() {

    this.router.navigateByUrl('primer-escenario');
    
  }

  ensenarObjeto(objeto: ObjetoGlobalEscape) {
    this.alertController.create({
      header: objeto.nombre,
      message: '<img src="../../../assets/escape-room/objetos/' + objeto.nombre + '.png">',
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Dejar',
          handler: (data: any) => {
            this.alertController.create({ message: "Devuelto a su sitio!" }).then(res => {

            });
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  mostrarTodasLasPistas() {
    this.router.navigateByUrl('pistas-mochila');

  }

}
