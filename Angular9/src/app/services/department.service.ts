import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Department } from '../models/department-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  formData: Department;
  constructor(private http:HttpClient) { }

  readonly APIUrl = 'http://localhost:56000/api';

  getDepList(): Observable<Department[]> {
    return this.http.get<Department[]>(this.APIUrl + '/Department');
  }

  addDepartment(dep:Department){
    return this.http.post(this.APIUrl+'/Department', dep);
  }

  deleteDepartment(id: number){
    return this.http.delete(this.APIUrl+'/Department/'+id);
  }

  updateDepartment(dep:Department){
    return this.http.put(this.APIUrl+'/Department', dep);
  }

  private _listener = new Subject<any>();
  listen(): Observable<any>{
    return this._listener.asObservable();
  }

  filter(filterBy: string){
    this._listener.next(filterBy);
  }
}
