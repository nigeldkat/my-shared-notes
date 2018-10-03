
import { NgModule  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent},
    { path: 'note/:id/:desc', loadChildren: './note/note.module#NoteModule', canLoad:[AuthGuard]},
    { path: 'notelist', loadChildren: './notelist/notelist.module#NoteListModule', canLoad:[AuthGuard]}, 
    { path: 'notemembers/:id', loadChildren: './note-members/note-members.module#NoteMembersModule', canLoad:[AuthGuard]},   
    //{ path: 'note', loadChildren: './note/note.module#NoteModule'},
    //{ path: 'notelist', loadChildren: './notelist/notelist.module#NoteListModule'},
    //{ path: '**', component: PageNotFoundComponent}  
    //page not found overrode by code in auth service isauth listner
    //or just not working in this config
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {

}