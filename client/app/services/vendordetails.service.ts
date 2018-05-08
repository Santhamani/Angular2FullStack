import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Vendor } from '../shared/models/vendordetails.model';

@Injectable()
export class VendorDetailsService { 

    constructor(private http: HttpClient) { }

    getVendors(): Observable<Vendor[]>{
        return this.http.get<Vendor[]>(`/api/vendors`);
    }

    countVendors(): Observable<number>{
        return this.http.get<number>(`/api/vednors/count`);
    }

    addVendor(vendor: Vendor): Observable<Vendor>{
        return this.http.post<Vendor>(`/api/vendor`, vendor);
    }

    getVendor(vendor: Vendor): Observable<Vendor> {
        return this.http.get<Vendor>(`/api/vendor/${vendor._id}`);
      }

      editVendor(vendor: Vendor): Observable<string> {
        return this.http.put(`/api/vendor/${vendor._id}`, vendor, { responseType: 'text' });
      }
    
      deleteVendor(vendor: Vendor): Observable<string>
       {
         return this.http.delete(`/api/Vendor/${vendor._id}`, { responseType: 'text' });
      }
    
}