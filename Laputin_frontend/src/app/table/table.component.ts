import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ISensor, SensorService } from '../services/sensor.service';
import { AddformComponent } from './addform/addform.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'type', 'description','dimension','value','unitId','unitName','action'];
  dataSource!: MatTableDataSource<ISensor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public dialog: MatDialog, private _sService: SensorService) { }

  ngOnInit(): void {
    this.getAllSensors();
  }

  openDialog() {
    this.dialog.open(AddformComponent,
      {
        width: '30%'
      }).afterClosed().subscribe(val=>{
        if(val==='save'){
          this.getAllSensors();
        }
      });

  }

  getAllSensors() {
    this._sService.getSensors()
    .subscribe(
      {
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    )
  }

  editSensor(row: ISensor) {
    this.dialog.open(AddformComponent, {
      width:'30%',
      data: row


    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllSensors();
      }
    })
  }

  deleteSensor(id:number) {
    this._sService.deleteSensor(id).subscribe({
      next:(res)=>{
        this.getAllSensors();
      },
      error:()=>{
        alert("Error while deleting")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
