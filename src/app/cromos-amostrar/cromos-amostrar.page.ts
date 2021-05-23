import { Component, OnInit } from '@angular/core';
import { SesionService} from '../servicios/sesion.service';
import { CalculosService } from '../servicios/calculos.service';
import { PeticionesAPIService} from '../servicios/index';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Equipo, Juego, Cromo, Alumno } from '../clases';

@Component({
  selector: 'app-cromos-amostrar',
  templateUrl: './cromos-amostrar.page.html',
  styleUrls: ['./cromos-amostrar.page.scss'],
})
export class CromosAMostrarPage implements OnInit {

  juegoSeleccionado: Juego;
  miequipo: Equipo;
  mialumno: Alumno;
  misImagenesCromo: string[] = [];
  misCromos: Cromo[] = [];
  listaCromosSinRepetidos: any [];
  cromosQueNoTengo: any[] = [];
  imagenesCromosQueNoTengo: string[] = [];

  constructor(
    public navCtrl: NavController,
    private sesion: SesionService,
    private calculos: CalculosService,
    private peticionesAPI: PeticionesAPIService,
  ) { }

  ngOnInit() {
    this.juegoSeleccionado = this.sesion.DameJuego();
    if (this.juegoSeleccionado.modo === 'Individual') {
      this.mialumno = this.sesion.DameAlumnoJuegoDeColeccion();
      this.peticionesAPI.DameInscripcionAlumnoJuegoDeColeccion(this.juegoSeleccionado.id, this.mialumno.id).subscribe(
        InscripcionAlumno => {
          this.peticionesAPI.DameCromosAlumno(InscripcionAlumno[0].id).subscribe(
            cromos => {
              console.log(cromos);
              this.misCromos = cromos;
              this.listaCromosSinRepetidos = this.calculos.GeneraListaSinRepetidos(this.misCromos);
              console.log(this.listaCromosSinRepetidos);
              this.sesion.TomaCromosSinRepetidos(this.listaCromosSinRepetidos);
              this.misImagenesCromo = this.calculos.VisualizarLosCromosDelante(this.listaCromosSinRepetidos);
              this.peticionesAPI.DameCromosColeccion(this.juegoSeleccionado.coleccionId).subscribe(
                TodosLosCromos => {
                  this.cromosQueNoTengo = this.calculos.DameCromosQueNoTengo(this.misCromos, TodosLosCromos);
                  this.imagenesCromosQueNoTengo = this.calculos.VisualizarLosCromosDelante(this.cromosQueNoTengo);
                });
              console.log('Cromos que no tengo:');
              console.log(this.cromosQueNoTengo);
            });
        });
      // this.listaCromosSinRepetidos = this.calculos.GeneraListaSinRepetidos(this.MisCromos);
      console.log(this.misCromos);
      console.log(this.listaCromosSinRepetidos);
      // this.listaCromosSinRepetidos.sort((a, b) => a.cromo.Nombre.localeCompare(b.cromo.Nombre));

      // this.MisImagenesCromo = this.calculos.VisualizarCromosDelAlumno(this.MisCromos);
    } else {
      this.miequipo = this.sesion.DameEquipo();
      this.peticionesAPI.DameInscripcionEquipoJuegoDeColeccion(this.juegoSeleccionado.id, this.miequipo.id).subscribe(
        InscripcionEquipo => {
          this.peticionesAPI.DameCromosEquipo(InscripcionEquipo[0].id).subscribe(
            cromos => {
              console.log(cromos);
              this.misCromos = cromos;
              this.listaCromosSinRepetidos = this.calculos.GeneraListaSinRepetidos(this.misCromos);
              console.log(this.listaCromosSinRepetidos);
              this.misImagenesCromo = this.calculos.VisualizarLosCromosDelante(this.listaCromosSinRepetidos);
              this.peticionesAPI.DameCromosColeccion(this.juegoSeleccionado.coleccionId).subscribe(
                TodosLosCromos => {
                  this.cromosQueNoTengo = this.calculos.DameCromosQueNoTengo(this.misCromos, TodosLosCromos);
                  this.imagenesCromosQueNoTengo = this.calculos.VisualizarLosCromosDelante(this.cromosQueNoTengo);
                });
            });
        });
      console.log(this.misImagenesCromo);
    }
  }


}
