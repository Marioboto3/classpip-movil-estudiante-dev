export class ObjetoEnigma {

  nombre: string;
  imagen: string;
  pregunta: string;
  respuesta: string;
  resuelto: boolean;
  posicion: number;
  escenaId: number;
  juegoDeEscapeRoomId: number;
  id: number;
  objetoGlobalId: number;
  objetoJuegoId: number;
  tipo: string;
  principal: boolean;

 // peso: number;

  constructor(nombre?: string, imagen?: string, pregunta?: string, respuesta?: string ,resuelto?: boolean, posicion?: number, escenaId?: number, juegoEscapeRoomId?: number, objetoGlobalId?: number, objetoJuegoId?: number, tipo?: string, principal?: boolean){

    this.nombre = nombre;
    this.imagen = imagen;
    this.pregunta = pregunta;
    this.respuesta = respuesta;
    this.resuelto = resuelto;
    this.posicion = posicion;
    this.escenaId = escenaId;
    this.juegoDeEscapeRoomId = juegoEscapeRoomId;
    this.objetoGlobalId = objetoGlobalId;
    this.objetoJuegoId = objetoJuegoId;
    this.tipo = tipo;
    this.principal = principal;

  }
}