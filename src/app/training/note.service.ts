import { Injectable} from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import {Note} from './note.model';

@Injectable()
export class NoteService{

    constructor(private db: AngularFirestore) { }

    addDataToDatabase(item: Note) {
        this.db.collection(`notes`).add(item);
    }

}