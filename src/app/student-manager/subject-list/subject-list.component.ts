import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { TranslatePipe } from '@ngx-translate/core';
import { fuseAnimations } from 'app/core/animations';
import { SubjectService } from '../service/subject.service';
import { AddSubjectComponent } from './add-subject/add-subject.component';

@Component({
    templateUrl: './subject-list.component.html',
    styleUrls: ['./subject-list.component.scss'],
    providers: [TranslatePipe, ],
    animations: fuseAnimations,
})
export class SubjectListComponent implements OnInit {
    keyword: string;
    displayedColumns = ["id", "subjectCode", "subjectName", "timeLearn", "numberCredit", "tuitionCredit", "managementInstitute", "nameEnglish", "weight"];
    dataSource: MatTableDataSource<any>;
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        private service: SubjectService,
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
        this.service.GetList().subscribe((rs) => {
            this.dataSource = rs;
        });
    }

    add() {
        let dialogRef = this.dialog.open(AddSubjectComponent, {
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

    edit(item: any) {
        let dialogRef = this.dialog.open(AddSubjectComponent, {
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
        this.service.Search(this.keyword).subscribe((res) => {
            this.dataSource = res;
        }, error => {
            console.log(error);
        })
    }
}
