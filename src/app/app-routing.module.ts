import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { path: '', loadChildren: './pages/information/enterate/enterate.module#EnteratePageModule' },
  { path: 'login', loadChildren: './pages/ingreso/login/login.module#LoginPageModule' },
  { path: 'registrarse', loadChildren: './pages/ingreso/registrarse/registrarse.module#RegistrarsePageModule' },
  { path: 'type-user', loadChildren: './pages/ingreso/type-user/type-user.module#TypeUserPageModule' },
  { path: 'vet-registro', loadChildren: './pages/ingreso/registrarse/vet-registro/vet-registro.module#VetRegistroPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'rastreo', loadChildren: './pages/rastreo/rastreo.module#RastreoPageModule' },
  { path: 'notificaciones', loadChildren: './pages/home/notificaciones/notificaciones.module#NotificacionesPageModule' },
  { path: 'eventos', loadChildren: './pages/home/eventos/eventos.module#EventosPageModule' },
  { path: 'veterinarias', loadChildren: './pages/home/veterinarias/veterinarias.module#VeterinariasPageModule' },
  
  { path: 'account', loadChildren: './pages/home/account/account.module#AccountPageModule' },
  { path: 'update', loadChildren: './pages/home/account/update/update.module#UpdatePageModule' }
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
