import { Escenario } from "./Escenario";

export class JuegoDeEscapeRoom {
    id: number;
    grupoId: number;
    nombreJuego: string;
    escenario: Escenario;
    modo: string;
    juegoActivo: boolean;
    tipo: string;
    estado: boolean;
  
    constructor( modo?: string, grupoId?: number, nombreJuego?: string, escenario?: Escenario, juegoActivo?: boolean, tipo?: string, estado?: boolean) {
      this.grupoId = grupoId;
      this.escenario = escenario;
      this.nombreJuego = nombreJuego;
      this.modo = modo;
      this.juegoActivo=juegoActivo;
      this.tipo = tipo;
      this.estado = estado;
    }
  }