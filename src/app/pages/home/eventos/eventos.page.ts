import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { ModalController } from '@ionic/angular';
import { EventsComponent } from './events/events.component';
import { DbaService } from '../../../services/data/dba.service';
import { Users } from '../../../models/usuarios/user_pets';

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
  usuario:Users;
  origen_eventos:any[] = [];
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  constructor(private router:Router,
    private dba:DbaService,
    private modal:ModalController,
    @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.usuario = this.dba.getUsuario();
    console.log(this.usuario);
    if (this.usuario.tasks){
      for(let tarea of this.usuario.tasks){

      }
    }
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
  }
  async onEventSelected(evento){

  }
  onViewTitleChanged(titulo){

  }
  onTimeSelected(time){

  }
}
