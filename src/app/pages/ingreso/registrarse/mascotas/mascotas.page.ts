import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Mascotas } from 'src/app/models/usuarios/user_pets';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.page.html',
  styleUrls: ['./mascotas.page.scss'],
})
export class MascotasPage implements OnInit {

  image64:string;
  
  imagePreview:string = "";
  mascota = {} as Mascotas;
  is_image: boolean;
  constructor(private modal:ModalController, private imagePicker:ImagePicker) { }

  ngOnInit() {
  }

  close(){
    this.modal.dismiss();
  }
  add_imagen(){
    const options:ImagePickerOptions = {
      quality: 70,
      outputType: 1, // indica que la imagen va ser en base 64bits
      maximumImagesCount:1
    };
    this.imagePicker.getPictures(options).then((results)=>{
      for (var i = 0; i < results.length; i++){
        this.imagePreview = 'data:image/jpeg;base64,' + results[i];
        this.image64 = results[i];
        this.is_image = true;  
        
      }
    },(err)=>console.log(JSON.stringify(err)))
  }
  crear_mascota(name,raza,edad){
    if(this.is_image){
      this.mascota.url = this.image64;
    }
    this.mascota.name = name;
    this.mascota.raza = raza;
    this.mascota.edad = edad;
    console.log(this.mascota);
    this.modal.dismiss({
      'mascota': this.mascota
    })
  }
}
