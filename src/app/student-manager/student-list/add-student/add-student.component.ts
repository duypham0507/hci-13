import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe } from '@ngx-translate/core';
import { StudentService } from 'app/student-manager/service/student.service';

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrls: ['./add-student.component.scss'],
    providers: [TranslatePipe, StudentService],
    encapsulation: ViewEncapsulation.None,
})
export class AddStudentComponent implements OnInit {
    item: any = {};
    form: FormGroup;
    formErrors: any;

    name: FormControl;
    studentsCode: FormControl;
    dateOfBirth: FormControl;
    className: FormControl;
    status: FormControl;

    isEdit: boolean;

    constructor(
        private service: StudentService,
        public snackBar: MatSnackBar,
        private translate: TranslatePipe,
        public dialogRef: MatDialogRef<AddStudentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder
    ) {
        if (this.data.item) {
            this.item = this.data.item;
            this.isEdit = true;
        }
        else {
            this.isEdit = false;
        };
        this.formErrors = {
            name: {},
            studentsCode: {},
            dateOfBirth: {},
            className: {}, 
        };
     }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: new FormControl(this.item.name),
            studentsCode: new FormControl(this.item.studentsCode),
            dateOfBirth: new FormControl(this.item.dateOfBirth),
            className: new FormControl(this.item.className)
        });
        this.form = this.formBuilder.group({
            name: this.name,
            studentsCode: this.studentsCode,
            dateOfBirth: this.dateOfBirth,
            className: this.className,
        });
    }

    save() {
        if (this.isEdit) {
            this.service.Edit(this.item.id, this.item).subscribe((res) => {
                if (res) {
                    this.processResponse(true)
                }
                else {
                    this.processResponse(false)
                }
            });
        }
        else {
            this.service.Add(this.item).subscribe(res => {
                if (res) {
                    this.processResponse(true)
                    console.log(res)
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
}
