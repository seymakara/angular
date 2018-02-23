import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) { 
    this.getPokemon();
    this.getAbility();
    this.getPokemonwithAbility()
  }

  getPokemon(){
    let pokemon = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
    pokemon.subscribe(data => {
      console.log("Name: ", data.name, "Height: ", data.height)
    });
  }

  getAbility(){
    let pokemon = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
    pokemon.subscribe(data => {
      console.log(`${data.name}'s ability is ${data.abilities[0].ability.name}`)
      
    });
  }

  getPokemonwithAbility(){
    let pokemon = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
    pokemon.subscribe(data => {
      let ability = data.abilities[0].ability.url
      let ability_definition = this._http.get(`${ability}`);
      ability_definition.subscribe(abilities =>{
        console.log(`${abilities.pokemon.length} pokemon have ${data.abilities[0].ability.name}`)
      }) 
    });

  }
}
