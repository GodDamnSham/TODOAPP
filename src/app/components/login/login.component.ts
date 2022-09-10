import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/components/login/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserserviceService]
})
export class LoginComponent implements OnInit {

  login: any;
  data :any;
  status:any;
  message:any;
   constructor (private userService : UserserviceService , private route : Router){}
   
    ngOnInit(){
      this.login={
        username:'',
        password:''
      };
    }

  //login api request
  loginuser(){
   console.log(this.login);
     this.userService.loginUser(this.login).subscribe(
     (Response:any) => {
       alert('User' +' '+this.login.username +' '+ 'logged in');
       this.data = Response.data;
       this.status = Response.status;
       console.log(Response);
       localStorage.setItem('access_token',Response.access);
       localStorage.setItem('refresh_token', Response.refresh);
       if(this.status == undefined){
      this.route.navigate(['home']);
       }else{
         this.message = this.message;
       }
     }, 
     error => {
       console.log('error' , error)
       alert('error occured')
     }
     );
  }
}
