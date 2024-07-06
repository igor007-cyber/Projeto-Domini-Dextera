import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/_model/brand-model';
import { BrandService } from 'src/app/_services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html'
})
export class BrandFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public brand: Brand = new Brand();
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
    private brandService: BrandService,

  ) { }

  get q() { return this.formAdd.controls; }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id > 0) {
        this.brand.id = Number(params.id);
        this.load();
      }
    });

    this.formAdd = this.formBuilder.group({
      id: [0],
      description: ['', [Validators.required, Validators.maxLength(255)]],
    });

    this.load();

  }

  load() {
    if (this.brand.id > 0) {
      this.brandService.getById(this.brand.id).subscribe(result => {
        this.brand = result;
        this.formAdd.controls.id.setValue(this.brand.id);
        this.formAdd.controls.description.setValue(this.brand.description);
      });
    }

  }

  onSave() {
    this.submitted = true;
    if (this.formAdd.invalid) {
      return;
    }
    const item = new Brand();
    item.id = this.brand.id;
    item.description = this.formAdd.controls.description.value;


    this.brandService.save(item).subscribe(result => {
      this.toastr.success('Registro efetuado com sucesso!');
      this.router.navigate(['client-area/brand']);
    });
  }

  onCancel() {
    this.router.navigate([`client-area/brand`]);
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

