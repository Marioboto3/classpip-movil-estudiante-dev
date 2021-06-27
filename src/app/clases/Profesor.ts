export class Profesor {
  Nombre: string;
  Apellido: string;
  imagenPerfil: string;
  id: number;

  constructor(nombre?: string, apellido?: string, imagenPerfil?: string, id?: number) {

    this.Nombre = nombre;
    this.Apellido = apellido;
    this.imagenPerfil = imagenPerfil;
    this.id = id;
  }
}
