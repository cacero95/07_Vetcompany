import { Component, OnInit } from '@angular/core';
import { Events, ModalController } from '@ionic/angular';
import { User_pets,Veterinarias } from 'src/app/models/usuarios/user_pets';
import { Router } from '@angular/router';
import { DbaService } from 'src/app/services/data/dba.service';
import { TwitterService } from '../../services/social/twitter.service';
import { Publicaciones } from 'src/app/models/social/twitter_model';
import { ChatPage } from './chat/chat.page';
import { Chats } from '../../models/usuarios/user_pets';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usuario:User_pets;
  vet:Veterinarias;
  publicaciones:Publicaciones[] = [];
  chats:boolean = false;
  user:any;
  usuarios:any[] = [];
  constructor(private eventos:Events,private router:Router,
    private dba:DbaService,private social:TwitterService,private modal:ModalController) { }

  ngOnInit() {
    
    this.social.get_publicaciones().subscribe((data:any)=>{
      this.publicaciones =  data;
    })

    
    
    this.eventos.subscribe("login",(user)=>{
      this.load_chat();
      console.log(user);
      if(user.type == 'institute'){
        this.user = user;
        this.vet = user;
      }
      else {
        this.user = user;
        this.usuario = user;
      }
    })
    this.eventos.subscribe("close_sesion",()=>{
      this.user = null;
      this.router.navigate(['']);
    })
    
    
    
  
  }
  load_chat(){
    this.dba.load_chat().subscribe((data)=>{
      this.usuarios = data;
      console.log(this.usuarios);
    })  
  }
  navegar(opcion){
    this.router.navigate([`/${opcion}`]);
  }
  async entrar_chat(chat){
    if (this.usuario.chats.length < 1){
      /**
       * se consulta si el usuario no tiene chats registrados
       */
      let nuevo_chat:Chats;
      if(chat.type == 'institute'){
        nuevo_chat = {
          mensaje:[],
          veterinarias:chat
        }
      }
      else {
        nuevo_chat = {
          mensaje: [],
          user_pets:chat
        }
      }
      let modal = await this.modal.create({
        component:ChatPage,
        componentProps:{
          nuevo_chat
        }
      });
      modal.present();
    }
    else {
      let modal = await this.modal.create({
        component:ChatPage,
        componentProps:{
          nuevo_chat:chat
        }
      });
      modal.present();
    }
  }
  buscar_usuarios(event){
    console.log(event.target.value);
  }
}
