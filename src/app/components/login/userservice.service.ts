import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
  
export class UserserviceService {
 
  constructor(private _http : HttpClient) { }
  loginUser(userData:any) : Observable<any>{
    return this._http.post<any>('http://127.0.0.1:8000/api/login/' , userData );
  }
}





