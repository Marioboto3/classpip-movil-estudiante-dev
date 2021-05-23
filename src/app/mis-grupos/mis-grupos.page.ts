import { Component, OnInit,ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { PeticionesAPIService} from '../servicios/index';
import { CalculosService } from '../servicios/calculos.service';
import { SesionService} from '../servicios/sesion.service';
import { Grupo, Alumno, Equipo, AlumnoJuegoDeVotacionTodosAUno } from '../clases/index';
import * as URL from '../URLs/urls';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-mis-grupos',
  templateUrl: './mis-grupos.page.html',
  styleUrls: ['./mis-grupos.page.scss'],
})
export class MisGruposPage implements OnInit {
  @ViewChild('accordion', {static: false}) accordion: MatAccordion;

  grupos: Grupo[];
  alumno: Alumno;
  listaGruposYAlumnos: any;
  listaGruposYEquipos: any [];
  tipo: string;
  equiposDelAlumno: Equipo[];
  equipoElegido: Equipo;
  alumnosEquipo: Alumno[];
  mostrarAlumnos = true;
  mostrarEquipos = false;
  equiposDelGrupo: Equipo[];

  constructor(
    private peticionesAPI: PeticionesAPIService,
    private sesion: SesionService,
    private calculos: CalculosService,
  ) { }

  ngOnInit() {
    this.alumno = this.sesion.DameAlumno();
    this.peticionesAPI.DameEquiposDelAlumno (this.alumno.id)
    .subscribe (equipos => this.equiposDelAlumno = equipos);
    this.peticionesAPI.DameGruposAlumno(this.alumno.id).subscribe(
      misGrupos => {
        console.log ('ya tengo los grupos');
        this.grupos = misGrupos;
        console.log(this.grupos);
        this.calculos.DameLosGruposYLosAlumnos(this.grupos)
        .subscribe (lista => {
          this.listaGruposYAlumnos = lista;
          console.log ('listaGruposYAlumnos');
          console.log (this.listaGruposYAlumnos);
         
        });

        this.calculos.DameLosGruposYLosEquipos(this.grupos)
        .subscribe (lista =>  {
          this.listaGruposYEquipos = lista;
          console.log ('equipos');
          console.log (this.listaGruposYEquipos);
        });
      });
  }
 
  ionViewWillEnter (){
    this.tipo = "Alumnos";
  }
  SeleccionarLogo($event) {
  
    console.log ('Cambio logo del equipo');
    console.log (this.equiposDelAlumno);
    const imagen = $event.target.files[0];
    const formData = new FormData();
    formData.append(imagen.name, imagen);
    this.peticionesAPI.PonLogoEquipo(formData)
    .subscribe (() => {
      this.equipoElegido.fotoEquipo = URL.LogosEquipos + imagen.name;
      this.peticionesAPI.ModificaEquipo (this.equipoElegido).subscribe();
     });
  }

  CambiarLogo(equipo: Equipo){
    console.log ('voy a cambiar el logo del equipo');
    console.log (equipo);
    this.equipoElegido = equipo;
    if (equipo.fotoEquipo !== undefined) {
      // primero borro el logo si tiene
      // la foto viene con toda la URL y solo quiero el nombre del fichero
      // para borrarlo, que viene al final
      const url = equipo.fotoEquipo.split ('/');
      const imagen = url[url.length - 1];

      this.peticionesAPI.BorraLogoEquipo (imagen).subscribe ();
    }

    document.getElementById('inputLogo').click();
  }

  QuitarLogo(equipo: Equipo) {
    // la foto viene con toda la URL y solo quiero el nombre del fichero
    // para borrarlo, que viene al final
    const url = equipo.fotoEquipo.split ('/');
    const imagen = url[url.length - 1];

    this.peticionesAPI.BorraLogoEquipo (imagen).subscribe ();
    equipo.fotoEquipo = undefined;
    console.log ('voy a modificar el equipo');
    console.log (equipo);
    this.peticionesAPI.ModificaEquipo (equipo)
    .subscribe(e => console.log (e));


  }
  EsMiEquipo(equipo: Equipo) {
    return this.equiposDelAlumno.some (e => e.id === equipo.id);
  }
  TraeAlumnosEquipo(equipo) {
    console.log ('voy a traer los alumnos del equipo');
    console.log (equipo);
    this.peticionesAPI.DameAlumnosEquipo (equipo.id)
    .subscribe (alumnos => this.alumnosEquipo = alumnos);
    this.accordion.closeAll();
  }

  TraeEquiposGrupo (nombreGrupo) {
    const grupoId = this.grupos.find (grupo => grupo.nombre = nombreGrupo).id;
    this.peticionesAPI.DameEquiposDelGrupo (grupoId)
    .subscribe (equipos => {
      this.equiposDelGrupo = equipos;
      console.log ('equipos del grupo');
      console.log (this.equiposDelGrupo);
    });
  }
}
