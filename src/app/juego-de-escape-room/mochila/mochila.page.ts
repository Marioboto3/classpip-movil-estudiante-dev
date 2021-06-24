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



@Component({
  selector: 'app-mochila',
  templateUrl: './mochila.page.html',
  styleUrls: ['./mochila.page.scss'],
})
export class MochilaPage implements OnInit {

  juegoEscape: JuegoDeEscapeRoom;

  estancia: string;

  objetosMochila: ObjetoGlobalEscape[] = [];

  objetosEnigma: ObjetoEnigma[] = [];
  objetosEscape: ObjetoEscape[] = [];
  objetosGlobales: ObjetoGlobalEscape [] = [];

  objetosEnigmaPrimerEscenario: ObjetoEnigma[] = [];
  objetosEscapePrimerEscenario: ObjetoEscape[] = [];
  objetosGlobalesPrimerEscenario: ObjetoGlobalEscape [] = [];

  pistasGuardadas: ObjetoPista[] = [];

  constructor(private router: Router,
    private sesion: SesionService,
    private calculos: CalculosService,
    private peticionesAPI: PeticionesAPIService,
    private alertController: AlertController) { }

  ngOnInit() {

    this.estancia = this.sesion.DameEstanciaEscenario();
    this.juegoEscape = this.sesion.DameJuegoEscapeRoom();
    this.objetosMochila = this.sesion.DameObjetosMochila();
    this.pistasGuardadas = this.sesion.DamePistasGuardadas();

    this.objetosEscape = this.sesion.DameObjetosEscapeSegundoEscenario();
    this.objetosEnigma = this.sesion.DameObjetosEnigmaSegundoEscenario();
    this.objetosGlobales = this.sesion.DameObjetosGlobalesSegundoEscenario();

    this.objetosEscapePrimerEscenario = this.sesion.DameObjetosEscape();
    this.objetosEnigmaPrimerEscenario = this.sesion.DameObjetosEnigma();
    this.objetosGlobalesPrimerEscenario = this.sesion.DameObjetosGlobalesPrimerEscenario();
  }

  reload() {
    this.ngOnInit();
  }
  ionViewWillEnter() {
    this.reload();
  }

  volver() {

    if (this.estancia == "Principal") {
      this.router.navigateByUrl('primer-escenario');
    } else {
      this.router.navigateByUrl('segundo-escenario');
    }
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

              this.objetosMochila.forEach((element, index) => {

                if (objeto.id == element.id) {

                  // element.recogido = false;

                  this.objetosMochila.splice(index, 1)
                  console.log("Mostrar lista: ", this.objetosMochila);
                  this.sesion.TomaObjetosMochila(this.objetosMochila);
                  
               /*   if(objeto.escenario == "Principal"){
                    this.objetosGlobalesPrimerEscenario.forEach(elemento =>{
                      if(elemento.id == objeto.id){
                        elemento.recogido = false;
                      }
                    });
                    this.sesion.TomaObjetosGlobalesPrimerEscenario(this.objetosGlobalesPrimerEscenario);
                  }else{
                    this.objetosGlobales.forEach(elemento =>{
                      if(elemento.id == objeto.id){
                        elemento.recogido = false;
                      }
                    });
                    this.sesion.TomaObjetosGlobalesSegundoEscenario(this.objetosGlobales);
                  }              
                  */
                  console.log("Como queda la lista? ", this.objetosMochila);
                  res.present();
                }
              });
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
