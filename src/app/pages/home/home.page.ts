import { Component, OnInit } from '@angular/core';
import { Events, ModalController, Platform } from '@ionic/angular';
import { User_pets,Veterinarias } from 'src/app/models/usuarios/user_pets';
import { Router } from '@angular/router';
import { DbaService } from 'src/app/services/data/dba.service';
import { TwitterService } from '../../services/social/twitter.service';
import { Publicaciones } from 'src/app/models/social/twitter_model';
import { ChatPage } from './chat/chat.page';
import { Chats, Users } from '../../models/usuarios/user_pets';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usuario:User_pets;
  vet:Veterinarias;
  chats:boolean;
  is_chats:boolean;
  user:Users;
  usuarios:Users[] = [];
  constructor(private eventos:Events,private router:Router,
    private dba:DbaService,private modal:ModalController,
    private platform:Platform) { }

  ngOnInit() {
    
    this.platform.ready().then(()=>{
      this.is_chats = false;
      this.eventos.subscribe("login",(user)=>{
        
        console.log(user);
        if(user.type == 'institute'){
          this.user = user;
          this.vet = user;
        }
        else {
          this.user = user;
          this.usuario = user;
        }
        this.load_chat();
        if (this.user.chats){
          this.is_chats = true;
        }
      });
      this.eventos.subscribe("close_sesion",()=>{
        this.user = null;
        this.router.navigate(['']);
      })
    })

    
    
    
  
  }
  load_chat(){
    this.dba.load_chat().subscribe((data:any)=>{
      this.usuarios = data;
      this.usuarios = this.usuarios.filter((user)=>{
        return user.email !== this.user.email
      })
      
      if(this.user.chats){
        for(let chat of this.user.chats){
          let arreglo_verficar = chat.users.filter((us)=>{
            return us.email !== this.user.email
          }); // se verican los usuarios diferentes al que ya ingreso
          this.verificar_chats(arreglo_verficar);
        }
      }
    });
  }
  navegar(opcion){
    this.router.navigate([`/${opcion}`]);
  }
  async entrar_chat(chat:Chats){

    let modal = await this.modal.create({
      component:ChatPage,
      componentProps:{
        chat,
        user:this.user   
      }
    });
    modal.present();
    
  }
  verificar_chats(usuarios:Users[]){
    // se verifica que el chat que entro, se registro en el
    // usuario
    for (let us of usuarios){
      this.usuarios = this.usuarios.filter((user)=>{
        return user.email !== us.email
      })
    }
    console.log(this.usuarios);
  }
  async crear_chat(usuario_destino:Users){

    let nombre = `${this.user.email}-${usuario_destino.email}`;
    let usuarios_entrantes = [this.user,usuario_destino];
    let modal = await this.modal.create({
      component:ChatPage,
      componentProps:{
        nombre,
        usuarios_entrantes,
        user:this.user
      }
    });
    modal.present();
    modal.onDidDismiss().then(()=>{
      if (this.user.chats){
        this.chats = true;
      }
      
    })
  }
  change_option(valor){
    this.chats = valor;
  }
  async entrar_grupo(grupo:any[],nombre:string){
    let chats_entrantes = [];
    chats_entrantes = grupo;
    chats_entrantes.push(this.user); 
  }
  buscar_usuarios(event){
    console.log(event.target.value);
  }
}
