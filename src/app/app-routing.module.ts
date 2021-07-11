
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'slides', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'inici', loadChildren: './inici/inici.module#IniciPageModule', canActivate: [AuthGuard] },
  { path: 'juego-seleccionado', loadChildren: './juego-seleccionado/juego-seleccionado.module#JuegoSeleccionadoPageModule', canActivate: [AuthGuard] },
  { path: 'cromos-amostrar', loadChildren: './cromos-amostrar/cromos-amostrar.module#CromosAMostrarPageModule', canActivate: [AuthGuard] },
  { path: 'mi-perfil', loadChildren: './mi-perfil/mi-perfil.module#MiPerfilPageModule', canActivate: [AuthGuard] },
  { path: 'mis-grupos', loadChildren: './mis-grupos/mis-grupos.module#MisGruposPageModule', canActivate: [AuthGuard] },
  { path: 'mis-juegos-inactivos', loadChildren: './mis-juegos-inactivos/mis-juegos-inactivos.module#MisJuegosInactivosPageModule', canActivate: [AuthGuard] },
  { path: 'intercambiar-cromos', loadChildren: './intercambiar-cromos/intercambiar-cromos.module#IntercambiarCromosPageModule', canActivate: [AuthGuard] },
  { path: 'juegos-inactivos', loadChildren: './juegos-inactivos/juegos-inactivos.module#JuegosInactivosPageModule', canActivate: [AuthGuard] },
  { path: 'slides', loadChildren: './slides/slides.module#SlidesPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'mis-colecciones', loadChildren: './mis-colecciones/mis-colecciones.module#MisColeccionesPageModule', canActivate: [AuthGuard] },
  { path: 'juego-de-cuestionario', loadChildren: './juego-de-cuestionario/juego-de-cuestionario.module#JuegoDeCuestionarioPageModule', canActivate: [AuthGuard]},
  { path: 'juego-competicion-f1', loadChildren: './juego-competicion-f1/juego-competicion-f1.module#JuegoCompeticionF1PageModule', canActivate: [AuthGuard] },
  { path: 'juego-competicion-liga', loadChildren: './juego-competicion-liga/juego-competicion-liga.module#JuegoCompeticionLigaPageModule', canActivate: [AuthGuard] },
  { path: 'informacion-jornadas', loadChildren: './informacion-jornadas/informacion-jornadas.module#InformacionJornadasPageModule', canActivate: [AuthGuard] },
  { path: 'juego-colleccion', loadChildren: './juego-colleccion/juego-colleccion.module#JuegoColleccionPageModule', canActivate: [AuthGuard] },
  { path: 'juego-avatar', loadChildren: './juego-avatar/juego-avatar.module#JuegoAvatarPageModule', canActivate: [AuthGuard] },
  { path: 'avatar-editor', loadChildren: './avatar-editor/avatar-editor.module#AvatarEditorPageModule', canActivate: [AuthGuard] },
  
  { path: 'juego-puntos', loadChildren: './juego-puntos/juego-puntos.module#JuegoPuntosPageModule', canActivate: [AuthGuard] },
  { path: 'album-alumno', loadChildren: './album-alumno/album-alumno.module#AlbumAlumnoPageModule', canActivate: [AuthGuard] },

  { path: 'juego-de-geocaching', loadChildren: './juego-de-geocaching/juego-de-geocaching.module#JuegoDeGeocachingPageModule', canActivate: [AuthGuard] },
  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule', canActivate: [AuthGuard] },
  { path: 'ver-avatares-grupo', loadChildren: './ver-avatares-grupo/ver-avatares-grupo.module#VerAvataresGrupoPageModule', canActivate: [AuthGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'juego-votacion-uno-atodos', loadChildren: './juego-votacion-uno-atodos/juego-votacion-uno-atodos.module#JuegoVotacionUnoATodosPageModule', canActivate: [AuthGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'juego-votacion-todos-auno', loadChildren: './juego-votacion-todos-auno/juego-votacion-todos-auno.module#JuegoVotacionTodosAUnoPageModule', canActivate: [AuthGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'juego-cuestionario-satisfaccion', loadChildren: './juego-cuestionario-satisfaccion/juego-cuestionario-satisfaccion.module#JuegoCuestionarioSatisfaccionPageModule', canActivate: [AuthGuard] },
  { path: 'juego-votacion-rapida', loadChildren: './juego-votacion-rapida/juego-votacion-rapida.module#JuegoVotacionRapidaPageModule', canActivate: [AuthGuard] },
  { path: 'mis-juegos-inactivos', loadChildren: './mis-juegos-inactivos/mis-juegos-inactivos.module#MisJuegosInactivosPageModule', canActivate: [AuthGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'juego-de-escape-room', loadChildren: './juego-de-escape-room/juego-de-escape-room.module#JuegoDeEscapeRoomPageModule', canActivate: [AuthGuard] },
  { path: 'escoger-avatar', loadChildren: './juego-de-escape-room/escoger-avatar/escoger-avatar.module#EscogerAvatarPageModule', canActivate: [AuthGuard] },
  { path: 'primer-escenario', loadChildren: './juego-de-escape-room/primer-escenario/primer-escenario.module#PrimerEscenarioPageModule', canActivate: [AuthGuard] },
  { path: 'mochila', loadChildren: './juego-de-escape-room/mochila/mochila.module#MochilaPageModule', canActivate: [AuthGuard] },
  { path: 'pistas-mochila', loadChildren: './juego-de-escape-room/pistas-mochila/pistas-mochila.module#PistasMochilaPageModule',  canActivate: [AuthGuard] },
  { path: 'juego-coger-turno-rapido', loadChildren: './juego-coger-turno-rapido/juego-coger-turno-rapido.module#JuegoCogerTurnoRapidoPageModule', canActivate: [AuthGuard] },
  { path: 'juego-evaluacion', loadChildren: './juego-evaluacion/juego-evaluacion.module#JuegoEvaluacionPageModule', canActivate: [AuthGuard] }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


