
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { TrainingComponent} from './training.component';
import { TrainingRoutingModule } from './training-routing.module';

import {NoteService} from './note.service';

@NgModule({
    declarations: [
        TrainingComponent
    ],
    imports: [
        SharedModule,
        TrainingRoutingModule
    ],
    providers:[NoteService],
    exports: [],
    entryComponents: []
})
export class TrainingModule { }