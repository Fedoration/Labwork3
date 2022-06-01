import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private _http: HttpClient) { }

  public getSensors(): Observable<ISensor[]> {
    return this._http.get<ISensor[]>("/Sensor/all")
  }

  public postSensor(sensor: ISensor) {
    return this._http.post<ISensor>("/Sensor",sensor);
  }

  public putSensor(sensor: ISensor, id:number) {
    return this._http.put<ISensor>("/Sensor/"+id,sensor);
  }

  public deleteSensor(id:number) {
    return this._http.delete<any>("/Sensor/"+id);
  }
}

export interface ISensor
{
  id: number,
  name: string,
  type: string,
  description: string,
  dimension: string,
  value: number,
  unitId: number,
  unitName: string;
}