import { Component, OnInit } from '@angular/core';
import { Bug } from './models/Bug';
import { BugOperationsService } from './services/bugOperations.service';


@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit{
	bugs : Bug[] = [];

	sortAttrName : string = '';

	sortByDesc : boolean = false;

	

	/*bugOperations : BugOperationsService;

	constructor(_bugOperations : BugOperationsService){
		this.bugOperations = _bugOperations;
	}*/

	constructor(private bugOperations : BugOperationsService){
		
	}

	async ngOnInit(){
		this.bugs = await this.bugOperations.getAll();
	}

	onBugCreated(newBug : Bug){
		this.bugs = [...this.bugs, newBug];
	}

	async onBugNameClick(bugToToggle : Bug){
		//this.bugOperations.toggle(bugToToggle);
		let toggledBug = await this.bugOperations.toggle(bugToToggle);
		this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug);
		
	}

	onRemoveClosedClick(){
		this.bugs
			.filter(bug => bug.isClosed)
			.forEach(async closedBug => {
				await this.bugOperations.remove(closedBug)
				this.bugs = this.bugs.filter(bug => bug !== closedBug);
			});
		
	}
}