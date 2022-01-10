import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TranslatePipe } from '@ngx-translate/core';
import { fuseAnimations } from 'app/core/animations';
import { StudentService } from 'app/student-manager/service/student.service';
import { SubjectJoinService } from '../service/subject-join.service';
import { SubjectRegisterComponent } from './subject-register/subject-register.component';
import { filter } from 'rxjs/operators';
import { FuseConfirmDialogComponent } from 'app/core/components/confirm-dialog/confirm-dialog.component';

@Component({
    templateUrl: './subject-join.component.html',
    styleUrls: ['./subject-join.component.scss'],
    providers: [TranslatePipe,],
    animations: fuseAnimations,
})
export class SubjectJoinComponent implements OnInit {
    item: any = {};
    keyword: string;
    total: number = 0;
    studentId: any;
    isAdmin: boolean = false;
    subjectCount: any = [];
    displayedColumns = ["id", "semester", "subjectCode", "subjectName", "nameEnglish", "classcode", "numberCredit", "actions"];
    dataSource: MatTableDataSource<any>;
    constructor(
        private service: SubjectJoinService,
        private studentService: StudentService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        private translate: TranslatePipe
    ) {
        let usr = localStorage.getItem("tnthvn_usr");
        this.studentService.GetList().subscribe((rs) => {
            rs.forEach(item => {
                if (item.username === usr) {
                    this.item = item;
                    this.studentId = item.id;
                    this.isAdmin = item.isAdmin
                }
            })
        });
    }

    ngOnInit(): void {
        this.fetch();
    }

    fetch() {
        this.service.GetList().subscribe((rs) => {
            let data = rs.filter(x => x.studentId == this.studentId);
            this.dataSource = data;
            data.forEach(item => {
                if(item.studentId == this.studentId){
                    this.total += item.numberCredit;
                }
            })
        });
    }

    add() {
        let dialogRef = this.dialog.open(SubjectRegisterComponent, {
            panelClass: "actions-register-dialog",
            data: {
                title: "Danh sách lớp mở",
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.total = 0;
                this.fetch();
            }
        });
    }

    delete(item: any) {
        let confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });

        confirmDialogRef.componentInstance.confirmMessage =
            "Common.Msg.DeleteConfirm";
        confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.service.Delete(item.id).subscribe((rs) => {
                    if (rs) {
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
                        this.total = 0;
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
}
