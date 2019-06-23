import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { User_pets,Veterinarias } from 'src/app/models/usuarios/user_pets';
import { Router } from '@angular/router';
import { DbaService } from 'src/app/services/data/dba.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usuario:User_pets;
  vet:Veterinarias;
  constructor(private eventos:Events,private router:Router,
    private dba:DbaService) { }

  ngOnInit() {
    
    let usuario = this.dba.getUsuario();
    if(usuario){
      if (usuario.type == 'institute'){
        this.vet = usuario;
      }
      else {
        this.usuario = usuario;
      }
    }
    
    this.eventos.subscribe("login",(user)=>{
      if(user.type == 'institute'){
        this.vet = user;
      }
      else {
        this.usuario = user;
      }
    })
    this.eventos.subscribe("close_sesion",()=>{
      this.router.navigate(['']);
    })
    
    if(!usuario){
      this.router.navigate(['']);
    }

    
  }
  
}
