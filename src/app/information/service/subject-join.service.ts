import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectJoinService {
    public subjectApi = 'https://5f9670d311ab98001603a9c1.mockapi.io/subject-join/';
    constructor(private http: HttpClient) { }

    GetList(): Observable<any> {
        return this.http.get(this.subjectApi);
    }

    GetSingle(param: any): Observable<any> {
        return this.http.get(this.subjectApi + param);
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
