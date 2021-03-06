import { Bug } from '../models/Bug';
import axios from 'axios';

export class BugApiService{
	private serviceEndPoint = 'http://localhost:3000/bugs';

	getAll() : Promise<Bug[]>{
		return axios
			.get(this.serviceEndPoint)
			.then(response => response.data);
	}
	save(bugData : Bug) : Promise<Bug>{
		if (bugData.id === 0){
			return axios
				.post(this.serviceEndPoint, bugData)
				.then(response => response.data)
		} else {
			return axios
				.put(`${this.serviceEndPoint}/${bugData.id}`, bugData)
				.then(response => response.data);
		}
	}
	remove(bugData : Bug) : Promise<any>{
		return axios
				.delete(`${this.serviceEndPoint}/${bugData.id}`)
				.then(response => response.data);
	}
}