import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})
export class AddComponentComponent implements OnInit {
  newAuthor: any;

  constructor(private _httpService: HttpService) { 
    this.newAuthor = {name: ''}
  }

  ngOnInit() {
  }

  createAuthor() {
    console.log("creating")
    let observable = this._httpService.addAuthor(this.newAuthor);
    observable.subscribe(data => {
        console.log(data);
    })

    this.newAuthor = {name: ''};
}

}

