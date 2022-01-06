import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { TranslatePipe } from "@ngx-translate/core";
import { fuseAnimations } from "app/core/animations";
import { FuseConfirmDialogComponent } from "app/core/components/confirm-dialog/confirm-dialog.component";
import { StudentService } from "../service/student.service";

@Component({
    templateUrl: "./student-info.component.html",
    styleUrls: ["./student-info.component.scss"],

    providers: [TranslatePipe, StudentService],
    animations: fuseAnimations,
})
export class StudentInfoComponent implements OnInit {
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
        private translate: TranslatePipe,
        private studentService: StudentService
    ) {}

    ngOnInit(): void {
        let usr = localStorage.getItem("tnthvn_usr");
        this.studentService.GetList().subscribe((rs) => {
            rs.forEach((item) => {
                if (item.username === usr) {
                    this.isAdmin == item.isAdmin;
                }
            });
        });
        this.fetch();
    }
    fetch() {
        let usr = localStorage.getItem("tnthvn_usr");
        this.service.GetList().subscribe((rs) => {
            rs.forEach((item) => {
                if (item.username === usr) {
                    this.isAdmin = item.isAdmin;
                }
                if (this.isAdmin == true) {
                    this.displayedColumns = [
                        "id",
                        "name",
                        "studentsCode",
                        "className",
                        "majoring",
                        "actions",
                    ];
                } else {
                    this.displayedColumns = [
                        "id",
                        "name",
                        "studentsCode",
                        "className",
                        "majoring",
                    ];
                }
            });
            this.length = rs.length;
            // hide admin in student list
            this.dataSource = rs.filter((item) => item.username !== "Admin");
        });
    }
}
