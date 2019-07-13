import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { ModalController } from '@ionic/angular';
import { EventsComponent } from './events/events.component';
import { DbaService } from '../../../services/data/dba.service';
import { Users, Eventos } from '../../../models/usuarios/user_pets';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'es'
  };
  event = {
    title: '',
    description: '',
    startTime: '',
    endTime: ''
  };
  usuario:Users;
  origen_eventos:any[] = [];
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  constructor(private router:Router,
    private dba:DbaService,
    private modal:ModalController,
    @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.usuario = this.dba.getUsuario();
    if (this.usuario){
      if (this.usuario.tasks){
        for(let tarea of this.usuario.tasks){
          this.update_tasks(tarea);
        }
      }
    }
  }
  update_tasks(task:Eventos){
    let eventCopy:Eventos = {
      title: task.title,
      startTime:  new Date(task.startTime),
      endTime: new Date(task.endTime),
      description: task.description
    }

    this.origen_eventos.push(eventCopy);
    this.myCal.loadEvents(); 
    this.resetEvent();
  }
  resetEvent() {
    this.event = {
      title: '',
      description: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
   };
  }
  navegar(url){
    this.router.navigate([`/${url}`]);
  }
  async add_event(){
    let modal = await this.modal.create({
      component:EventsComponent
    })
    modal.present();
    const {data} = await modal.onDidDismiss();
    if (data){
      let evento:Eventos = data.evento;
      console.log(evento);
      let copia_evento:Eventos = {
        title: evento.title,
        description: evento.description,
        startTime: new Date(evento.startTime),
        endTime: new Date(evento.endTime)
      }
      this.origen_eventos.push(copia_evento);
      this.myCal.loadEvents();
      this.resetEvent();
    }
  }
  async onEventSelected(evento){

  }
  onViewTitleChanged(titulo){

  }
  onTimeSelected(time){

  }
}
