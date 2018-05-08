import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VendorBank } from '../shared/models/vendorbank.model';

@Injectable()
export class VendorBankService { 

    constructor(private http: HttpClient) { }

    getVendorBanks(): Observable<VendorBank[]>{
        return this.http.get<VendorBank[]>(`/api/vendorbanks`);
    }

    countVendorBanks(): Observable<number>{
        return this.http.get<number>(`/api/vendorbanks/count`);
    }

    addVendorBank(vendorbank: VendorBank): Observable<VendorBank>{
        return this.http.post<VendorBank>(`/api/vendorbank`, vendorbank);
    }

    getVendorBank(vendorbank: VendorBank): Observable<VendorBank> {
        return this.http.get<VendorBank>(`/api/vendorbank/${vendorbank._id}`);
      }

      editVendorBank(vendorbank: VendorBank): Observable<string> {
        return this.http.put(`/api/vendorbank/${vendorbank._id}`, vendorbank, { responseType: 'text' });
      }
    
      deleteVendorBank(vendorbank: VendorBank): Observable<string>
       {
         return this.http.delete(`/api/VendorBank/${vendorbank._id}`, { responseType: 'text' });
      }
    
}