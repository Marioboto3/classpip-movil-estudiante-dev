import { Escenario } from "./Escenario";

export class MALOJuegoDeEscapeRoom {
    id: number;
    grupoId: number;
    NombreJuego: string;
    escenario: Escenario;
    Modo: string;
    JuegoActivo: boolean;
    Tipo: string;
    JuegoEscapeId: number;
    estado: boolean;

  
    constructor( modo?: string, grupoId?: number, nombreJuego?: string, escenario?: Escenario, juegoActivo?: boolean, tipo?: string, juegoEscapeId?: number, estado?: boolean) {
      this.grupoId = grupoId;
      this.escenario = escenario;
      this.NombreJuego = nombreJuego;
      this.Modo = modo;
      this.JuegoActivo=juegoActivo;
      this.Tipo = tipo;
      this.JuegoEscapeId = juegoEscapeId;
      this.estado = estado;
    }
  }