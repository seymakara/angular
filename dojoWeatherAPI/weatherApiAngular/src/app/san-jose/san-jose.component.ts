import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-san-jose',
  templateUrl: './san-jose.component.html',
  styleUrls: ['./san-jose.component.css'],
})
export class SanJoseComponent implements OnInit {
  city: string;
  humidity: number;
  temperatureAvg: number;
  temperatureHigh: number;
  temperatureLow: number;
  status: string;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.city = "San Jose"
    this.getWeatherfromService();

  }

  getWeatherfromService(){

    let observable = this._httpService.getWeatherFromAPI(this.city);
    observable.subscribe(data=> {
      this.humidity = data.main.humidity;
      this.temperatureAvg = data.main.temp;
      this.temperatureHigh = data.main.temp_max;
      this.temperatureLow = data.main.temp_min;
      this.status = data.weather[0].main;
      console.log("Got our data!", data )
    })
  }



}
