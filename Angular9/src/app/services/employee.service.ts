import { Injectable } from '@angular/core';
import { Employee } from '../models/employee-model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Department } from '../models/department-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  formData: Employee;
  constructor(private http:HttpClient) { }

  readonly APIUrl = 'http://localhost:56000/api';

  getEmpList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.APIUrl + '/Employee');
  }

  addEmployee(dep:Employee){
    return this.http.post(this.APIUrl+'/Employee', dep);
  }

  deleteEmployee(id: number){
    return this.http.delete(this.APIUrl+'/Employee/'+id);
  }

  updateEmployee(dep:Employee){
    return this.http.put(this.APIUrl+'/Employee', dep);
  }

  getDepDropDownValues(){
    return this.http.get<Department[]>(this.APIUrl+'/Department');
  }


  private _listener = new Subject<any>();
  listen(): Observable<any>{
    return this._listener.asObservable();
  }

  filter(filterBy: string){
    this._listener.next(filterBy);
  }
}
