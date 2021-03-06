import { Bug } from '../models/Bug';

export class BugStorageService{
	private storage = window.localStorage;
	private currentBugId = 0;

	getAll(){
		let result =[];
		for(let index = 0, count = this.storage.length; index < count; index++){
			let key = this.storage.key(index),
				rawData = this.storage.getItem(key),
				bug = JSON.parse(rawData);
			this.currentBugId = this.currentBugId > bug.id ? this.currentBugId : bug.id;
			result.push(bug);
		}
		return result;
	}
	save(bugData : Bug){
		if (bugData.id === 0){
			bugData.id = ++this.currentBugId;
		}
		this.storage.setItem(bugData.id.toString(), JSON.stringify(bugData));
		return bugData;
	}
	remove(bugData : Bug){
		this.storage.removeItem(bugData.id.toString());
	}
}