import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TranslatePipe } from '@ngx-translate/core';
import { fuseAnimations } from 'app/core/animations';
import { SubjectRegisterComponent } from './subject-register/subject-register.component';

@Component({
    templateUrl: './subject-join.component.html',
    styleUrls: ['./subject-join.component.scss'],
    providers: [TranslatePipe,],
    animations: fuseAnimations,
})
export class SubjectJoinComponent implements OnInit {
    keyword: string;
    displayedColumns = ["id", "subjectCode", "subjectName", "midScore", "finalScore", "totalScore", "status"];
    dataSource: MatTableDataSource<any>;
    constructor(
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        private translate: TranslatePipe
    ) { }

    ngOnInit(): void {
        this.fetch();
    }

    fetch() { }

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
