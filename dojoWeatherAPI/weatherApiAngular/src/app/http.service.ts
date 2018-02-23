import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {}

  getWeatherFromAPI(city){
    let weather = this._http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=641eedfd13336514edbdb133b0f4bbef`)
    console.log("weather", weather)
    return weather
  }

}
