import { Component, OnInit } from '@angular/core';
import { Eventos, Users } from '../../../../models/usuarios/user_pets';
import { AlertController } from '@ionic/angular';
import { DbaService } from '../../../../services/data/dba.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  
  constructor(private alert:AlertController,
    private dba:DbaService) { }

  ngOnInit() {
    
  }

  verificar_event(title:string,descripcion:string,inicio:Date,termina:Date){
    let tick = true;
    let nuevo:Eventos = {
      title,
      descripcion,
      startime:inicio,
      endtime:termina
    }
    for(let element in nuevo){
      if (!nuevo[element] && element != "endTime"){
        tick = false;
        this.show_mensaje(element,'no puede estar vacio');
      }
    }
    if (!tick){
      this.crear_event(nuevo);
    }
  }
  crear_event(nuevo:Eventos){
    this.event = nuevo;
    console.log(this.event);
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
