import { Component, OnInit } from '@angular/core';
import { DbaService } from '../../../services/data/dba.service';
import { Veterinarias,User_pets } from 'src/app/models/usuarios/user_pets';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  user:User_pets;
  vet:Veterinarias;
  constructor(private dba:DbaService,
    private eventos:Events,
    private router:Router) { }

  ngOnInit() {
    let usuario = this.dba.getUsuario();
    if(usuario.type == 'institute'){
      this.vet = usuario;
    }
    else {
      this.user = usuario;
    }
    this.eventos.subscribe("login",(user)=>{
      this.vet = user;
      this.user = user;
    })
  }
  back(){
    this.router.navigate(['/home']);
  }
}
