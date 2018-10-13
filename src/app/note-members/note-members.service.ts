import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../auth/user.model';
import { NoteList } from '../notelist/notelist.model';
import { ListWithMembers } from './list-with-members.model';

@Injectable()
export class NoteMembersService {

    //usersChanged = new Subject<User[]>();
    //listDataChanged = new Subject<NoteList>();
    ListWithMembersChanged = new Subject<ListWithMembers>();
    AddMemberStatusChanged = new Subject<string>();

    noteListId: string;

    addMemberStatus: string;

    listData: NoteList;
    listWithMembers: ListWithMembers;

    private fbSubs: Subscription[] = [];
    private listID: string;

    constructor(private db: AngularFirestore) { }


    getListData(id: string) {
        this.noteListId = id;//: string = '0QeHI30TMXqPANjOY6ZL';///Lists/0QeHI30TMXqPANjOY6ZL

        this.db.collection(`Lists`, ref => ref.where('ID', "==", this.noteListId)).valueChanges().subscribe(            
            (notes: NoteList[]) => {
                console.log('in subscribe ');
                this.listData = notes[0];
                this.listWithMembers = {
                    Creator: this.listData.Creator,
                    Desc: this.listData.Desc,
                    ID: this.listData.ID,
                    Members: []
                }

                for (let i in this.listData.Members) {

                    this.db.collection(`users`, ref => ref.where(`uid`, '==', i)).valueChanges().subscribe(
                        (users: User[]) => {
                            if (users.length == 1) {
                                this.listWithMembers.Members.push({ uid: users[0].uid, email: users[0].email, displayName: users[0].displayName });
                                this.ListWithMembersChanged.next({ ... this.listWithMembers });
                            }

                        }
                    )
                    //     //to read values 
                    //     // if(this.listData.Members.hasOwnProperty(i)){
                    //     //     console.log("i - ", i);
                    //     //     console.log('value - ', this.listData.Members[i]);
                    //     //     //console.log('memlist.' + i + this.listData.Members[i]);
                    //     // }
                }
            }
        )

    }

    getAddMemberStatus() {
        const tempStatus = this.addMemberStatus;
        this.AddMemberStatusChanged.next(tempStatus);
    }

    addMember(email: string) {
        //this.fbSubs.push(
        let userList: User[] = [];

        // this.db.collection(`Lists`, ref => ref.where(`Members.${uid}`,'==',true)).valueChanges().subscribe(
        //     (notes: NoteList[]) => {
        //         this.notesChanged.next(notes);
        //     }
        // )            

        // this.db.collection(`Lists`, ref => ref.where('Desc',"==",'Groceries')).valueChanges().subscribe(
        //     (notes: NoteList[]) => {
        //         this.notesChanged.next(notes);
        //     }
        // )

        //u = this.db.collection(`users`, ref => ref.where(`email`,'==','nigeldkat@hotmail.com')).valueChanges().single();
        //u = this.db.ref(``)


        //find the user
        this.db.collection(`users`, ref => ref.where(`email`, '==', email)).valueChanges().subscribe(
            (users: User[]) => {
                console.log('in subscribe');



                userList = users;
                //this.notesChanged.next(notes);
                console.log('users ', users);

                if (userList.length == 1) {
                    const id: string = userList[0].uid;
                    // console.log('id - ', id);
                    //const noteListId: string = '0QeHI30TMXqPANjOY6ZL';
                    const list: AngularFirestoreDocument<NoteList> = this.db.doc(`Lists/${this.noteListId}`);
                    console.log('list - ', list);
                    this.listData.Members[id] = true;
                    // const newUID: string = 'zGrpwEsF0xc25bR6O6KuTHFkZxM3';
                    // this.listData.Members[newUID] = true;
                    // console.log('new list - ', this.listData);

                    list.set(this.listData, { merge: true });
                    this.AddMemberStatusChanged.next('found id');
                } else {
                    this.AddMemberStatusChanged.next('did not find email');
                }
            }
        );

        //return 'nothing';
        //const list : AngularFirestoreDocument<User> = this.db.doc(`users`)
        //console.log('vaule - ', u);
        // );
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => {
            if (sub) {
                sub.unsubscribe();
            }
        });
    }

}