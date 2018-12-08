import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Router } from '@angular/router';
import { NoteListService } from './notelist.service';
import { NoteList } from './notelist.model';

import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css', '../app.component.css']
})
export class NoteListComponent implements OnInit, OnDestroy {
  private noteSubscription: Subscription;
  public noteList: NoteList[] = [];
  @ViewChild('f') templateForm : NgForm;

  constructor(private nService: NoteListService, private router: Router) { }

  ngOnInit() {
    this.noteSubscription = this.nService.notesChanged.subscribe(
      (notes: NoteList[]) => {
        this.noteList = notes;
      }
    );
    this.nService.fetchNotes();
  }
  ngOnDestroy(){
    if(this.noteSubscription){
      this.noteSubscription.unsubscribe();
    }
  }
 
  addNewList(form: NgForm){
    this.nService.addNoteToNoteList(form.value.noteDesc);
    //this.nService.addDataToDatabase({text: form.value.listItem});
    this.templateForm.resetForm();
  }

  goToAddMember(id: string){
    this.router.navigate([`/notemembers/${id}`]);
  }

  goToViewList(id: string, desc: string){
    this.router.navigate([`/note/${id}/${desc}`]);
  }

  deleteNoteList(ID: string){
    if (confirm('Are you sure you want delete this list?')) {
      this.nService.deleteNoteList(ID);
    } 
    
  }


}
