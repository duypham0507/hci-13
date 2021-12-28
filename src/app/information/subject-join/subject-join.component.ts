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

@Component({
    templateUrl: './subject-join.component.html',
    styleUrls: ['./subject-join.component.scss'],
    providers: [TranslatePipe,],
    animations: fuseAnimations,
})
export class SubjectJoinComponent implements OnInit {
    keyword: string;
    displayedColumns = ["id", "subjectCode", "subjectName", "classcode", "numberCredit", "totalScore", "status"];
    dataSource: MatTableDataSource<any>;
    constructor(
        private service: SubjectJoinService,
        private studentService: StudentService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        private translate: TranslatePipe
    ) {

     }

    ngOnInit(): void {
        let usr = localStorage.getItem("tnthvn_usr");
        var studentId: any
        this.studentService.GetList().subscribe((rs) => {
            rs.forEach(item => {
                if(item.username === usr) {
                    studentId = item.id
                }
            })
        });
        this.fetch(studentId);
    }

    fetch(studentId?: any) { 
        this.service.GetList().subscribe((rs) => {
            this.dataSource = rs.filter(x => x.studentId == studentId);
        });
    }

    add() {
        let dialogRef = this.dialog.open(SubjectRegisterComponent, {
            panelClass: "actions-register-dialog",
            data: {
                title: "Đăng kí môn học",
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.fetch();
            }
        });
    }
}
