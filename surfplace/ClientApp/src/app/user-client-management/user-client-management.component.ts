import { ApplicationUser } from './../_model/application-user';
import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FinSystem } from '../_model/fin-system-model';
import { FilterDefaultModel } from '../_model/filter-default-model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-client-management',
  templateUrl: './user-client-management.component.html'
})

export class UserClientManagementComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  userClient: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.onSubmit();
  }

  onSubmit() {
    this.authenticationService.getClients().subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`master-area/user-client/0/0`]);
  }

  edit(obj: FinSystem) {
    this.router.navigate([`master-area/user-client/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, userClient: ApplicationUser) {
    this.userClient = userClient;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.authenticationService.deleteById(this.userClient.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.userClient);
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




}
