 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectRegisterService {
    public subjectApi = 'https://5f9670d311ab98001603a9c1.mockapi.io/subject-register/';
    constructor(private http: HttpClient) { }

    GetList(): Observable<any> {
        return this.http.get(this.subjectApi);
    }

    Search(keyword: string): Observable<any> {
        return this.http.get(this.subjectApi + "?search=" + keyword);
    }

    Add(data: any) {
        return this.http.post(this.subjectApi, data);
    }

    Edit(id: number, data: any): Observable<any> {
        return this.http.put(this.subjectApi + id, data);
    }

    Delete(id: number): Observable<any> {
        return this.http.delete(this.subjectApi + id);
    }
}
