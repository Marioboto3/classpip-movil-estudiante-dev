import { EscenarioEscapeRoom } from "./EscenarioEscapeRoom";
import { Mochila } from "./Mochila";

export class JuegoDeEscapeRoom {
    id: number;
    grupoId: number;
    nombreJuego: string;
    escenario: EscenarioEscapeRoom;
    modo: string;
    juegoActivo: boolean;
    tipo: string;
    estado: boolean;
    mochila: Mochila;
    idEscenario: number;
  
    constructor( modo?: string, grupoId?: number, nombreJuego?: string, escenario?: EscenarioEscapeRoom, juegoActivo?: boolean, tipo?: string, estado?: boolean, idEscenario?: number) {
      this.grupoId = grupoId;
      this.escenario = escenario;
      this.nombreJuego = nombreJuego;
      this.modo = modo;
      this.juegoActivo=juegoActivo;
      this.tipo = tipo;
      this.estado = estado;
      this.mochila.idJuegoDeEscapeRoom = 0;
      this.mochila.objetos = [];
      this.idEscenario = idEscenario;
    }
  }