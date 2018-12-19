import { Pipe, PipeTransform } from '@angular/core';

interface Comparer{
	(item1 : Object, item2 : Object) : number;
}

@Pipe({
	name: 'sort',
	pure : true
})
export class SortPipe implements PipeTransform {
	private getComparerFor(attrName : string) : Comparer{
		return function(item1 : Object, item2 : Object){
			if (item1[attrName] < item2[attrName]) return -1;
			if (item1[attrName] > item2[attrName]) return 1;
			return 0;
		}
	}

	private getDescendingComparer(comparer : Comparer) : Comparer{
		return function(item1 : Object, item2 : Object){
			return comparer(item1, item2) * -1;
		}
	}
	transform(data: any[], attrName : string, isDescending : boolean = false): any[] {
		console.log('sort.transform triggered');
		if (!data || !data.length || !attrName) return data;
		let comparer = this.getComparerFor(attrName);
		if (isDescending)
			comparer = this.getDescendingComparer(comparer);
		return data.sort(comparer);
	}
}