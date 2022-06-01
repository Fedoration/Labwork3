import { Component, Input, OnInit } from '@angular/core';
import { ISensor } from '../../services/sensor.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {

  @Input()
  public sensor!:ISensor;
  constructor() { }

  ngOnInit(): void {
  }

}
