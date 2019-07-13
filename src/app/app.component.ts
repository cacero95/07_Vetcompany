import { Component } from '@angular/core';

import { Platform, ModalController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { TypeUserPage } from './pages/ingreso/type-user/type-user.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {


  select_menu = 0;
  menuVet = [
    {title:'Principal', url:'/home', icon:'home'},
    {title:'Calendario', url:'/eventos', icon:'calendar'},
    {title:'Mensajes', url:'/notificaciones',icon:'chatbubbles'},
    {title:'Enterate', url:'',icon:'quote'},
    {title:'Cuenta', url:'account', icon:'contact'}
  ]
  menuUser = [
    {title:'Tu mascota', url:'/rastrear', icon:'locate'},
    {title:'Calendario', url:'/eventos', icon:'calendar'},
    {title:'Mensajes', url:'/notificaciones',icon:'chatbubbles'},
    {title:'Principal', url:'/home', icon:'home'},
    {title:'Enterate', url:'',icon:'quote'},
    {title:'Cuenta', url:'account', icon:'contact'}
  ];
  appMenu = [
    
    {title: 'Entrar', url: '/login', icon: 'md-contact'},
    {title: 'Registrarse', url:'/registrarse', icon:'md-arrow-round-up'},
    {title: 'Enterate', url: '/enterate', icon: 'information-circle-outline'},
    
  ];
  status = 'no';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private modal:ModalController,
    private eventos:Events
  ) {
    this.initializeApp();
    this.menu_update();
  }
  menu_update(){
    this.eventos.subscribe("login",(user)=>{
      if (user.type == 'institute'){
        this.select_menu = 2;
      }
      else {
        this.select_menu = 1;
      }
    })
    this.eventos.subscribe("close_sesion",()=>{
      this.select_menu = 0;
    })
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async navegar(url){
    
    switch (url){
      case '/registrarse':
        let modal = await this.modal.create({
          component:TypeUserPage
        });
        modal.present();
        const {data} = await modal.onDidDismiss();
        
        if(data.salida == 'institute'){
          this.router.navigate(['/vet-registro']);

        }
        else {
          console.log(data.salida);
          this.router.navigate(['/registrarse'])
        }
        
      break; 
      default:
        this.router.navigate([`/${url}`]);
    }
  }
}
