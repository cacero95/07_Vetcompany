import { Component, OnInit } from '@angular/core';
import { Eventos, Users } from '../../../../models/usuarios/user_pets';
import { AlertController, ModalController } from '@ionic/angular';
import { DbaService } from '../../../../services/data/dba.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  
  constructor(private alert:AlertController,
    private dba:DbaService,
    private modal:ModalController) { }

  ngOnInit() {
    
  }
  back(){
    this.modal.dismiss();
  }
  verificar_event(title:string,description:string,inicio:Date,termina:Date){
    let tick = true;
    let nuevo:Eventos = {
      title,
      description,
      startTime:inicio,
      endTime:termina
    }
    for(let element in nuevo){
      if (!nuevo[element]){
        tick = false;
        let titulo
        switch(element){
          case 'title':
            titulo = 'título'
            break;
          case 'description':
            titulo = 'descripción'
            break;
          case 'startTime':
            titulo = 'inició'
            break;
          case 'endTime':
            titulo = 'termina'
            break;
        }
        this.show_mensaje(titulo,'no puede estar vacio');
      }
    }
    
    if (tick){
      this.crear_event(nuevo);
    }
  }
  crear_event(nuevo:Eventos){
    this.modal.dismiss(
      {
        "evento":nuevo
      }
    ) 
  }
  async show_mensaje(titulo:string,mensaje:string){
    let alert = await this.alert.create({
      header:titulo,
      subHeader:mensaje,
      buttons:['Confirmar']
    });
    alert.present();
  }
}
