export class AlumnoJuegoDeGeocaching {
    
  alumnoId: number;
  juegoDeGeocachingId: number;
  id: number;
  puntuacion: number;
  etapa: number;

  constructor(alumnoId?: number, juegoDeGeocachingId?: number, Puntuacion?: number, Etapa?: number) {

    this.alumnoId = alumnoId;
    this.juegoDeGeocachingId = juegoDeGeocachingId;
    this.puntuacion = Puntuacion;
    this.etapa = Etapa;

  }
}
