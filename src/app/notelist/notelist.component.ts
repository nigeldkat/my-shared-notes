import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

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

  constructor(private nService: NoteListService) { }

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

  deleteNoteList(ID: string){
    //add are you sure maybe?
    //alert('in delete - ' + ID);
    this.nService.deleteNoteList(ID);
  }


}
