import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent implements OnInit {
  authors: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAuthorsFromService();
  };

  getAuthorsFromService(){
    let observable = this._httpService.getAuthors();
    observable.subscribe(response=> {
      console.log("Got our data!", response)
      this.authors = response['data'] //response we got from the service is an object. that's why we need to reach data inside this object.
    });
  };

  deleteOne(authorId) {
    let observable = this._httpService.deleteAuthor(authorId);
    observable.subscribe(data => {
        console.log(data);
    })
    this.getAuthorsFromService();
  }
}
