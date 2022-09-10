import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(public _http : HttpClient) { }

  TaskList() : Observable<any>{

    return this._http.get<any>('http://127.0.0.1:8000/task/task-list', { headers: new HttpHeaders().set('Authorization', 'Bearer '+localStorage.getItem('access_token')) });
  }
  
  NewTask(userData:any) : Observable<any>{
    return this._http.post<any>('http://127.0.0.1:8000/task/task-create/', userData, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')) });
  }

  updateTask(userData:any , id : number) : Observable<any>{
    return this._http.post<any>('http://127.0.0.1:8000/task/task-update/' + id + '/', userData, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')) } );
  }

  destroyTask( id : number) : Observable<any>{
    return this._http.delete<any>('http://127.0.0.1:8000/task/task-delete/' + id + '/', { headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')) });
  }
  
  logoutuser():Observable<any>{
    return this._http.get<any>('http://127.0.0.1:8000/api/logout_all/');
  }

  
}
