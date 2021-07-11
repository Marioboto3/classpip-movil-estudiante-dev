export class AlumnoJuegoDeVotacionTodosAUno {

  puntosTotales: number;
  id: number;
  alumnoId: number;
  juegoDeVotacionUnoATodosId: number;
  votosEmitidos: any[];
  votosRecibidos: any[];

  constructor(alumnoId?: number, juegoDeVotacionUnoATodosId?: number) {

    this.alumnoId = alumnoId;
    this.juegoDeVotacionUnoATodosId = juegoDeVotacionUnoATodosId;
    this.puntosTotales = 0;
    this.votosEmitidos = [];
    this.votosRecibidos = [];
  }
}
