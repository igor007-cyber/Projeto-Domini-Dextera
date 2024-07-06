import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FilterDefaultModel } from '../_model/filter-default-model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckInService } from '../_services/checkin.service';
import { CheckOutService } from '../_services/checkout.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html'
})

export class InventoryComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  checkIn = false;
  formType: FormGroup;
  submitted = false;
  lst = [];
  inventory: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private checkInService: CheckInService,
    private checkOutService: CheckOutService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.formType = this.formBuilder.group({
      isCheckIn: ['false',],
    });
  }


  onSubmitCheckIn() {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    this.checkInService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onSubmitCheckOut() {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    this.checkOutService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  handleChange(evt) {
    if (evt.target.checked) {
      if (evt.target.id === 'checkIn') {
        this.checkIn = true;
        this.onSubmitCheckIn();
      }
      if (evt.target.id === 'checkOut') {
        this.checkIn = false;
        this.onSubmitCheckOut();
      }
    }
  }



//   deleteById(template: TemplateRef<any>, inventory: Inventory) {
//     this.inventory = inventory;
//     this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
//   }

//   confirmDelete() {
//     this.brandService.deleteById(this.inventory.id).subscribe(() => {
//       const index: number = this.lst.indexOf(this.inventory);
//       if (index !== -1) {
//         this.lst.splice(index, 1);
//       }
//       this.closeDelete();
//       this.toastr.success('Excluído com sucesso!', '');
//     });
//   }

//   closeDelete() {
//   this.modalDelete.hide();
//   }



}
