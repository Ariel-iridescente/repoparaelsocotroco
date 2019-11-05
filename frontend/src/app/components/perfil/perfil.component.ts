import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  login : boolean;
  id : any;
  datausuario : any;
  infouser : FormGroup;
  
  constructor(private usuariosService : UsuariosService, private router : Router) { }

 async ngOnInit() {
  this.id = localStorage.getItem('id');
  this.datausuario = await this.usuariosService.getUsuario(this.id);

  this.infouser = new FormGroup({
    'nombre_usuario' : new FormControl(this.datausuario[0].nombre_usuario,[Validators.required]),
    'apellido_usuario' : new FormControl(this.datausuario[0].apellido_usuario, [Validators.required]),
    'telefono_usuario' : new FormControl(this.datausuario[0].telefono_usuario, [Validators.required]),
    'mail_usuario' : new FormControl(this.datausuario[0].mail_usuario, [Validators.required,Validators.email])
  })
  // this.infouser = new FormGroup({
  //   'nombre_usuario' : new FormControl('',[Validators.required]),
  //   'apellido_usuario' : new FormControl('', [Validators.required]),
  //   'telefono_usuario' : new FormControl('', [Validators.required]),
  //   'mail_usuario' : new FormControl('', [Validators.required,Validators.email])
  // })
  if(localStorage.getItem('usuario') != null) {
    this.login = true;
   
    console.log(this.datausuario);
  } else {
    this.login = false;
    this.router.navigate(['login']);
  }

  }

  async updateUser(){
    let post_ok : any = await this.usuariosService.updateUsuario(this.id,this.infouser.value);
    if(post_ok.status == "ok") {
      localStorage.setItem('nombre',this.infouser.value.nombre_usuario);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Informacion acualizada correctamente',
        showConfirmButton: true,
        timer: Math.min(8800)
      });
      //this.router.navigate(['']);
    } else {

    }
  }

}
