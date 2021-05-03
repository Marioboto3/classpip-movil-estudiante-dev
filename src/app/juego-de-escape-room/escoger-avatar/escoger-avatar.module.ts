import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EscogerAvatarPage } from './escoger-avatar.page';

const routes: Routes = [
  {
    path: '',
    component: EscogerAvatarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EscogerAvatarPage]
})
export class EscogerAvatarPageModule {}
