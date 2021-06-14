import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PistasMochilaPage } from './pistas-mochila.page';
import { MatButtonModule, MatIconModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: PistasMochilaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PistasMochilaPage]
})
export class PistasMochilaPageModule {}
