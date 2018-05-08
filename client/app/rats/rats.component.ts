import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { RatService } from '../services/rat.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Rat } from '../shared/models/rat.model';
@Component({
  selector: 'app-rats',
  templateUrl: './rats.component.html',
  styleUrls: ['./rats.component.css']
})
export class RatsComponent implements OnInit {

  rat = new Rat();
  rats: Rat[] =[];
  isLoading = true;
  isEditing = false;

  addRatForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private ratService: RatService,
  private formBuilder: FormBuilder,
  public toast: ToastComponent) { }

  ngOnInit() {
    this.getRats();
    this.addRatForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });
  }

  getRats() {
    this.ratService.getRats().subscribe(
      data => this.rats = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addRat() {
    this.ratService.addRat(this.addRatForm.value).subscribe(
      res => {
        this.rats.push(res);
        this.addRatForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }
  enableEditing(rat: Rat) {
    this.isEditing = true;
    this.rat = rat;
  }

  cancelEditing() {
    this.isEditing = false;
    this.rat = new Rat();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the rats to reset the editing
    this.getRats();
  }

  editRat(rat: Rat) {
    this.ratService.editRat(rat).subscribe(
      () => {
        this.isEditing = false;
        this.rat = rat;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteRat(rat: Rat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.ratService.deleteRat(rat).subscribe(
        () => {
          const pos = this.rats.map(elem => elem._id).indexOf(rat._id);
          this.rats.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
