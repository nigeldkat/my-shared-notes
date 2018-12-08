import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription, TimeoutError } from 'rxjs';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Note } from './note.model';

@Injectable()
export class NoteService {
    notesChanged = new Subject<Note[]>();
    oldNotesChanged = new Subject<Note[]>();
    private itemList: Note[] = [];

    private fbSubs: Subscription[] = [];
    private listID: string;

    constructor(private db: AngularFirestore) { }

    addNoteToList(item: Note) {
       
        this.db.collection(`Lists/${this.listID}/Items`).add(item).then(
            note => {
                const listItem: AngularFirestoreDocument<Note> =
                    this.db.doc(`Lists/${this.listID}/Items/${note.id}`)
                item.ID = note.id;

                listItem.set(item, { merge: true });

            });
    }

    deleteNoteItem(noteID: string) {
        const listItem: AngularFirestoreDocument<Note> =
            this.db.doc(`Lists/${this.listID}/Items/${noteID}`);

        listItem.delete();
    }

    changeSelected(noteID: string, selected: boolean) {
        let listItem: AngularFirestoreDocument<Note> =
            this.db.doc(`Lists/${this.listID}/Items/${noteID}`);

            let time: Date = new Date();

            listItem.update({Time: time, Selected: selected});
        
    }

    fetchNotes(listID: string) {
        this.listID = listID;
        this.fbSubs.push(
            this.db.collection(`Lists/${listID}/Items`, ref => ref.where(`Selected`, '==', false).orderBy('Desc')).valueChanges().subscribe(
                (notes: Note[]) => {
                    this.notesChanged.next(notes);
                }
            )
        );
    }


    fetchOldNotes(listID: string) {
        this.listID = listID;
        this.fbSubs.push(
            this.db.collection(`Lists/${listID}/Items`, ref => ref.where(`Selected`, '==', true).orderBy('Desc')).valueChanges().subscribe(
                (notes: Note[]) => {
                    this.oldNotesChanged.next(notes);
                }
            )
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