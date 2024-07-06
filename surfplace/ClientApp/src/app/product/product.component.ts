import { Provider } from './../_model/provider-model';
// import { CheckOut } from './../_model/checkout-model';
// import { CheckIn } from './../_model/checkin-model';
import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Product } from '../_model/product-model';
import { ProductService } from 'src/app/_services/product.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { FilterDefaultModel } from '../_model/filter-default-model';
import { CheckInService } from '../_services/checkin.service';
import { CheckOutService } from '../_services/checkout.service';
import { ProviderService } from '../_services/provider.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  modalCheckIn: BsModalRef;
  modalCheckOut: BsModalRef;
  form: FormGroup;
  formCheckOut: FormGroup;
  formCheckIn: FormGroup;
  loading = false;
  submitted = false;
  submittedCheckIn = false;
  submittedCheckOut = false;
  lst = [];
  lstProvider = [];
  product: any;
  provider = [];
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private providerService: ProviderService,
    private checkInService: CheckInService,
    private checkOutService: CheckOutService,

    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['']
    });

    this.formCheckIn = this.formBuilder.group({
      checkInDate: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      provider: [''],
    });
    this.formCheckOut = this.formBuilder.group({
      checkOutDate: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    });


  this.onSubmit();

  }

  get f() { return this.form.controls; }
  get i() { return this.formCheckIn.controls; }
  get o() { return this.formCheckOut.controls; }

  getImage(nomeImage) {
    return environment.urlImageProduct + nomeImage;
}

  onSubmit() {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    this.productService.getByFilter(filter).subscribe(result => {
    this.lst = result;
  });
  }

  onCheckIn(template: TemplateRef<any>, item: Product) {
    this.formCheckIn.controls.checkInDate.reset();
    this.formCheckIn.controls.quantity.reset();
    this.formCheckIn.controls.provider.reset();
    const filter: FilterDefaultModel = new FilterDefaultModel();
    this.providerService.getByFilter(filter).subscribe(result => {
    this.lstProvider = result;
    this.product = item;
    this.modalCheckIn = this.modalService.show(template, { class: 'modal-md' });
  });


  }

  onCheckOut(template: TemplateRef<any>, item: Product) {
    this.formCheckOut.controls.checkOutDate.reset();
    this.formCheckOut.controls.quantity.reset();
    this.product = item;
    this.modalCheckOut = this.modalService.show(template, { class: 'modal-md' });
  }

  onConfirmCheckIn() {
    this.submittedCheckIn = true;
    if (this.formCheckIn.invalid) {
      return;
    }

    let item = {
      quantity: this.formCheckIn.controls.quantity.value,
      providerId: this.formCheckIn.controls.provider.value ? Number(this.formCheckIn.controls.provider.value) : null,
      checkInDate: new Date(this.formCheckIn.controls.checkInDate.value.year,
        this.formCheckIn.controls.checkInDate.value.month - 1,
        this.formCheckIn.controls.checkInDate.value.day, 0, 0, 0, 0),
        productId: this.product.id
    };

    this.checkInService.save(item).subscribe(result => {
      this.toastr.success('Registro efetuado com sucesso!');
      this.formCheckIn.controls.quantity.reset();
      this.formCheckIn.controls.checkInDate.reset();
      this.closeModalCheckIn();
    });

  }

  onConfirmCheckOut() {
    this.submittedCheckOut = true;
    if (this.formCheckOut.invalid) {
      return;
    }

    let item = {
      quantity: this.formCheckOut.controls.quantity.value,
      checkOutDate: new Date(this.formCheckOut.controls.checkOutDate.value.year,
        this.formCheckOut.controls.checkOutDate.value.month - 1,
        this.formCheckOut.controls.checkOutDate.value.day, 0, 0, 0, 0),
        productId: this.product.id
    };

    // item.quantity = this.formCheckOut.controls.quantity.value;
    // item.checkOutDate = new Date(this.formCheckOut.controls.checkOutDate.value.year,
    //   this.formCheckOut.controls.checkOutDate.value.month - 1,
    //   this.formCheckOut.controls.checkOutDate.value.day, 0, 0, 0, 0);
    //   item.productId = this.product.id;


    this.checkOutService.save(item).subscribe(result => {
      this.toastr.success('Registro efetuado com sucesso!');
      this.formCheckOut.controls.quantity.reset();
      this.formCheckOut.controls.checkOutDate.reset();
      this.closeModalCheckOut();
    });


  }


  onNew() {
    this.router.navigate([`client-area/product/0/0`]);
  }

  edit(obj: Product) {
    this.router.navigate([`client-area/product/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: Product) {
    this.product = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.productService.deleteById(this.product.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.product);
      if (index !== -1) {
        this.lst.splice(index, 1);
      }
      this.closeDelete();
      this.toastr.success('Excluído com sucesso!', '');
    });
  }

  closeDelete() {
  this.modalDelete.hide();
  }

  closeModalCheckIn() {
    this.modalCheckIn.hide();
}

closeModalCheckOut() {
  this.modalCheckOut.hide();
}

  onActive(item) {
    this.productService.active(item).subscribe(result => {
      this.onSubmit();
    });
  }

}
