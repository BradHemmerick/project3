import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logOut(){
    this.auth.logOut()
    return this.router.navigateByUrl('/login')
  }

  postTutorial(){
    console.log('hello')
    if(!this.auth.isLoggedIn){
      return this.router.navigateByUrl('/login')
    }
  }

}
