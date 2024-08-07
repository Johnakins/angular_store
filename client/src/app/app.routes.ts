import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [{
  path: "home",
  component: HomeComponent
},{
  path: "cart",
  component: CartComponent
},
{path: "", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}