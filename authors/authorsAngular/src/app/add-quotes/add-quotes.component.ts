import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add-quotes',
  templateUrl: './add-quotes.component.html',
  styleUrls: ['./add-quotes.component.css']
})
export class AddQuotesComponent implements OnInit {
  theAuthor = {quotes: ""};
  newQuote : any; 

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.newQuote = { text: '' }
    this._route.params.subscribe((params: Params) => {
    
      console.log(params['id']);
      this.getTheAuthor(params['id']);

    });
  }

  getTheAuthor(ID) {
    let observable = this._httpService.getAuthorForEdit(ID);
    observable.subscribe(data => {
        this.theAuthor = data['data'];
        console.log("DATA", data)
        console.log(this.theAuthor)
    })
  }

  addQuote() {
    console.log("NEWQUOTE:", this.newQuote);
    console.log("THE AUTHOR:", this.theAuthor);
    let observable = this._httpService.addQuote(this.newQuote, this.theAuthor._id);
    observable.subscribe(data => {
        console.log(data);
        this.getTheAuthor(this.theAuthor._id)
    })
}

}
