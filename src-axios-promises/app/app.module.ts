import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from './utils/utils.module';

import { AppComponent } from './app.component';
import { BugTrackerComponent } from './bugTracker/bugTracker.component';

import { BugOperationsService } from './bugTracker/services/bugOperations.service';
import { BugStorageService } from './bugTracker/services/bugStorage.service';
import { BugApiService } from './bugTracker/services/bugApi.service';

import { ClosedCountPipe } from './bugTracker/pipes/closedCount.pipe';

import { BugStatsComponent } from './bugTracker/views/bugStats.component';
import { BugEditComponent } from './bugTracker/views/bugEdit.component';

@NgModule({
  declarations: [
    AppComponent
    ,BugTrackerComponent
    , ClosedCountPipe
    , BugStatsComponent
    , BugEditComponent
  ],
  imports: [
    BrowserModule
    , FormsModule
    , UtilsModule
  ],
  providers: [
  	BugOperationsService
    , BugStorageService
    , BugApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
