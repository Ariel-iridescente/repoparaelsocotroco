import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  login : boolean;
  nombre : string;

  constructor(private router : Router) { }

  ngOnInit() {
    if(localStorage.getItem('usuario') != null) {
      this.login = true;
      this.nombre = localStorage.getItem('nombre');
    } else {
      this.login = false;
    }
  }

  logout() {
    localStorage.clear();
    this.login = false;
    this.router.navigate(['home']);
  }

}
