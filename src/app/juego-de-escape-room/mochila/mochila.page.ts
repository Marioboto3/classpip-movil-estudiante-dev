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

  objetos: ObjetoEscape[] = [];
  objetosMochila: ObjetoEscape[] = [];

  constructor(private router: Router,
    private sesion: SesionService,
    private calculos: CalculosService,
    private peticionesAPI: PeticionesAPIService,
    private alertController: AlertController) { }

  ngOnInit() {

    this.juegoEscape = this.sesion.DameJuegoEscapeRoom();
    this.objetos = this.sesion.DameObjetosEscape();
    this.objetosMochila = this.juegoEscape.mochila.objetos;
  }

  volver() {
    this.router.navigateByUrl('primer-escenario');
  }

  ensenarObjeto(objeto: ObjetoEscape) {
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

              this.objetos.forEach(element => {

                if (objeto.nombre == element.nombre) {
                 
                  element.recogido = false;

                  for (let i = 0; i <this.objetosMochila.length; i++) {
                    if (this.objetosMochila[i].nombre == objeto.nombre) {
                      this.objetosMochila.forEach((value, index) => {
                        if (value == objeto) {
                          this.objetosMochila.splice(index, 1)
                          console.log("Mostrar lista: ", this.objetosMochila);
                        }
                      });
                      this.objetos.forEach((value, index) => {
                        if (value == objeto) {
                          value.recogido = false;
                          this.sesion.TomaObjetosEscape(this.objetos);
                          console.log("Objetos despues de borrar: ", this.objetos);
                        }
                      });
                    }
                  }
                  console.log("Como queda la lista? ", this.objetosMochila);
                  this.sesion.TomaJuegoEscapeRoom(this.juegoEscape);
                  this.sesion.TomaObjetosEscape(this.objetos);
                  res.present();
                  this.calculos.GuardaEscapeRoom();
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
}
