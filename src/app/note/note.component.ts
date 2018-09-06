import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
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
  private oldNoteSubscription: Subscription;
  public noteList: Note[] = [];
  public oldNoteList: Note[]=[];
  @ViewChild('f') templateForm : NgForm;

  constructor(private nService: NoteService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
//fetchOldNotes
    this.noteSubscription = this.nService.notesChanged.subscribe(
      (notes: Note[]) => {
        this.noteList = notes;
      }
    );
    this.nService.fetchNotes(id);

    this.oldNoteSubscription = this.nService.oldNotesChanged.subscribe(
      (notes: Note[]) => {
        this.oldNoteList = notes;
      }
    );
    this.nService.fetchOldNotes(id);

  }
  ngOnDestroy(){
    if(this.noteSubscription){
      this.noteSubscription.unsubscribe();
    }
    if(this.oldNoteSubscription){
      this.oldNoteSubscription.unsubscribe();
    }
  }

  addNewNote(form: NgForm){
    const dateTime: Date = new Date();
    this.nService.addNoteToList({Desc: form.value.listItem, ID: 'tempID', Selected: false, Time: dateTime });
    this.templateForm.resetForm();
  }

  editNote(id: string){

  }

  deleteNote(id: string){
    this.nService.deleteNoteItem(id);
  }

  selectedItem(id: string, selected: boolean){
    this.nService.changeSelected(id,selected);
  }



}
