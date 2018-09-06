import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
//import { Note } from './note.model';

@Injectable()
export class NoteMembersService {
    //notesChanged = new Subject<Note[]>();
    private fbSubs: Subscription[] = [];
    private listID: string;

    constructor(private db: AngularFirestore) { }

    // addNoteToList(item: Note) {
    //     this.db.collection(`notes`).add(item).then(
    //         note => {
    //             const listItem: AngularFirestoreDocument<Note> =
    //                 this.db.doc(`Lists/${this.listID}/Items/${note.id}`)
    //             item.ID = note.id;

    //             listItem.set(item, { merge: true });

    //         });
    // }

    // deleteNoteItem(noteID: string) {
    //     const listItem: AngularFirestoreDocument<Note> =
    //         this.db.doc(`Lists/${this.listID}/Items/${noteID}`);

    //     listItem.delete();
    // }

    // fetchNotes(listID: string) {
    //     this.listID = listID;
    //     this.fbSubs.push(
    //         this.db.collection(`Lists/${listID}/Items`).valueChanges().subscribe(
    //             (notes: Note[]) => {
    //                 this.notesChanged.next(notes);
    //             }
    //         )
    //     );
    // }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => {
            if (sub) {
                sub.unsubscribe();
            }
        });
    }

}