import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User_pets, Veterinarias, Google_login } from 'src/app/models/usuarios/user_pets';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbaService {
  key:string;
  actualiza:Observable<any[]>;
  google_user:Google_login;
  usuario;
  token:string;
  constructor(private fireDba:AngularFireDatabase,
    private events:Events,
    private auth:AngularFireAuth) { }

  datos_mascotas(){
    return this.fireDba.list(`info_mascotas`).snapshotChanges()
    .pipe(map(valores=>{
      return valores.map(value=>{
        let key = value.key;
        let data = new Object();
        data[key] = value.payload.val();
        return data;
      })
    }))
    
  }
  

  ingresa_google(){
    return new Promise((resolve,reject)=>{

      this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
      .then(async(usuario)=>{
        console.log(usuario);
        let respuesta = await this.login(usuario.user.email);
        if(respuesta){
          resolve(true);
        }
        else if(!respuesta) {
          reject(false);
        } 
      }).catch((err)=>{
        console.log(err);
        reject(false)
      })

    })
  }
  load_chat(){
    
    return this.fireDba.list(`usuarios`).snapshotChanges()
    .pipe(map(usuarios=>{
      return usuarios.map(user=>{
        let data = user.payload.val();
        return data;
      })
    }))
  }
  setToken(token){
    this.token = token;
  }
  login(email:string){
    let us = new Object();
    this.key = email;
    this.key = this.key.replace("@","_");
        while(this.key.indexOf(".") != -1){
          this.key = this.key.replace(".","_");
        }
    return new Promise((resolve,reject)=>{
      this.fireDba.list(`usuarios/${this.key}/`).snapshotChanges()
      .pipe(map(element=>{
        return element.map((value)=>{
          let key = value.key;
          
          us[key] = value.payload.val();
          return us;
        })
      })).subscribe(()=>{
        
        this.setUsuario(us);
        resolve(true);
      },(err)=>{
        reject(false);
      })
    })
  }
  upload_img(imagen){
    
    let firestorage = firebase.storage().ref();
    let file_name = new Date().valueOf().toString();
    let fire_task:firebase.storage.UploadTask = firestorage.child(`/img/${file_name}`)
    .putString(imagen,'base64',{contentType: 'image/jpeg'});
  }
  registrar_pets(usuario:User_pets,is_imagen:boolean){

    this.key = usuario.email
        this.key = this.key.replace("@","_");
        while(this.key.indexOf(".") != -1){
          this.key = this.key.replace(".","_");
        }
    return new Promise ((resolve,reject)=>{
      
      if(is_imagen){
        
        for (let contador = 0; contador < usuario.mascotas.length; contador++){
          if (usuario.mascotas[contador].url){
            let firestorage = firebase.storage().ref(); // aqui queda refernciada el storage de firebase
            let file_name = new Date().valueOf().toString();
            let fire_task:firebase.storage.UploadTask = firestorage.child(`/img/${file_name}`)
            .putString(usuario.mascotas[contador].url,'base64',{contentType: 'image/jpeg'});
            fire_task.on(firebase.storage.TaskEvent.STATE_CHANGED,
            ()=>{
              // en medio de la subida de la imagen
            },
            ()=>{
              reject(false);
            },
            ()=>{
              firestorage.child(`img/${file_name}`).getDownloadURL().then(direccion=>{
                usuario.mascotas[contador] = direccion;
              });
              
            }  
            )       

          }
        }
        
        this.fireDba.object(`usuarios/${this.key}/`).update(usuario).then(()=>{
          this.setUsuario(usuario);
          resolve(true);
        }).catch(()=>{
          reject(false);
        })
      }
      else {
        this.fireDba.object(`usuarios/${this.key}/`).update(usuario).then(()=>{
          this.setUsuario(usuario);
          resolve(true);
        }).catch(()=>{
          reject(false);
        })
      }
    })

  }
  
  registrar_vet(vet:Veterinarias){
    return new Promise ((resolve,reject)=>{

      if (vet.url){
        let firestorage = firebase.storage().ref();
        let file_name = new Date().valueOf().toString();
        let fire_task: firebase.storage.UploadTask = firestorage.child(`/img/${file_name}`)
        .putString(vet.url,'base64',{contentType:'image/jpeg'});
        fire_task.on(firebase.storage.TaskEvent.STATE_CHANGED,()=>{
  
        },
        ()=>{
  
        },
        ()=>{
          firestorage.child(`/img/${file_name}`).getDownloadURL().then((url)=>{
            vet.url = url;
          }).then(()=>{
            this.fireDba.object(`${this.key}/`).update(vet).then(()=>{
              this.setUsuario(vet);
              resolve(true);
            }).catch(()=>{
              reject(false);
            })
          })
  
        })
      }
      else {
        this.fireDba.object(`${this.key}`).update(vet).then(()=>{
          this.setUsuario(vet);
          resolve(true);
        }).catch(()=>{
          reject(false);
        })
      }
    })
  }
  setUsuario(usuario){
    if(usuario){
      this.events.publish("login",usuario);
      this.usuario = usuario
    }
    else{
      this.events.publish("close_sesion",null);
      this.usuario = null;
    }
  }
  getUsuario(){
    return this.usuario;
  }

  rastreo(pet){
    return this.fireDba.list(`rastreo/${pet}`).snapshotChanges()
    .pipe(map(values=>{
      return values.map((value=>{
        let data = value.payload.val();
        return data;
      }))
    }))
  }

}
