import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { DbaService } from 'src/app/services/data/dba.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  option = false;
  
  constructor(private auth:AngularFireAuth,
    private dba:DbaService,
    private alert:AlertController,
    private router:Router) { }
  
  ngOnInit() {
    
  }
  login(email,password){
    console.log(email,password);
    this.auth.auth.signInWithEmailAndPassword(email,password)
    .then(()=>{
      let respuesta = this.dba.login(email);
      if(respuesta){
        this.router.navigate(['/home']);
      }
      else {
        this.show_mensaje(':(','Error en la conexión')
      }
    }).catch((error)=>{
      
      this.show_mensaje(error.code,error.message);
    })
  }
  async login_google(){
    let respuesta = await this.dba.ingresa_google();
    if(respuesta){
      this.router.navigate(['/home']);
    }
    else {
      this.show_mensaje(':(','Error de conexión');
    }
  }
  async show_mensaje(title:string, mensaje:string){
    let alert = await this.alert.create({
      header:title,
      subHeader:mensaje,
      buttons:['confirmar']
    });
    alert.present();
  }
  back(){
    this.router.navigate(['']);
  }
}
