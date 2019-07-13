import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Veterinarias,User_pets } from 'src/app/models/usuarios/user_pets';
import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  
  imagePreview:string;
  image64:string;
  usuario:User_pets;
  vet:Veterinarias;
  is_image = false;
  services = [];
  servicios = [];
  constructor(private modal:ModalController,
    private navparams:NavParams,
    private image:ImagePicker) { }

  ngOnInit() {
    let usuario = this.navparams.get('usuario');
    this.servicios = this.vet.services;
    if (usuario.type == 'institute'){
      this.vet = usuario;
      this.services = [
      {
          nombre: 'guarderia',
          img: 'assets/img/home.png',
          tick: false
      },
      {
          nombre: 'peluqueria',
          img: 'assets/img/tijeras.png',
          tick: false
      },
      {
          nombre: 'urgencias',
          img: 'assets/img/warning.jpg',
          tick: false
      },
      {
          nombre: 'veterinaria',
          img: 'assets/img/veterinaria.png',
          tick: false
      },
      {
          nombre: 'hotel mascotas',
          img: 'assets/img/hotel.png',
          tick: false
      },
      {
          nombre: 'transporte mascotas',
          img: 'assets/img/warning.jpg',
          tick: false
      }
      ];
      let index = 0;
      for (let service of this.services){
        let find = this.vet.services.find((element)=>{
          return element === service.nombre
        });
        if(find){
          this.services[index].tick = true;
        }
        index = index+1;
      }
    }
    else {
      this.usuario = usuario;
    }
  }
  change_image(posicion){
    const options:ImagePickerOptions = {
      quality: 70,
      outputType: 1, // indica que la imagen va ser en base 64bits
      maximumImagesCount:1
    };
    this.image.getPictures(options).then((results)=>{
      for (var i = 0; i < results.length; i++){
        this.imagePreview = 'data:image/jpeg;base64,' + results[i];
        this.image64 = results[i];
        this.is_image = true;  
        
      }
    },(err)=>console.log(JSON.stringify(err))).then(()=>{
      if(this.is_image){
        this.usuario.mascotas[posicion].url = this.image64;
      }
    })
  }
  add_item(servicio){
    let find = this.servicios.findIndex((element)=>{
      return element === servicio
    });
    if(find == -1){
      this.servicios.push(servicio);
    }
    else {
      this.servicios.splice(find);
    }
  }  
  back(){
    this.modal.dismiss({
      'salida':false
    });
  }

  update_pet(){
    
  }
  update_vet(){

  }
}
