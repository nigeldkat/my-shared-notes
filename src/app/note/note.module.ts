
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { NoteComponent } from './note.component';
import { NoteRoutingModule } from './note-routing.module';

import {NoteService} from './note.service';

@NgModule({
    declarations: [ NoteComponent],
    imports: [
        SharedModule,
        NoteRoutingModule
    ],
    providers:[],
    exports: [],
    entryComponents: []
})
export class NoteModule { }