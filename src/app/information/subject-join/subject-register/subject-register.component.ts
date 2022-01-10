import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { TranslatePipe } from '@ngx-translate/core';
import { SubjectJoinService } from 'app/information/service/subject-join.service';
import { SubjectRegisterService } from 'app/information/service/subject-register.service';
import { StudentService } from 'app/student-manager/service/student.service';
import { async } from 'rxjs/internal/scheduler/async';
import { filter } from 'rxjs/operators';

@Component({
    templateUrl: './subject-register.component.html',
    styleUrls: ['./subject-register.component.scss'],
    providers: [TranslatePipe],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SubjectRegisterComponent implements OnInit {
    keyword: string;
    total: number = 0;
    item: any = {};
    listData:any = [];
    selectedItem: any;
    selectedId: any;
    studentId: any;
    checkduplicate: boolean = false;
    displayedColumns: any[] = ['id', 'classcode', 'subjectCode', 'subjectName', 'nameEnglish', 'numberCredit'];
    dataSource: MatTableDataSource<any>;
    constructor(
        private service: SubjectRegisterService,
        private subjectJoinService: SubjectJoinService,
        private studentService: StudentService,
        public snackBar: MatSnackBar,
        private translate: TranslatePipe,
        public dialogRef: MatDialogRef<SubjectRegisterComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        let usr = localStorage.getItem("tnthvn_usr")
        this.studentService.GetList().subscribe((rs) => {
            rs.forEach(item => {
                if (item.username === usr) {
                    this.studentId = item.id
                }
            })
        });
     }

    ngOnInit(): void {
        this.fetch();
        this. getTotal();
    }

    // search(keyCode: Number) {
    //     if (keyCode == 13) {
    //         // this.pageIndex = 0;
    //         this.fetch();
    //     }
    // }

    getTotal(){
        this.subjectJoinService.GetList().subscribe((rs) => {
            rs.forEach(item => {
                if(item.studentId == this.studentId){
                    this.total = this.total + item.numberCredit;
                }
            })
        });
    }

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
        this.selectedItem = item;
        this.item = this.selectedItem;
        this.selectedId = item.id;
       
    }

    async checkDuplicate(subjectName) {
        await this.subjectJoinService.GetList().toPromise().then((rs) => {
            this.listData = rs.filter(x => x.studentId == this.studentId)
            this.listData.forEach(item => {
                if (subjectName == item.subjectName) {
                    this.checkduplicate = true;
                    return;
                } 
            })
        });
    }
    processResponse(res) {
        if (res) {
            this.snackBar.open(this.translate.transform('Đăng kí thành công'), 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
            this.dialogRef.close(res);
        }
        else {
            this.snackBar.open(this.translate.transform('Đăng kí thất bại'), 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
        }
    }

    async register() {
        if (this.selectedItem == undefined) {
            this.snackBar.open(this.translate.transform('Bạn chưa chọn học phần'), 'OK', {
                verticalPosition: 'top',
                duration: 1200
            });
        } else {
            await this.checkDuplicate(this.selectedItem.subjectName);
            if(this.checkduplicate){
                this.snackBar.open(this.translate.transform('Bạn đã đăng kí học phần này'), 'OK', {
                    verticalPosition: 'top',
                    duration: 1200
                });
                this.checkduplicate = false;
                return;
            } else if(this.item.numberCredit >= 3 && this.total >= 22) {
                this.snackBar.open(this.translate.transform('Số tín chỉ đăng kí trong kì không được vượt quá 24 tín'), 'OK', {
                    verticalPosition: 'top',
                    duration: 1200
                });
            } else if(this.item.numberCredit >= 2 && this.total >= 23) {
                this.snackBar.open(this.translate.transform('Số tín chỉ đăng kí trong kì không được vượt quá 24 tín'), 'OK', {
                    verticalPosition: 'top',
                    duration: 1200
                });
            } else if(this.item.numberCredit >= 1 && this.total == 24) {
                this.snackBar.open(this.translate.transform('Bạn đã đăng kí tối đa 24 tín chỉ'), 'OK', {
                    verticalPosition: 'top',
                    duration: 1200
                });
            } 
            else{
                this.item.studentId = this.studentId;
                this.item.semester = 20211;
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
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
