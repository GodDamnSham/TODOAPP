import { Component, OnInit , ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HomeService } from '../services/home.service';
import { MatInputModule } from '@angular/material/input';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MomentInput } from 'moment';
import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
 
  displayedColumns: string[] = ['aufgabe','Beschreibung','category','date','complete','action'];
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  currentDate = new Date();
  newdate = moment(this.currentDate).utcOffset('+0500').format('YYYY-MM-DD');
  constructor(public dialog: MatDialog , private homeservice : HomeService ,private route : Router) {} 
  ngOnInit(): void {
    this.getTask();
  }
  
  
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:"20%"
    });
  }

  //opening dialog box to edit data
  editTask(row:any) {
    this.dialog.open(DialogComponent, {
      width:"20%",
      data:row
    });
  }
  
  //getting tasks from API
  getTask(){
    if (localStorage.getItem('access_token')) { 
    this.homeservice.TaskList().subscribe({
     next:(res)=> {
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     },
      error:()=>{
        
        alert("error")
        this.route.navigateByUrl("/login")
    }
     });
    }else{
      this.route.navigateByUrl("/login")
    }
    }

    // deleting data from table
    deleteData(id:number){
      if (localStorage.getItem('access_token')) { 
      this.homeservice.destroyTask(id).subscribe({
        next:(res)=>{
          alert("Task Deleted!");
          window.location.reload();
        }
        , error:()=>{
          this.route.navigateByUrl("/login")
        }
      }
      
        )
      } else {
        this.route.navigateByUrl("/login")
      }
    
    } 
    
    //Filer for Table
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
   
  //user logout clearing Localstorage
  logOutuser(){
          alert("logged out");
          localStorage.clear();
          this.route.navigate(["login"]);
          
  }}
  
  


