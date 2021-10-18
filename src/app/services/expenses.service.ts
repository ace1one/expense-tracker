import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs'
import { Expenses } from '../model/expenses';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  apiUrl: string = 'http://localhost:3000/expenses';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http : HttpClient) { }

  createExpenses(data:any):Observable<Expenses>{
    return this.http.post<Expenses>(this.apiUrl,data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

 getExpenses():Observable<Expenses>{
   return this.http.get<Expenses>(this.apiUrl)
   .pipe(map((res:any)=>{
    return res
  }))
 }

}
