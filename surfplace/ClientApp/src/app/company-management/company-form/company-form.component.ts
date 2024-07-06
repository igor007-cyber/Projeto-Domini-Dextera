import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/_model/company-model';
import { CompanyService } from 'src/app/_services/company.service';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html'
})
export class CompanyFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public company: Company = new Company();
  configEditor: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: '',
    translate: 'no',
    defaultParagraphSeparator: '',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [],
      ['toggleEditorMode', 'removeFormat']
    ]
  };
  public isEdit = false;
  public isView = false;
  public isNew = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private companyService: CompanyService,

  ) { }

  get q() { return this.formAdd.controls; }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id > 0) {
        this.company.id = Number(params.id);
        this.load();
      }
    });

    this.formAdd = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.maxLength(255)]],
      cnpj: [''],
    });

    this.load();

  }

  load() {
    if (this.company.id > 0) {
      this.companyService.getById(this.company.id).subscribe(result => {
        this.company = result;
        this.formAdd.controls.id.setValue(this.company.id);
        this.formAdd.controls.name.setValue(this.company.name);
        this.formAdd.controls.cnpj.setValue(this.company.cnpj);
      });
    }

  }

  onSave() {
    this.submitted = true;
    if (this.formAdd.invalid) {
      return;
    }
    const item = new Company();
    item.id = this.company.id;
    item.cnpj = this.formAdd.controls.cnpj.value;
    item.name = this.formAdd.controls.name.value;


    this.companyService.save(item).subscribe(result => {
      this.toastr.success('Registro efetuado com sucesso!');
      this.router.navigate(['master-area/company']);
    });
  }

  onCancel() {
    this.router.navigate([`master-area/company`]);
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

