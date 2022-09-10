import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { HomeService } from '../services/home.service';
import { MatDialog, MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { inject } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';
import { UserserviceService } from '../components/login/userservice.service';
import { faUserInjured } from '@fortawesome/free-solid-svg-icons';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { concatAll } from 'rxjs';
import { MomentInput } from 'moment';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
  
})


export class DialogComponent implements OnInit {
  todoForm !: FormGroup;
  actionBtn : string = "save"
  
  constructor(public formbuilder : FormBuilder , 
    @Inject(MAT_DIALOG_DATA) public editData :any,
    private homeservice : HomeService , private dialogref : MatDialogRef< DialogComponent> ,private route : Router) {} 
    selected = 'Arbeit';
    complete = false;
      trimDate(event: MatDatepickerInputEvent<Date>){
      let strDate = moment(event.value).utcOffset('+0500').format('YYYY-MM-DD')
      this.todoForm.controls['date'].setValue(strDate)
      
      }

      
     
         
      
      

    
    ngOnInit(){      
    this.homeservice.TaskList();
     this.todoForm = this.formbuilder.group({
        aufgabe : ['', Validators.required],
        Beschreibung: ['', Validators.required],
        date:[''],
        category:['', Validators.required],
        complete:[false],
       }
     );

    if(this.editData){
      this.todoForm.controls['aufgabe'].setValue(this.editData.aufgabe);
      this.todoForm.controls['Beschreibung'].setValue(this.editData.Beschreibung);
      this.todoForm.controls['date'].setValue(this.editData.date);
      this.todoForm.controls['category'].setValue(this.editData.category);
      this.todoForm.controls['complete'].setValue(this.editData.complete);
    }

   }

  addTask(){
  console.log(this.todoForm.value);
  console.log(this.complete);
  if(!this.editData){
     if(this.todoForm.valid){
       if (localStorage.getItem('access_token')) { 
     this.homeservice.NewTask(this.todoForm.value).subscribe({
      next:(res)=> {  alert("Task added");
      this.todoForm.reset();
      this.dialogref.close('speichern');
      window.location.reload();
      },
       error: () => { alert("error"), this.route.navigateByUrl("/login") }
      })
    }else{
      this.route.navigateByUrl("/login")
    }
  }
}
else{
    this.updatedata()
  }
}


updatedata(){
  this.homeservice.updateTask(this.todoForm.value ,this.editData.id).subscribe({
    next:(res)=>{
      alert("Task Updated");
      this.todoForm.reset();
      this.dialogref.close('speichern');
      window.location.reload();
     }
  });
}


}


