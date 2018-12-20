import { Injectable } from '@angular/core';
import { Bug } from '../models/Bug';
//import { BugStorageService } from './bugStorage.service';
import { BugApiService } from './bugApi.service';


@Injectable()
export class BugOperationsService{

	constructor(private bugApi : BugApiService){

	}
	getAll() : Promise<Bug[]> {
		return this.bugApi.getAll();
	}
	createNew(bugName : string) : Promise<Bug> {
		let newBugData : Bug = {
			id : 0,
			name : bugName,
			isClosed : false,
			createdAt : new Date(),
			desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur aliquam id pariatur ipsa expedita nesciunt doloribus facilis architecto quisquam totam veniam odio, minima, labore deleniti, neque nam quia amet eveniet.'
		};
		return this.bugApi.save(newBugData);
	}
	toggle(bugToToggle : Bug) : Promise<Bug> {
		let toggledBug = {...bugToToggle, isClosed : !bugToToggle.isClosed};
		return this.bugApi.save(toggledBug);
	}
	remove(bug : Bug) : Promise<any>{
		return this.bugApi.remove(bug);
	}
}