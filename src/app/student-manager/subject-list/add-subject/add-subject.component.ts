import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe } from '@ngx-translate/core';
import { SubjectService } from 'app/student-manager/service/subject.service';

@Component({
    templateUrl: './add-subject.component.html',
    styleUrls: ['./add-subject.component.scss'],
    providers: [TranslatePipe, SubjectService],
    encapsulation: ViewEncapsulation.None,
})
export class AddSubjectComponent implements OnInit {
    item: any = {};
    form: FormGroup;
    formErrors: any;
    isEdit: boolean;
    constructor(
        private service: SubjectService,
        public snackBar: MatSnackBar,
        private translate: TranslatePipe,
        public dialogRef: MatDialogRef<AddSubjectComponent>,
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
     }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            subjectCode: new FormControl(this.item.subjectCode),
            subjectName: new FormControl(this.item.subjectName),
            timeLearn: new FormControl(this.item.timeLearn),
            numberCredit: new FormControl(this.item.numberCredit),
            tuitionCredit: new FormControl(this.item.tuitionCredit),
            managementInstitute: new FormControl(this.item.managementInstitute),
            nameEnglish: new FormControl(this.item.nameEnglish),
            weight: new FormControl(this.item.weight),
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
