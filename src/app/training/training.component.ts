import { Component, OnInit } from '@angular/core';
import { NoteService } from './note.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  constructor(private nService: NoteService) { }

  ngOnInit() {
  }

  addNote(){
    alert('add clicked');
    this.nService.addDataToDatabase({text:'test'});
  }

}
