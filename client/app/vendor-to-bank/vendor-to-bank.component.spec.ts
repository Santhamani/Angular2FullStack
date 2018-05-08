import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorToBankComponent } from './vendor-to-bank.component';

describe('VendorToBankComponent', () => {
  let component: VendorToBankComponent;
  let fixture: ComponentFixture<VendorToBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorToBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorToBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
