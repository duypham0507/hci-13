import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { TranslatePipe } from '@ngx-translate/core';
import { SubjectJoinService } from 'app/information/service/subject-join.service';
import { SubjectRegisterService } from 'app/information/service/subject-register.service';
import { StudentService } from 'app/student-manager/service/student.service';

@Component({
    templateUrl: './subject-register.component.html',
    styleUrls: ['./subject-register.component.scss'],
    providers: [TranslatePipe],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SubjectRegisterComponent implements OnInit {
    keyword: string;
    item: any = {};
    selectedItem: any;
    selectedId: any;
    displayedColumns: any[] = ['id', 'subjectCode', 'subjectName', 'classcode', 'numberCredit'];
    dataSource: MatTableDataSource<any>;
    constructor(
        private service: SubjectRegisterService,
        private subjectJoinService: SubjectJoinService,
        private studentService: StudentService,
        public snackBar: MatSnackBar,
        private translate: TranslatePipe,
        public dialogRef: MatDialogRef<SubjectRegisterComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void {
        let usr = localStorage.getItem("tnthvn_usr")
        this.studentService.GetList().subscribe((rs) => {
            rs.forEach(item => {
                if(item.username === usr) {
                    this.item.studentId = item.id
                }
            })
        });
        this.fetch();
    }

    // search(keyCode: Number) {
    //     if (keyCode == 13) {
    //         // this.pageIndex = 0;
    //         this.fetch();
    //     }
    // }

    search() {
        this.service.Search(this.keyword).subscribe((res) => {
            this.dataSource = res;
        }, error => {
            console.log(error);
        })
    }

    fetch() {
        this.service.GetList().subscribe((rs) => {
            this.dataSource = rs;
        });
    }

    rowClick(item: any) {
        debugger
        this.selectedItem = item;
        this.selectedId = item.id;
    }

    checkDuplicate(){
        this.subjectJoinService.GetList().subscribe((rs) => {
            
        });
    }

    processResponse(res) {
        if (res) {
            this.snackBar.open(this.translate.transform('Common.Msg.UpdateSuccess'), 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
            this.dialogRef.close(res);
        }
        else {
            this.snackBar.open(this.translate.transform('Common.Msg.UpdateError'), 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
        }
    }

    select() {
        if (this.selectedItem != undefined) {
            this.item = this.selectedItem;
            this.subjectJoinService.Add(this.item).subscribe(res => {
                if (res) {
                    this.processResponse(true)
                }
                else {
                    this.processResponse(false)
                }
            });
        }
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
