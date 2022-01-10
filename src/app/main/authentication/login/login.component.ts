import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { FuseConfigService } from "../../../core/services/config.service";
import { fuseAnimations } from "../../../core/animations";
import { AuthenticationService } from "../../../shared/services/AuthenticationService";
import { Router } from "@angular/router";
import { Constants } from "../../../shared/constants";
import { CookieService } from "ngx-cookie-service";
import { StudentService } from "app/student-manager/service/student.service";
import { map } from "rxjs/operators";

@Component({
    selector: "fuse-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    animations: fuseAnimations,
})
export class FuseLogin2Component implements OnInit {
    item: any;
    username: FormControl;
    password: FormControl;
    loginForm: FormGroup;
    loginFormErrors: any;
    saveLogin: boolean = false;
    public errorMessage: string = "";

    constructor(
        private service: StudentService,
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private authenService: AuthenticationService,
        private router: Router
    ) {
        this.fuseConfig.setSettings({
            layout: {
                navigation: "none",
                toolbar: "none",
                footer: "none",
                class: "",
            },
        });

        this.loginFormErrors = {
            username: {},
            password: {},
        };
    }

    ngOnInit() {
        let usr = "";
        let pws = "";
        if (localStorage.getItem("tnthvn_save") === "true") {
            usr = localStorage.getItem("tnthvn_usr");
            pws = localStorage.getItem("tnthvn_pws");
            this.saveLogin = true;
        }
        this.loginForm = this.formBuilder.group({
            username: [usr, [Validators.required]],
            password: [pws, Validators.required],
            saveLogin: [this.saveLogin],
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
        this.fetch();
    }

    fetch() {
        this.service.GetList().subscribe((rs) => {
            this.item = rs;
        });
    }
    onSubmit() {
        this.errorMessage = "";
        let usr = this.loginForm.controls["username"].value;
        let pws = this.loginForm.controls["password"].value;
        this.item.forEach((item) => {
            debugger;
            if (item.username == usr && item.password == pws) {
                // if (this.saveLogin) {
                // }
                localStorage.setItem("tnthvn_usr", usr);
                localStorage.setItem("tnthvn_pws", pws);
                localStorage.setItem("tnthvn_save", "true");
                localStorage.setItem("admin", item.isAdmin);
                item.isAdmin == false ? this.router.navigate(["/subject-list"]) : this.router.navigate(["/information/student-info"]);
            } else {
                this.errorMessage =
                    "Đăng nhập thất bại, vui lòng kiểm tra tài khoản và mật khẩu.";
            }
        });
    }

    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }
}
