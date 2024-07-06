import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FinSystem } from '../_model/fin-system-model';
import { FilterDefaultModel } from '../_model/filter-default-model';
import { ProviderService } from 'src/app/_services/provider.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Provider } from '../_model/provider-model';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html'
})

export class ProviderComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  provider: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private providerService: ProviderService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      description: ['']
    });
    this.onSubmit();
  }

  get f() { return this.form.controls; }

  onSubmit() {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    filter.name = this.form.controls.description.value;
    this.providerService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`client-area/provider/0/0`]);
  }

  edit(obj: FinSystem) {
    this.router.navigate([`client-area/provider/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, provider: Provider) {
    this.provider = provider;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.providerService.deleteById(this.provider.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.provider);
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

  onActive(item) {
    this.providerService.active(item).subscribe(result => {
      this.onSubmit();
    });
  }




}
