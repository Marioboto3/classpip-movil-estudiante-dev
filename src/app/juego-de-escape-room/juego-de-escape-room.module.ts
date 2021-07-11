import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JuegoDeEscapeRoomPage } from './juego-de-escape-room.page';

const routes: Routes = [
  {
    path: '',
    component: JuegoDeEscapeRoomPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JuegoDeEscapeRoomPage]
})
export class JuegoDeEscapeRoomPageModule {}
