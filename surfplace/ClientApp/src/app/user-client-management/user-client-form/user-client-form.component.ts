import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ApplicationUser } from 'src/app/_model/application-user';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { LoginUser } from 'src/app/_model/login-user-model';
import { CompanyService } from 'src/app/_services/company.service';
import { FilterDefaultModel } from 'src/app/_model/filter-default-model';

@Component({
  selector: 'app-user-client-form',
  templateUrl: './user-client-form.component.html'
})
export class UserClientFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public companies = [];
  public userClient: ApplicationUser = new ApplicationUser();
  public isEdit = false;
  public isView = false;
  public isNew = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private companyService: CompanyService,

  ) { }

  get q() { return this.formAdd.controls; }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id > 0) {
        this.userClient.id = params.id;
        this.load();
      }
    });

    this.formAdd = this.formBuilder.group({
      id: [0],
      userName: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.maxLength(255)]],
      company: ['', Validators.required]
    });

    const filter: FilterDefaultModel = new FilterDefaultModel();
    this.companyService.getByFilter(filter).subscribe(
      data => {
        this.companies = data;
      }
    );
    this.load();

  }

  get f() { return this.formAdd.controls; }

  load() {
    // if (this.userClient.id !== null) {
    //   this.authenticationService.getById(this.userClient.id).subscribe(result => {
    //     this.userClient = result;
    //     this.formAdd.controls.id.setValue(this.userClient.id);
    //     this.formAdd.controls.userName.setValue(this.userClient.userName);
    //     this.formAdd.controls.email.setValue(this.userClient.email);
    //     this.formAdd.controls.companyId.setValue(this.userClient.companyId);

    //   });
    // }

  }

  onSave() {
    this.submitted = true;
    if (this.formAdd.invalid) {
      return;
    }
    const item = new LoginUser();
    item.userName = this.formAdd.controls.userName.value;
    item.email = this.formAdd.controls.email.value;
    item.companyId = this.formAdd.controls.company.value;


    this.authenticationService.registerClient(item).subscribe(result => {
      this.toastr.success('Registro efetuado com sucesso!');
      this.router.navigate(['master-area/user-client']);
    });
  }

  onCancel() {
    this.router.navigate([`master-area/user-client`]);
  }

  canEdit() {
    return this.isEdit;
  }

  canView() {
    return this.isView;
  }

  canSave() {
    return this.isNew;
  }




}

