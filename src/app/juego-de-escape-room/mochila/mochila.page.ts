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
              this.alertController.create({message: "Devuelto a su sitio!"}).then(res => {
              
              if (objeto.nombre == this.juegoEscape.escenario.objeto1.nombre)
              {
                this.juegoEscape = this.sesion.DameJuegoEscapeRoom();
                this.juegoEscape.escenario.objeto1.recogido = false;
              for(let i=0; i<this.juegoEscape.mochila.objetos.length; i++)
                  {
                     if( this.juegoEscape.mochila.objetos[i].nombre == objeto.nombre)
                     {
                      this.juegoEscape.mochila.objetos.forEach((value, index) => {
                        if(value==objeto) {
                          this.juegoEscape.mochila.objetos.splice(index,1)
                          console.log("Mostrar lista: ",this.juegoEscape.mochila.objetos);
                        }
                      });
                      this.objetos.forEach((value, index) => {
                        if(value==objeto) {
                          this.objetos.splice(index,1)
                          console.log("Objetos despues de borrar: ", this.objetos);
                         }}); 
                      } 
                  }
                    console.log("Como queda la lista? ", this.juegoEscape.mochila.objetos);
                    this.sesion.TomaJuegoEscapeRoom(this.juegoEscape);
                    res.present();
                    this.calculos.GuardaEscapeRoom();
                }
              if (objeto.nombre == this.juegoEscape.escenario.objeto2.nombre){
                this.juegoEscape = this.sesion.DameJuegoEscapeRoom();
                this.juegoEscape.escenario.objeto2.recogido = false;
                for(let i=0; i<this.juegoEscape.mochila.objetos.length; i++)
                {
                  if( this.juegoEscape.mochila.objetos[i].nombre == objeto.nombre)
                     {
                      this.juegoEscape.mochila.objetos.forEach((value, index) => {
                        if(value==objeto) {
                          this.juegoEscape.mochila.objetos.splice(index,1)
                          console.log("Mostrar lista: ",this.juegoEscape.mochila.objetos);
                        }
                      });
                      this.objetos.forEach((value, index) => {
                        if(value==objeto) {
                          this.objetos.splice(index,1)
                          console.log("Objetos despues de borrar: ", this.objetos);
                         }}); 
                      } 
                    console.log("Como queda la lista? ", this.juegoEscape.mochila.objetos);
                } 
                this.sesion.TomaJuegoEscapeRoom(this.juegoEscape);
                res.present(); 
                this.calculos.GuardaEscapeRoom();
              }});
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
}
