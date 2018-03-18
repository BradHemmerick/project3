import { AuthService } from './../auth.service';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [routerTransition],
  host: {'[@routerTransition]': ''}
})
export class RegisterComponent implements OnInit {

  public user = {email: "", password: "", username: ""}

  constructor(private userService: UserService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  register(){
    console.log(this.user)
    this.userService.register(this.user)
    .subscribe(res=> {
      this.auth.setUser(res.token)
      this.router.navigateByUrl('/')
    })
  }

}
