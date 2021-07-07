export class MiAlumnoAMostrarJuegoDePuntos {

  puntosTotalesAlumno: number;
  alumnoId: number;
  juegoDePuntosId: number;
  id: number;
  nivelId: number;
  nombre: string;
  primerApellido: string;
  imagenPerfil: string;

  constructor(alumnoId?: number, juegoDePuntosId?: number, puntosTotalesAlumno?: number,
              nivelId?: number, nombre?: string, primerApellido?: string, imagenPerfil?: string) {

    this.alumnoId = alumnoId;
    this.juegoDePuntosId = juegoDePuntosId;
    this.nivelId = nivelId;
    this.puntosTotalesAlumno = puntosTotalesAlumno;
    this.nombre = nombre;
    this.primerApellido = primerApellido;
    this.imagenPerfil = imagenPerfil;

  }
}

