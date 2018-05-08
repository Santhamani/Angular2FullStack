import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Rat } from '../shared/models/rat.model';


@Injectable()
export class RatService { 

    constructor(private http: HttpClient) { }

    getRats(): Observable<Rat[]>{
        return this.http.get<Rat[]>('/api/rats');
    }

    countRats(): Observable<number>{
        return this.http.get<number>('/api/rats/count');
    }

    addRat(rat: Rat): Observable<Rat>{
        return this.http.post<Rat>('/api/rat', rat);
    }

    getRat(rat: Rat): Observable<Rat> {
        return this.http.get<Rat>(`/api/rat/${rat._id}`);
      }
    
      editRat(rat: Rat): Observable<string> {
        return this.http.put(`/api/rat/${rat._id}`, rat, { responseType: 'text' });
      }
    
      deleteRat(rat: Rat): Observable<string>
       {
         return this.http.delete(`/api/rat/${rat._id}`, { responseType: 'text' });
      }
    
}