import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-type-user',
  templateUrl: './type-user.page.html',
  styleUrls: ['./type-user.page.scss'],
})
export class TypeUserPage implements OnInit {

  constructor(private modal:ModalController) { }

  ngOnInit() {
  }
  cerrar(){
    this.modal.dismiss({
      'salida':''
    });
  }
  ingresar(salida){
    this.modal.dismiss({
      salida
    });
  }
}
