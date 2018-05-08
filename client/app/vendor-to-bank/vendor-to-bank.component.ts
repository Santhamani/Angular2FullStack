import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { VendorBankService } from '../services/vendorbank.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { VendorBank } from '../shared/models/vendorbank.model';

@Component({
  selector: 'app-vendor-to-bank',
  templateUrl: './vendor-to-bank.component.html',
  styleUrls: ['./vendor-to-bank.component.css']
})
export class VendorToBankComponent implements OnInit {

  vendorbank = new VendorBank();
  vendorbanks: VendorBank[] =[];
  isLoading = true;
  isEditing = false;

  addVendorBankFrom: FormGroup;
  vendorid = new FormControl('',Validators.required);
  vendorbankname = new FormControl('',Validators.required);
  vendorbankaccno = new FormControl('', Validators.required);
  ifsccode = new FormControl('',Validators.required);

  constructor( private vendorbankService: VendorBankService,
  private formBuilder: FormBuilder,
  public toast: ToastComponent ) { }

  ngOnInit() {
    this.getVendorBanks();
    this.addVendorBankFrom=this.formBuilder.group({
      vendorid: this.vendorid,
      vendorbankname: this.vendorbankname,
      vendorbankaccno: this.vendorbankaccno,
      ifsccode: this.ifsccode
    });
  }
  getVendorBanks(){
      this.vendorbankService.getVendorBanks().subscribe(
        data => this.vendorbanks = data,
        error => console.log(error),
        () => this.isLoading =false
    );
  }

  addVendorBank() {
    this.vendorbankService.addVendorBank(this.addVendorBankFrom.value).subscribe(
    res => { 
      this.vendorbanks.push(res);
      this.addVendorBankFrom.reset();
      this.toast.setMessage('item added successfully.', 'success');
    },
    error => console.log(error)
    );
  }

  enableEditing(vendorbank:VendorBank){
    this.isEditing = true;
    this.vendorbank = vendorbank;
  }

  cancelEditing() {
    this.isEditing =false;
    this.vendorbank =new VendorBank();
    this.toast.setMessage('item editing cancelled.', 'warning');
    this.getVendorBanks();
  }

  editVendorBank(vendorbank:VendorBank) {
    console.log(vendorbank);
    this.vendorbankService.editVendorBank(vendorbank).subscribe(
      () => {
        this.isEditing = false;
        this.vendorbank = vendorbank;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteVendorBank(vendorbank:VendorBank) {
    if (window.confirm ('Are you sure you want to permanently delete this item?')) {
      this.vendorbankService.deleteVendorBank(vendorbank).subscribe(
      () => {
        const pos = this.vendorbanks.map( elem => elem._id).indexOf(vendorbank._id);
        this.vendorbanks.splice(pos,1);
        this.toast.setMessage('item deleted successfully.', 'success');
      },
      error => console.log(error)
    );
  }
}

}
