
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/app/models/department-model';
import { DepartmentService } from 'src/app/services/department.service';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddDepComponent } from '../add-dep/add-dep.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDepComponent } from '../edit-dep/edit-dep.component';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service: DepartmentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { 
      this.service.listen().subscribe((m)=>{
        console.log(m);
        this.RefreshDepLsit();
      })
    }

  listData : MatTableDataSource<any>;
  displayedColumns: string[]  = [ 'DepartmentID', 'DepartmentName', 'Options']
  @ViewChild(MatSort) sort: MatSort

  ngOnInit(): void {
    this.RefreshDepLsit();
  }

  RefreshDepLsit(){
    this.service.getDepList().subscribe(data =>{
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
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
    this.dialog.open(AddDepComponent, dialogConfig);
  }

  onEdit(dep: Department){
    console.log(dep);
    this.service.formData = dep;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EditDepComponent, dialogConfig);
  }
  onDelete(id: number){
    console.log(id);
    if(confirm('Are you sure want to delete?')){
      this.service.deleteDepartment(id).subscribe((res)=>{
        this.RefreshDepLsit();
        this.snackBar.open(res.toString(), '', {
          verticalPosition: 'top',
          duration: 3000
        });
      })
    }
  }

}
