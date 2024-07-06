import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ApplicationUser } from 'src/app/_model/application-user';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { LoginUser } from 'src/app/_model/login-user-model';
import { FilterDefaultModel } from 'src/app/_model/filter-default-model';

@Component({
  selector: 'app-collaborator-form',
  templateUrl: './collaborator-form.component.html'
})
export class CollaboratorFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public companies = [];
  public collaborator: ApplicationUser = new ApplicationUser();
  public isEdit = false;
  public isView = false;
  public isNew = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,

  ) { }

  get q() { return this.formAdd.controls; }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id > 0) {
        this.collaborator.id = params.id;
        this.load();
      }
    });

    this.formAdd = this.formBuilder.group({
      id: [0],
      userName: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.maxLength(255)]],
    });

    const filter: FilterDefaultModel = new FilterDefaultModel();
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


    this.authenticationService.registerCollaborator(item).subscribe(result => {
      this.toastr.success('Registro efetuado com sucesso!');
      this.router.navigate(['client-area/collaborator']);
    });
  }

  onCancel() {
    this.router.navigate([`client-area/collaborator`]);
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

