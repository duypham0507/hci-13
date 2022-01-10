import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    onLoaded: EventEmitter<any> = new EventEmitter<any>();

    public studentApi = 'https://5f7415b4b63868001615ff6f.mockapi.io/students-list/';
    constructor(private http: HttpClient) { }

    GetList(): Observable<any> {
        return this.http.get(this.studentApi);
    }

    GetById(id: number): Observable<any> {
        return this.http.get(this.studentApi + id);
    }

    getMyProfile() {
        var me = this;
        return this.http.get(this.studentApi).toPromise().then(res => {
            let myProfile = res as any;
            me.onLoaded.emit(myProfile.info);
        });
    }

    Search(keyword: string): Observable<any> {
        return this.http.get(this.studentApi + "?search=" + keyword);
    }

    Add(data: any) {
        return this.http.post(this.studentApi, data);
    }

    Edit(id: number, data: any): Observable<any> {
        return this.http.put(this.studentApi + id, data);
    }

    Delete(id: number): Observable<any> {
        return this.http.delete(this.studentApi + id);
    }
}
