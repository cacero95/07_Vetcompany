import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Mascotas } from '../../../models/usuarios/user_pets';

@Component({
  selector: 'app-popper',
  templateUrl: './popper.component.html',
  styleUrls: ['./popper.component.scss'],
})
export class PopperComponent implements OnInit {
  mascotas:Mascotas[] = [];
  constructor(private navparams:NavParams,
    private pop:PopoverController) { }

  ngOnInit() {
    this.mascotas = this.navparams.get('mascotas');
  }
  select(name){
    this.pop.dismiss({
      'pet':name
    })
  }
}
