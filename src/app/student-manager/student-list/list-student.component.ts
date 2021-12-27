import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TranslatePipe } from '@ngx-translate/core';
import { fuseAnimations } from 'app/core/animations';
import { FuseConfirmDialogComponent } from 'app/core/components/confirm-dialog/confirm-dialog.component';
import { StudentService } from '../service/student.service';
import { AddStudentComponent } from './add-student/add-student.component';

@Component({
    templateUrl: './list-student.component.html',
    styleUrls: ['./list-student.component.scss'],
    providers: [TranslatePipe, StudentService],
    animations: fuseAnimations,
})
export class ListStudentComponent implements OnInit {
    keyword: string;
    isAdmin: boolean = false;
    displayedColumns = [];
    length: number = 0;
    dataSource: MatTableDataSource<any>;
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        private service: StudentService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        private translate: TranslatePipe
    ) { }

    ngOnInit(): void {
        this.fetch();
    }

    // ngAfterViewInit() {
    //     this.dataSource.paginator = this.paginator;
    // }

    fetch() {
        let usr = localStorage.getItem("tnthvn_usr")
        this.service.GetList().subscribe((rs) => {
            rs.forEach(item => {
                if(item.username === usr) {
                    this.isAdmin = item.isAdmin
                }
                if(this.isAdmin == true) {
                    this.displayedColumns = ["id", "fistName" , "studentsCode", "className", "majoring", "actions"];
                } else {
                    this.displayedColumns = ["id", "fistName", "studentsCode", "className", "majoring"];
                }
            })
            this.length = rs.length;
            this.dataSource = rs.filter(item => item.username !== 'Admin');;
        });
    }

    add() {
        let dialogRef = this.dialog.open(AddStudentComponent, {
            panelClass: "actions-list-students-dialog",
            data: {
                title: "Thêm sinh viên",
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.fetch();
            }
        });
    }

    edit(item:any) {
        let dialogRef = this.dialog.open(AddStudentComponent, {
            panelClass: "actions-list-students-dialog",
            data: {
                item: item,
                title: "Sửa thông tin sinh viên",
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.fetch();
            }
        });
    }

    delete(item:any){
        let confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });

        confirmDialogRef.componentInstance.confirmMessage =
            "Common.Msg.DeleteConfirm";
            confirmDialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.service.Delete(item.id).subscribe((rs) => {
                        if(rs){
                            this.snackBar.open(
                                this.translate.transform(
                                    "Common.Msg.DeleteSuccess"
                                ),
                                "OK",
                                {
                                    verticalPosition: "top",
                                    duration: 2000,
                                }
                            );
                            this.fetch();
                        }
                        else {
                            this.snackBar.open(
                                this.translate.transform("Common.Msg.DeleteError"),
                                "OK",
                                {
                                    verticalPosition: "top",
                                    duration: 2000,
                                }
                            );
                        }
                    });
                }
            });
    }

    search() {
        this.service.Search(this.keyword).subscribe((res) =>{
            this.dataSource = res;
          }, error => {
            console.log(error);
          })
    }
}
