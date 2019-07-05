import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { PetData } from '../../../models/pet_data/pet_data';

@Component({
  selector: 'app-consejos',
  templateUrl: './consejos.page.html',
  styleUrls: ['./consejos.page.scss'],
})
export class ConsejosPage implements OnInit {
  information:PetData;
  constructor(private params:NavParams,
    private modal:ModalController) { }

  ngOnInit() {
    this.information = this.params.get('consejo');
    console.log(this.information);
  }
  back(){
    this.modal.dismiss();
  }
}
