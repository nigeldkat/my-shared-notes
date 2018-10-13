import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { NoteMembersService } from './note-members.service';
import { NoteList } from '../notelist/notelist.model';
import { ListWithMembers } from './list-with-members.model';



@Component({
  selector: 'app-note',
  templateUrl: './note-members.component.html',
  styleUrls: ['./note-members.component.css', '../app.component.css']
})
export class NoteMembersComponent implements OnInit, OnDestroy {
  private noteSubscription: Subscription;
  private listSubscription: Subscription;
  private addMemberStatusSubscription: Subscription;

  listData: NoteList;
  listWithMembers: ListWithMembers;

  addMemberStatus: string;

  @ViewChild('f') templateForm: NgForm;

  constructor(private nService: NoteMembersService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');

    console.log('id - ', id);
    this.listSubscription = this.nService.ListWithMembersChanged.subscribe(
      (list: ListWithMembers) => {
        this.listWithMembers = list;
        console.log('from component list with members - ', this.listWithMembers)
      }
    )
    this.nService.getListData(id);

    this.addMemberStatusSubscription = this.nService.AddMemberStatusChanged.subscribe(
      (status: string) => {
        this.addMemberStatus = status;
      }
    )

    this.nService.getAddMemberStatus();

  }
  ngOnDestroy() {
    if (this.listSubscription) {
      this.listSubscription.unsubscribe();
    }
  }

  addMemberToNote(form: NgForm) {

    this.nService.addMember(form.value.email);
  }





  // addNewNote(form: NgForm) {
  //   //this.nService.addNoteToList({Desc: form.value.listItem, ID: 'tempID'});
  //   this.templateForm.resetForm();
  // }

  // editNote(id: string) {

  // }

  // deleteNote(id: string) {
  //   //this.nService.deleteNoteItem(id);
  // }



}