import { Component } from '@angular/core';
import { Bug } from './models/Bug';
import { BugOperationsService } from './services/bugOperations.service';


@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent{
	bugs : Bug[] = [];

	sortAttrName : string = '';

	sortByDesc : boolean = false;

	

	/*bugOperations : BugOperationsService;

	constructor(_bugOperations : BugOperationsService){
		this.bugOperations = _bugOperations;
	}*/

	constructor(private bugOperations : BugOperationsService){
		this.bugOperations
			.getAll()
			.then(bugs => this.bugs = bugs);
	}

	onBugCreated(newBug : Bug){
		this.bugs = [...this.bugs, newBug];
	}

	onBugNameClick(bugToToggle : Bug){
		//this.bugOperations.toggle(bugToToggle);
		this.bugOperations
			.toggle(bugToToggle)
			.then(toggledBug => 
				this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug))
		
	}

	onRemoveClosedClick(){
		this.bugs
			.filter(bug => bug.isClosed)
			.forEach(closedBug => 
				this.bugOperations
					.remove(closedBug)
					.then(() => this.bugs = this.bugs.filter(bug => bug !== closedBug)));
		
	}
}