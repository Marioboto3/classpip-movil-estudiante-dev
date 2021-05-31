import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoDeEscapeRoom } from 'src/app/clases/JuegoDeEscapeRoom';
import { ObjetoEscape } from 'src/app/clases/objetoEscape';
import { CalculosService, PeticionesAPIService, SesionService } from 'src/app/servicios';

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
    private peticionesAPI: PeticionesAPIService) { }

  ngOnInit() {
    
    this.juegoEscape = this.sesion.DameJuegoEscapeRoom();
    console.log("mochila objetos: ", this.juegoEscape.mochila.objetos);
    this.objetos = this.juegoEscape.mochila.objetos;
    console.log("objetos: ", this.objetos);
  }

  volver(){
    this.router.navigateByUrl('primer-escenario');
  }

}
