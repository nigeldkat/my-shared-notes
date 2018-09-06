import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

import { NoteMembersService } from './note-members.service';
// import { Note } from './note.model';

import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-note',
  templateUrl: './note-members.component.html',
  styleUrls: ['./note-members.component.css']
})
export class NoteMembersComponent implements OnInit, OnDestroy {
  private noteSubscription: Subscription;
  //public noteList: Note[] = [];
  @ViewChild('f') templateForm : NgForm;

  constructor(private nService: NoteMembersService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');

    // this.noteSubscription = this.nService.notesChanged.subscribe(
    //   (notes: Note[]) => {
    //     this.noteList = notes;
    //   }
    // );
    // this.nService.fetchNotes(id);

  }
  ngOnDestroy(){
    if(this.noteSubscription){
      this.noteSubscription.unsubscribe();
    }
  }

  addNewNote(form: NgForm){
    //this.nService.addNoteToList({Desc: form.value.listItem, ID: 'tempID'});
    this.templateForm.resetForm();
  }

  editNote(id: string){

  }

  deleteNote(id: string){
    //this.nService.deleteNoteItem(id);
  }



}