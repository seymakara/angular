import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {


  constructor(private _http: HttpClient) { }

  getAuthors(){
    return this._http.get('/authors')
  };

  addAuthor(newAuthor){
    console.log(newAuthor)
    return this._http.post('/authors', newAuthor)
  };


  deleteAuthor(theAuthorID){
    return this._http.delete(`/authors/${theAuthorID}`)
    };

  updateAuthor(theAuthor){
    return this._http.put(`/authors/${theAuthor._id}`, theAuthor);
  };

  getAuthorForEdit(theAuthorID){
    return this._http.get(`/authors/${theAuthorID}`)
  }

  addQuote(newQuote, theAuthorID) {
    return this._http.post(`/quotes/${theAuthorID}`, newQuote);
  }

  deleteQuote(quoteIndex, theAuthorID){
    return this._http.put(`/quotes/${theAuthorID}`, quoteIndex)
  };

  voteChangeUp(quoteIndex, theAuthorID ) {
    return this._http.put(`/quotes/${theAuthorID}/up`, quoteIndex)
  };

  voteChangeDown(quoteIndex, theAuthorID ) {
    return this._http.put(`/quotes/${theAuthorID}/down`, quoteIndex)
  };

}

