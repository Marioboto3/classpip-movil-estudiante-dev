export class MiAlumnoAMostrarJuegoDePuntos {

  PuntosTotalesAlumno: number;
  alumnoId: number;
  juegoDePuntosId: number;
  id: number;
  nivelId: number;
  nombre: string;
  primerApellido: string;
  imagenPerfil: string;

  constructor(alumnoId?: number, juegoDePuntosId?: number, PuntosTotalesAlumno?: number,
              nivelId?: number, Nombre?: string, primerApellido?: string, imagenPerfil?: string) {

    this.alumnoId = alumnoId;
    this.juegoDePuntosId = juegoDePuntosId;
    this.nivelId = nivelId;
    this.PuntosTotalesAlumno = PuntosTotalesAlumno;
    this.nombre = Nombre;
    this.primerApellido = primerApellido;
    this.imagenPerfil = imagenPerfil;

  }
}

