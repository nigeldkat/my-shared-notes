import { NgModule  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteListComponent } from './notelist.component';

const routes: Routes = [
    { path: '', component: NoteListComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NoteListRoutingModule {

}