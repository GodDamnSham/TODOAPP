import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { observable } from 'rxjs';
import { UserserviceService } from 'src/app/components/register/userservice.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserserviceService]
})
export class RegisterComponent implements OnInit {
   reg: any;
   data :any;
   error:any;
   
   constructor (private userService : UserserviceService){}
  
   
    ngOnInit(){
      this.reg={
        username:'',
        first_name:'',
        last_name:'',
        email:'',
        password:'',
      };
    }

  //Register user api request
  registeruser(){
   console.log(this.reg);
     this.userService.registerNewuser(this.reg).subscribe(
      (Response:any) => {
        alert('User regestriert');
        
     },
     error => {
      alert('error occured')

    }
     );
  }
}
