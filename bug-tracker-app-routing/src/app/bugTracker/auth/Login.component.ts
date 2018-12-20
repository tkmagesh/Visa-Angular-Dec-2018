import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
@Component({
	selector : 'app-login',
	template : `
		<h1>Login</h1>
		<input type="button" value="Login" (click)="onLoginClick()"/>
	`

})
export class LoginComponent{

	constructor(private userService : UserService, private router: Router){

	}
	onLoginClick(){
		this.userService.login();
		this.router.navigate(['/bugs']); 
	}
}