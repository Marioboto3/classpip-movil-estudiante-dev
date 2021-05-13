import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grupo } from '../clases';
import { JuegoDeEscapeRoom } from '../clases/JuegoDeEscapeRoom';
import { MALOJuegoDeEscapeRoom } from '../clases/MALOJuegoDeEscapeRoom';
import { CalculosService, PeticionesAPIService, SesionService } from '../servicios';

@Component({
  selector: 'app-juego-de-escape-room',
  templateUrl: './juego-de-escape-room.page.html',
  styleUrls: ['./juego-de-escape-room.page.scss'],
})
export class JuegoDeEscapeRoomPage implements OnInit {

  estado: boolean = false;
  grupo: Grupo;
  juego: MALOJuegoDeEscapeRoom;

  constructor(private router: Router, 
              private sesion: SesionService,
              private calculos: CalculosService,
              private peticionesAPI: PeticionesAPIService,) 
              { }

  ngOnInit() {
    this.juego = this.sesion.DameJuegoEscape();
    console.log("Juego: ", this.juego);
    this.estado = this.juego.estado;
  }

  nextpageEscojerPersonaje() {
    this.router.navigateByUrl('escoger-avatar');
  }

  nextpageContinuar() {
    this.router.navigateByUrl('primer-escenario');
  }
}
