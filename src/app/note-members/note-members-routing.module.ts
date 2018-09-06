import { NgModule  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteMembersComponent } from './note-members.component';

const routes: Routes = [
    { path: '', component: NoteMembersComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NoteMembersRoutingModule {

}