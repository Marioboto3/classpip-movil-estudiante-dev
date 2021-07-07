export class MiAlumnoAMostrarJuegoDeGeocaching {

    puntuacion: number;
    etapa: number;
    alumnoId: number;
    juegoDeGeocachingId: number;
    id: number;
    nombre: string;
    primerApellido: string;
    imagenPerfil: string;
  
    constructor(alumnoId?: number, juegoDeGeocachingId?: number, puntuacion?: number, etapa?: number,
                nombre?: string, primerApellido?: string, imagenPerfil?: string) {
  
      this.alumnoId = alumnoId;
      this.juegoDeGeocachingId = juegoDeGeocachingId;
      this.puntuacion = puntuacion;
      this.etapa = etapa;
      this.nombre = nombre;
      this.primerApellido = primerApellido;
      this.imagenPerfil = imagenPerfil;
  
    }
  }