import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: () => import('./components/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'product-item/:productId',
    loadChildren: () => import('./components/product-item/product-item.module').then( m => m.ProductItemPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./components/add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'local',
    loadChildren: () => import('./components/local/local.module').then( m => m.LocalPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./components/category/category.module').then( m => m.CategoryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
