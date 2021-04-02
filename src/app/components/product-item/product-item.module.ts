import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartsModule } from 'ng2-charts';

import { ProductItemPageRoutingModule } from './product-item-routing.module';

import { ProductItemPage } from './product-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    ProductItemPageRoutingModule
  ],
  declarations: [ProductItemPage]
})
export class ProductItemPageModule {}
