import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NoteList } from './notelist.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class NoteListService {
    notesChanged = new Subject<NoteList[]>();
    private fbSubs: Subscription[] = [];

    constructor(private db: AngularFirestore, private authService: AuthService) { }

    

    fetchNotes() {
        const uid :string = this.authService.currentUserId;
        //8OBRDpgo38aWAIIsHktriVTE4Bp1
        this.fbSubs.push(
            
            
            this.db.collection(`Lists`, ref => ref.where(`Members.${uid}`,'==',true)).valueChanges().subscribe(
                (notes: NoteList[]) => {
                    this.notesChanged.next(notes);
                }
            )            

            // this.db.collection(`Lists`, ref => ref.where('Desc',"==",'Groceries')).valueChanges().subscribe(
            //     (notes: NoteList[]) => {
            //         this.notesChanged.next(notes);
            //     }
            // )
        
        );
    }

    addNoteToNoteList(desc: string){
        const uid :string = this.authService.currentUserId;
        let item: NoteList = {
            Creator : uid,
            Desc : desc,
            ID : 'tempid',
            Members : {[uid]: true}
        } 
        console.log('item - ', item);
        this.db.collection(`Lists`).add(item).then(data => {
            //console.log('in then data - ', data);
            //console.log('data id - ', data.id);

            const list : AngularFirestoreDocument<NoteList> = this.db.doc(`Lists/${data.id}`)
            item.ID = data.id;
            
            //const newUID: string = 'newmemberadded';
            //item.Members[newUID] = true;
            // let result = '';
            // for (let i in item.Members){
            //     console.log('in for');
            //     if(item.Members.hasOwnProperty(i)){
            //         console.log('memlist.' + i + item.Members[i]);
            //     }
            // }

            //console.log(item.Members.toString);
            list.set(item, {merge: true});


        });
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => {
            if (sub) {
                sub.unsubscribe();
            }
        });
    }

}