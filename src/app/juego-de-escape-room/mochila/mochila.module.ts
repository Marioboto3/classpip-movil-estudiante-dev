import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MochilaPage } from './mochila.page';
import { MatButtonModule, MatIconModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: MochilaPage
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
  declarations: [MochilaPage]
})
export class MochilaPageModule {}
