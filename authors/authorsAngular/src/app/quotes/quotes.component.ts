import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  theAuthor = {quotes: ""}
  id: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
    
      console.log(params['id']);
      this.getTheAuthor(params['id']);
    });
    
  }

  getTheAuthor(ID) {
    let observable = this._httpService.getAuthorForEdit(ID);
    observable.subscribe(data => {
        this.theAuthor = data['data'];
        console.log(this.theAuthor)
    })
  }

  vote(quoteIndex, votedUp) {
    let index = { index: quoteIndex }
    if (votedUp) {
        console.log("voted up on index", quoteIndex);
        let observable = this._httpService.voteChangeUp(index, this.theAuthor._id);
        observable.subscribe(data => {
            console.log(data)
        })
    } else {
        console.log("voted down on index", quoteIndex);
        let observable = this._httpService.voteChangeDown(index, this.theAuthor._id);
        observable.subscribe(data => {
            console.log(data);
        })
      }
      this.getTheAuthor(this.theAuthor._id)
    }


  deleteOneQuote(quoteIndex) {
    let index = { index: quoteIndex }
    console.log("quoteIndex:", quoteIndex)
    let observable = this._httpService.deleteQuote(index, this.theAuthor._id);
    console.log("DELETE AUTHOR ",this.theAuthor._id)
    observable.subscribe(data => {
        console.log(data);
    })
    this.getTheAuthor(this.theAuthor._id)
  }
}
