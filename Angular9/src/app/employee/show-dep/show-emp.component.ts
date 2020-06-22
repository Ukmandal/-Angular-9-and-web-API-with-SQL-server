import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';
import { Employee } from 'src/app/models/employee-model';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

 
  constructor(private service: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { 
      this.service.listen().subscribe((m)=>{
        console.log(m);
        this.RefreshEmpLsit();
      })
    }

  listData : MatTableDataSource<any>;
  displayedColumns: string[]  = ['EmployeeID', 'EmployeeName', 'Department','MailID', 'DOJ' , 'Options']
  @ViewChild(MatSort) sort: MatSort

  ngOnInit(): void {
    this.RefreshEmpLsit();
  }

  RefreshEmpLsit(){
    this.service.getEmpList().subscribe(data =>{
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      console.log(data);
    });
  }

  applyFiler(filterValue: string){
    this.listData.filter = filterValue.trim().toLocaleLowerCase();
  }

  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddEmpComponent, dialogConfig);
  }

  onEdit(emp: Employee){
    console.log(emp);
    this.service.formData = emp;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EditEmpComponent, dialogConfig);
  }
  onDelete(id: number){
    console.log(id);
    if(confirm('Are you sure want to delete?')){
      this.service.deleteEmployee(id).subscribe((res)=>{
        this.RefreshEmpLsit();
        this.snackBar.open(res.toString(), '', {
          verticalPosition: 'top',
          duration: 3000
        });
      })
    }
  }
}
