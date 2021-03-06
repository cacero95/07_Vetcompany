import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// peticiones http
import {HttpClientModule} from '@angular/common/http';
//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
// lenguage
import localeCO from '@angular/common/locales/es-CO';
import localeCOExtra from '@angular/common/locales/extra/es-CO';
import { registerLocaleData } from '@angular/common';
// plugins
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// entry components
import { GruposPage } from './pages/information/grupos/grupos.page';

import { MascotasPage } from './pages/ingreso/registrarse/mascotas/mascotas.page';
import { TypeUserPage } from './pages/ingreso/type-user/type-user.page';
import { IonicStorageModule } from '@ionic/storage';
import { PopperComponent } from './pages/home/popper/popper.component';
import { ConsejosPage } from './pages/information/consejos/consejos.page';
import { ChatPage } from './pages/home/chat/chat.page';
import { UpdatePage } from './pages/home/account/update/update.page';
import { LogInGuard } from './guards/log-in.guard';
import { EventsComponent } from './pages/home/eventos/events/events.component';

export const firebaseConfig = {
  apiKey: "AIzaSyBVY89FFlPr00IH6TuWsszn0CgpFn0ZkA0",
  authDomain: "gag-6f2a5.firebaseapp.com",
  databaseURL: "https://gag-6f2a5.firebaseio.com",
  projectId: "gag-6f2a5",
  storageBucket: "gag-6f2a5.appspot.com",
  messagingSenderId: "645855939410"
};

registerLocaleData(localeCO,'es',localeCOExtra);
@NgModule({
  declarations: [AppComponent,GruposPage,TypeUserPage,MascotasPage,PopperComponent,ConsejosPage,
    ChatPage,UpdatePage,EventsComponent
  ],
  entryComponents: [GruposPage,TypeUserPage,MascotasPage,PopperComponent,ConsejosPage,
    ChatPage,UpdatePage,EventsComponent],
  imports: [BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireAuthModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    Geolocation,
    LogInGuard,
    ImagePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
