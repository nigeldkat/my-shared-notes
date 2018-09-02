import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';

import { AngularFirestore } from 'angularfire2/firestore';
import { NoteList } from './notelist.model';

@Injectable()
export class NoteListService {
    notesChanged = new Subject<NoteList[]>();
    private fbSubs: Subscription[] = [];

    constructor(private db: AngularFirestore) { }

    addDataToDatabase(item: NoteList) {
        this.db.collection(`Lists`).add(item);
    }

    fetchNotes() {
 
        //var x = this.db.collection(`Lists`).where("");






        //8OBRDpgo38aWAIIsHktriVTE4Bp1
        this.fbSubs.push(
            
            this.db.collection(`Lists`, ref => ref.where(`Members.8OBRDpgo38aWAIIsHktriVTE4Bp1`,'==',true)).valueChanges().subscribe(
                (notes: NoteList[]) => {
                    this.notesChanged.next(notes);
                }
            )

            

            // this.db.collection(`Lists`, ref => ref.where('Desc',"==",'Groceries')).valueChanges().subscribe(
            //     (notes: NoteList[]) => {
            //         this.notesChanged.next(notes);
            //     }
            // )
        
            // this.db.collection(`Lists`).valueChanges().subscribe(
            //     (notes: NoteList[]) => {
            //         this.notesChanged.next(notes);
            //     }
            // )
        );
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => {
            if (sub) {
                sub.unsubscribe();
            }
        });
    }

}