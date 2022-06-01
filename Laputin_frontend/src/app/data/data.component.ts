import { Component, OnInit } from '@angular/core';
import { SensorService,ISensor } from '../services/sensor.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  public sensors?:ISensor[];

  constructor(private _sService: SensorService) {
   }
  ngOnInit(): void {
    this._sService.getSensors().subscribe(res => {
      this.sensors=res;})
  }


}
