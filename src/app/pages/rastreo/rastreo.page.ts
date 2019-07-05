import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform, Events } from '@ionic/angular';
import { User_pets } from '../../models/usuarios/user_pets';
import { DbaService } from '../../services/data/dba.service';
import { PopoverController } from '@ionic/angular';
import { PopperComponent } from '../home/popper/popper.component';

declare var google;
@Component({
  selector: 'app-rastreo',
  templateUrl: './rastreo.page.html',
  styleUrls: ['./rastreo.page.scss'],
})
export class RastreoPage implements OnInit {
  @ViewChild('map') mapElement:ElementRef;
  posicion_mascota;
  currentMapTrack = null;
  usuario:User_pets;
  trackedRoute = [];
  previousTracks = [];
  mapa: HTMLElement;  
  map:any;
  positionSubscription:Subscription;
  constructor(private router:Router,
    private geolocation:Geolocation,
    private platform:Platform,
    private storage:Storage,
    private dba:DbaService,
    private popper:PopoverController,
    private eventos:Events) { }

  ngOnInit() {
    this.platform.ready().then(()=>{
      this.mapa = document.getElementById('map');
      this.eventos.subscribe("login",(user)=>{
        this.usuario = user;
      })
      this.eventos.subscribe("close_sesion",()=>{
        this.router.navigate(['']);
      })
      this.usuario = this.dba.getUsuario();
      
      this.load_map();
      
      this.buscar_mascota(this.usuario.mascotas[0].pet_name);
        
    })
  }
  buscar_mascota(pet){
    this.dba.rastreo(pet).subscribe(((position:any)=>{
      let lat = parseFloat(position[0].latitud);
      let lng = parseFloat(position[0].longitud);
      let pos = {
        lat,
        lng 
      }
      console.log(pos);
      this.posicion_mascota = new google.maps.InfoWindow;
      this.posicion_mascota.setPosition(pos);
      this.posicion_mascota.setContent(`${pet} esta aqui`);
      
      this.previousTracks.push(pos);
      this.storage.set("routes",this.previousTracks);
      this.trackedRoute.push(pos);
      this.drawlines(pet);
    }))
  }
  drawlines(pet){
    if (this.trackedRoute.length > 1){
      this.currentMapTrack = new google.maps.Polyline({
        path: this.trackedRoute,
        geodesic:true,
        strokeColor:'#ff00ff',
        strokeOpacity:1.0,
        strokeWeight:3
      });
      console.log(this.currentMapTrack);
      this.currentMapTrack.setMap(this.map);
      this.posicion_mascota.open(this.map);
    }
  }
  async select_pets(){
    let popover = await this.popper.create({
      component:PopperComponent,
      animated:true,
      componentProps:{
        mascotas:this.usuario.mascotas
      }
    })
    popover.present();
    const {data} = await popover.onDidDismiss();
    this.buscar_mascota(data.pet);
  }
  
  navegar(url){
    this.router.navigate([`/${url}`]);
  }
  async load_map(){
    let localization = await this.geolocation.getCurrentPosition();
    let current = {
      lat: localization.coords.latitude,
      lng: localization.coords.longitude
    }
    console.log(current);
    const infoWindow = new google.maps.InfoWindow;
    infoWindow.setPosition(current);
    infoWindow.setContent(`${this.usuario.name} esta aqui`);
    
    console.log(infoWindow);
    this.trackedRoute.push(current);
     
    this.map = new google.maps.Map(this.mapa,{
      center: current,
      zoom:15,
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      draggingCursor: 'url(https://image.flaticon.com/icons/svg/33/33622.svg), auto;',
      streetViewControl: false,
      fullscreenControl:false 
    });
    infoWindow.open(this.map);
  }
}
