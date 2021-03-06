import { NgModule } from '@angular/core';

import { TrimTextPipe } from './pipes/trimText.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { ElapsedPipe } from './pipes/elapsed.pipe';

import { SocketService } from './services/socket.service';

const ALL_PIPES = [
		TrimTextPipe
	    , SortPipe
	    , ElapsedPipe
	];

@NgModule({
	declarations :ALL_PIPES,
	exports : ALL_PIPES,
	imports : [],
	providers : [
		SocketService
	]
})
export class UtilsModule{

}