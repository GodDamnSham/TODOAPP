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
  //complete = false;
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

  editTask(row:any) {
    this.dialog.open(DialogComponent, {
      width:"20%",
      data:row
    });
  }
  
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
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    
    /* logOutuser(){
      this.homeservice.logoutuser().subscribe(
        {
          next:(res)=>{
            alert("logged out");
            this.route.navigate(["login"]);
          }
          , error:()=>("error")
        }
       );
     }

  } */
 //log out
  logOutuser(){
    
          //get pass token 
          // api call where you pass tojen as parameter which login has to be bl
          
          alert("logged out");
          localStorage.clear();
          this.route.navigate(["login"]);
          
  }}
  
  


