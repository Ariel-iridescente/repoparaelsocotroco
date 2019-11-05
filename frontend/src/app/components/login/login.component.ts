import { UsuariosService } from './../../services/usuarios.service';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form : FormGroup
  constructor(private usuariosService : UsuariosService, private router : Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'mail' : new FormControl('', [Validators.required]),
      'password' : new FormControl('', [Validators.required])
    })
  }

 async login() {
    let usr_ok : any= await this.usuariosService.loginUsuario(this.form.value);
    if(usr_ok.status != 'invalid') {
      console.log(usr_ok.JWT);
      console.log(usr_ok);
      localStorage.setItem('usuario', usr_ok.JWT);
      localStorage.setItem('nombre', usr_ok.usuario.nombre);
      localStorage.setItem('id', usr_ok.usuario.id);
      this.router.navigate(['home']);
    } else {
      // usuario o contraseña incorrectos
      console.log('login incorrecto');
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'Usuario o contraseña incorrectos',
        showConfirmButton: true,
        timer: Math.min(8800)
      });
    }
  }

}
