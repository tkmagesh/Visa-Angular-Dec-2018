import { Component, OnInit } from '@angular/core';
import { Bug } from './models/Bug';
import { BugOperationsService } from './services/bugOperations.service';
import { SocketService } from '../utils/services/socket.service';


@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit{
	bugs : Bug[] = [];

	sortAttrName : string = '';

	sortByDesc : boolean = false;

	constructor(private bugOperations : BugOperationsService, private socketService : SocketService){
		
	}

	private loadData(){
		this.bugOperations
			.getAll()
			.subscribe(bugs => this.bugs = bugs);
	}

	 ngOnInit(){
		this.loadData();
		this.socketService.initSocket();
		this.socketService
			.onMessage()
			.subscribe(() => this.loadData());
	}

	onBugCreated(newBug : Bug){
		this.bugs = [...this.bugs, newBug];
		this.socketService.send('A new bug is created');
	}

	 onBugNameClick(bugToToggle : Bug){
		//this.bugOperations.toggle(bugToToggle);
		this.bugOperations
			.toggle(bugToToggle)
			.subscribe(toggledBug => {
				this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug);
				this.socketService.send('A bug is toggled');
			});
		
		
	}

	onRemoveClosedClick(){
		this.bugs
			.filter(bug => bug.isClosed)
			.forEach( closedBug => {
				this.bugOperations
					.remove(closedBug)
					.subscribe(() => {
						this.socketService.send('A bug is removed');
						this.bugs = this.bugs.filter(bug => bug !== closedBug);
					});
			});
		
	}
}