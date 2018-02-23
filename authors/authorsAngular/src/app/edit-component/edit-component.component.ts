import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {

  theAuthor = {name: ""}

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

  editAuthor(){
    let observable = this._httpService.updateAuthor(this.theAuthor);
        observable.subscribe(data => {
          console.log("Editing post!", data);
          this._router.navigate(['/home']);
        })
    }
}
