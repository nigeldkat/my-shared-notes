import { Component, OnInit } from '@angular/core';
import { NoteService } from './note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor(private nService: NoteService) { }

  ngOnInit() {
  }

  addNote(){
    alert('add clicked');
    this.nService.addDataToDatabase({text:'test2'});
  }

}
