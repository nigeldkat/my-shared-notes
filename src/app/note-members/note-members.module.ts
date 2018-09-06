
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { NoteMembersComponent } from './note-members.component';
import { NoteMembersRoutingModule } from './note-members-routing.module';

import {NoteMembersService} from './note-members.service';

@NgModule({
    declarations: [ NoteMembersComponent],
    imports: [
        SharedModule,
        NoteMembersRoutingModule
    ],
    providers:[NoteMembersService],
    exports: [],
    entryComponents: []
})
export class NoteMembersModule { }