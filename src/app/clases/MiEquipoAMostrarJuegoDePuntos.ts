export class MiEquipoAMostrarJuegoDePuntos {

  puntosTotalesEquipo: number;
  juegoDePuntosId: number;
  id: number;
  // nivelId: number;
  nombre: string;
  fotoEquipo: string;
  grupoId: number;

  constructor(juegoDePuntosId?: number, PuntosTotalesEquipo?: number,
              id?: number, Nombre?: string, grupoId?: number, FotoEquipo?: string) {

    this.juegoDePuntosId = juegoDePuntosId;
    this.id = id;
    this.puntosTotalesEquipo = PuntosTotalesEquipo;
    this.nombre = Nombre;
    this.fotoEquipo = FotoEquipo;
    this.grupoId = grupoId;

  }
}

