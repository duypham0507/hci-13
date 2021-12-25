import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { TranslatePipe } from '@ngx-translate/core';
import { SubjectRegisterService } from 'app/information/service/subject-register.service';

@Component({
    templateUrl: './subject-register.component.html',
    styleUrls: ['./subject-register.component.scss'],
    providers: [TranslatePipe],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SubjectRegisterComponent implements OnInit {
    keyword: string;
    selectedItem: any = {};
    displayedColumns: any[] = ['id', 'subjectCode', 'subjectName', 'classcode', 'numberCredit'];
    dataSource: MatTableDataSource<any>;
    constructor(
        private service: SubjectRegisterService,
        public snackBar: MatSnackBar,
        private translate: TranslatePipe,
        public dialogRef: MatDialogRef<SubjectRegisterComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void {
        this.fetch();
    }

    // search(keyCode: Number) {
    //     if (keyCode == 13) {
    //         // this.pageIndex = 0;
    //         this.fetch();
    //     }
    // }

    search() {
        this.service.Search(this.keyword).subscribe((res) =>{
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
    }

    select() {

    }

    cancel(): void {
        this.dialogRef.close();
    }
}
