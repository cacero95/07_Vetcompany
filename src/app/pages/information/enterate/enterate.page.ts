import { Component, OnInit } from '@angular/core';
import { TwitterService } from 'src/app/services/social/twitter.service';
import { User } from 'src/app/models/grupos_animalistas';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DbaService } from 'src/app/services/data/dba.service';
import { PetData } from 'src/app/models/pet_data/pet_data';
import { ModalController } from '@ionic/angular';
import { GruposPage } from '../grupos/grupos.page';
import { ConsejosPage } from '../consejos/consejos.page';

@Component({
  selector: 'app-enterate',
  templateUrl: './enterate.page.html',
  styleUrls: ['./enterate.page.scss'],
})
export class EnteratePage implements OnInit {
  grupos:User[] = [];
  opcion = 'grupos';
  policial:PetData[] = [];
  tips:PetData[] = [];
  constructor(private social:TwitterService,
    private iab:InAppBrowser,
    private dba:DbaService,
    private modal:ModalController) { }

  ngOnInit() {
    this.grupos_animalistas();
    this.datos_mascotas();
  }
  grupos_animalistas(){
    this.social.grupos_animalistas()
    .subscribe((teams:any)=>{
      this.grupos = teams.cuerpo.users;
      
    })
  }
  change_option(option){
    this.opcion = option;
    
    
  }
  visitar(url){
    this.iab.create(`${url[0].expanded_url}/`,"_blank");
  }
  datos_mascotas(){
    this.dba.datos_mascotas().subscribe((data:any)=>{
      console.log(data);
      this.policial = data[0].policial;
      this.tips = data[1].tips;
      
    })
  }
  async ver_completo(consejo){
    let modal = await this.modal.create({
      component:ConsejosPage,
      componentProps:{
        consejo 
      }
    });
    modal.present();
  }
  async ver_tweets(name,imagen,nombre){
    let modal = await this.modal.create({
      component:GruposPage,
      componentProps:{
        name,imagen,nombre
      }
    });
    modal.present();
  }
}
