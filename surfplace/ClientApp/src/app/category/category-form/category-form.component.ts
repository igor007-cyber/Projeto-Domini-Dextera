import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/_model/category-model';
import { CategoryService } from 'src/app/_services/category.service';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public category: Category = new Category();
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
    private categoryService: CategoryService,

  ) { }

  get q() { return this.formAdd.controls; }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id > 0) {
        this.category.id = Number(params.id);
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
    if (this.category.id > 0) {
      this.categoryService.getById(this.category.id).subscribe(result => {
        this.category = result;
        this.formAdd.controls.id.setValue(this.category.id);
        this.formAdd.controls.description.setValue(this.category.description);
      });
    }

  }

  onSave() {
    this.submitted = true;
    if (this.formAdd.invalid) {
      return;
    }
    const item = new Category();
    item.id = this.category.id;
    item.description = this.formAdd.controls.description.value;


    this.categoryService.save(item).subscribe(result => {
      this.toastr.success('Registro efetuado com sucesso!');
      this.router.navigate(['client-area/category']);
    });
  }

  onCancel() {
    this.router.navigate([`client-area/category`]);
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

