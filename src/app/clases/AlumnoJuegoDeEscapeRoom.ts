export class AlumnoJuegoDeEscapeRoom {

    alumnoId: number;
    personaje: string;
    juegoDeEscapeRoomId: number;
    id: number;

    constructor(alumnoId?: number, personaje?:string, juegoEscapeRoomId?: number) {
      this.alumnoId = alumnoId;
      this.personaje = personaje;
      this.juegoDeEscapeRoomId = juegoEscapeRoomId;
    }
  }
  