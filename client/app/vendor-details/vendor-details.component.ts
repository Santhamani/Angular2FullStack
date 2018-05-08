import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { VendorDetailsService } from '../services/vendordetails.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Vendor } from '../shared/models/vendordetails.model';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.css']
})
export class VendorDetailsComponent implements OnInit {

  vendor = new Vendor();
  vendors: Vendor[] = [];
  isLoading = true;
  isEditing = false;

  addVendorDetailsFrom: FormGroup;
  vendortype = new FormControl('',Validators.required);
  vendorname = new FormControl('',Validators.required);
  shoplocation = new FormControl('', Validators.required);
  shopaddress = new FormControl('',Validators.required);
  shopcontactnumber = new FormControl('', Validators.required);


  constructor( private vendordetailsService: VendorDetailsService,
  private formBuilder: FormBuilder,
  public toast: ToastComponent) { }

  ngOnInit() {
    this.getVendors();
    this.addVendorDetailsFrom=this.formBuilder.group({
      vendortype: this.vendortype,
      vendorname: this.vendorname,
      shoplocation: this.shoplocation,
      shopaddress: this.shopaddress,
      shopcontactnumber: this.shopcontactnumber
    });
  }
  getVendors(){
    this.vendordetailsService.getVendors().subscribe(
      data => this.vendors = data,
      error => console.log(error),
      () => this.isLoading =false
    );
  }

  addVendor() {
    this.vendordetailsService.addVendor(this.addVendorDetailsFrom.value).subscribe(
    res => { 
      this.vendors.push(res);
      this.addVendorDetailsFrom.reset();
      this.toast.setMessage('item added successfully.', 'success');
    },
    error => console.log(error)
    );
  }
  enableEditing(vendor:Vendor){
    this.isEditing = true;
    this.vendor = vendor;
  }

  cancelEditing() {
    this.isEditing =false;
    this.vendor =new Vendor();
    this.toast.setMessage('item editing cancelled.', 'warning');
    this.getVendors();
  }

 
  editVendor(vendor:Vendor) {
    console.log(vendor);
    this.vendordetailsService.editVendor(vendor).subscribe(
      () => {
        this.isEditing = false;
        this.vendor = vendor;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }


  deleteVendor(vendor:Vendor) {
    if (window.confirm ('Are you sure you want to permanently delete this item?')) {
      this.vendordetailsService.deleteVendor(vendor).subscribe(
      () => {
        const pos = this.vendors.map( elem => elem._id).indexOf(vendor._id);
        this.vendors.splice(pos,1);
        this.toast.setMessage('item deleted successfully.', 'success');
      },
      error => console.log(error)
    );
  }
}

}
