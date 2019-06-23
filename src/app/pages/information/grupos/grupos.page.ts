import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TwitterService } from '../../../services/social/twitter.service';
import { Status } from 'src/app/models/social/twitter_model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {
  login:boolean = false;
  name:string;
  imagen:string;
  nombre:string;
  tweets:Status[] = [];
  constructor(private modal:ModalController, private router:Router,
    private params:NavParams,
    private twitter:TwitterService,
    private iab:InAppBrowser) { }

  ngOnInit() {
    this.name = this.params.get('name');
    this.imagen = this.params.get('imagen');
    this.nombre = this.params.get('nombre');
    this.twitter.getTweets(this.name)
    .subscribe((tweet:any)=>{
      this.tweets = tweet.cuerpo.statuses;
      console.log(this.tweets)
    })
    
  }
  back(){
    this.modal.dismiss();
  }
  ver_completo(url){
    this.iab.create(`${url}/`,"_blank");
  }
}
