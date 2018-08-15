import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { NoteService } from './note.service';
import { Note } from './note.model';

import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit, OnDestroy {
  private noteSubscription: Subscription;
  private noteList: Note[] = [];
  @ViewChild('f') templateForm : NgForm;

  constructor(private nService: NoteService) { }

  ngOnInit() {
    this.noteSubscription = this.nService.notesChanged.subscribe(
      (notes: Note[]) => {
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

  addNewNote(form: NgForm){
    this.nService.addDataToDatabase({text: form.value.listItem});
    this.templateForm.resetForm();

  }



}
