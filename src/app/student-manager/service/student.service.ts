import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    onLoaded: EventEmitter<any> = new EventEmitter<any>();

    public feedbackApi = 'https://5f7415b4b63868001615ff6f.mockapi.io/students-list/';
    constructor(private http: HttpClient) { }

    GetList(): Observable<any> {
        return this.http.get(this.feedbackApi);
    }

    getMyProfile() {
        var me = this;
        return this.http.get(this.feedbackApi).toPromise().then(res => {
            let myProfile = res as any;
            me.onLoaded.emit(myProfile.info);
        });
    }

    Search(keyword: string): Observable<any> {
        return this.http.get(this.feedbackApi + "?search=" + keyword);
    }

    Add(data: any) {
        return this.http.post(this.feedbackApi, data);
    }

    Edit(id: number, data: any): Observable<any> {
        return this.http.put(this.feedbackApi + id, data);
    }

    Delete(id: number): Observable<any> {
        return this.http.delete(this.feedbackApi + id);
    }
}
