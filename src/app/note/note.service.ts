import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';

import { AngularFirestore } from 'angularfire2/firestore';
import { Note } from './note.model';

@Injectable()
export class NoteService {
    notesChanged = new Subject<Note[]>();
    private fbSubs: Subscription[] = [];

    constructor(private db: AngularFirestore) { }

    addDataToDatabase(item: Note) {
        this.db.collection(`notes`).add(item);
    }

    fetchNotes() {
        this.fbSubs.push(
            this.db.collection(`notes`).valueChanges().subscribe(
                (notes: Note[]) => {
                    this.notesChanged.next(notes);
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