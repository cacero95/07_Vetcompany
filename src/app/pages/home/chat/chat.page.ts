import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Chats } from '../../../models/usuarios/user_pets';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chat:Chats;
  url:string;
  nombre:string;
  mensajes:string[] = [];
  constructor(private modal:ModalController,private params:NavParams) { }

  ngOnInit() {
    this.chat = this.params.get('nuevo_chat');
    for (let x = this.chat.mensaje.length-1; x==0; x--){
      this.mensajes.push(this.chat.mensaje[x]);
    }
    if (this.chat.user_pets){
      this.url = this.chat.user_pets.url;
      if (this.chat.user_pets.apellido){
        this.nombre = `${this.chat.user_pets.name} ${this.chat.user_pets.apellido}`;
      }
      else {
        this.nombre = this.chat.user_pets.name;
      }
    }
    else {
      this.url = this.chat.veterinarias.url;
      this.nombre = this.chat.veterinarias.name;
    }
  }
  back(){
    this.modal.dismiss();
  }
}
