import { Component } from '@angular/core';

@Component({
	selector : 'app-greeter',
	templateUrl : 'greeter.component.html'
})
export class GreeterComponent{
	greetMessage : string = 'Hi there!';

	onGreetClick(userName : string){
		this.greetMessage = `Hi ${userName}, Have a nice day!`;
	}
}