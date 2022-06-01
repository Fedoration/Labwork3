import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ISensor, SensorService } from 'src/app/services/sensor.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.scss']
})
export class AddformComponent implements OnInit {

  sensorForm!:FormGroup;
  actionBtn: string = "Save";
  title: string = "Add Sensor";
  constructor(private formBuilder: FormBuilder, 
    private _sService: SensorService,
    @Inject(MAT_DIALOG_DATA) public editData: ISensor,
    private dialogRef: MatDialogRef<AddformComponent>) { }

  ngOnInit(): void {
    this.sensorForm = this.formBuilder.group({
      name:['',Validators.required],
      type: ['',Validators.required],
      description: ['',Validators.required],
      dimension: ['',Validators.required],
      value: ['',Validators.required],
      unitId: ['',Validators.required],
      unitName: ['', Validators.required]
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.title = "Edit Sensor";
      this.sensorForm.controls['name'].setValue(this.editData.name);
      this.sensorForm.controls['type'].setValue(this.editData.type);
      this.sensorForm.controls['description'].setValue(this.editData.description);
      this.sensorForm.controls['dimension'].setValue(this.editData.dimension);
      this.sensorForm.controls['value'].setValue(this.editData.value);
      this.sensorForm.controls['unitId'].setValue(this.editData.unitId);
      this.sensorForm.controls['unitName'].setValue(this.editData.unitName);
    }
  
  }

  updateSensor()
  {
    return this._sService.putSensor(this.sensorForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        this.sensorForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating");
      }
    })
  }
  addSensor()
  {
    if(!this.editData) {
      if(this.sensorForm.valid) {
        this._sService.postSensor(this.sensorForm.value)
        .subscribe({
          next:(res)=>
          {
            this.sensorForm.reset();
            this.dialogRef.close('save');
          }, error:() =>
          {
            alert("Error while adding sensor")
          }
        })
      } 
      } else{
        this.updateSensor();
    }
  }
}
