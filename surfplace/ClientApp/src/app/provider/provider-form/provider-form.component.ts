import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Provider } from 'src/app/_model/provider-model';
import { ProviderService } from 'src/app/_services/provider.service';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html'
})
export class ProviderFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public provider: Provider = new Provider();
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
    private providerService: ProviderService,

  ) { }

  get q() { return this.formAdd.controls; }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id > 0) {
        this.provider.id = Number(params.id);
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
    if (this.provider.id > 0) {
      this.providerService.getById(this.provider.id).subscribe(result => {
        this.provider = result;
        this.formAdd.controls.id.setValue(this.provider.id);
        this.formAdd.controls.description.setValue(this.provider.description);
      });
    }

  }

  onSave() {
    this.submitted = true;
    if (this.formAdd.invalid) {
      return;
    }
    const item = new Provider();
    item.id = this.provider.id;
    item.description = this.formAdd.controls.description.value;


    this.providerService.save(item).subscribe(result => {
      this.toastr.success('Registro efetuado com sucesso!');
      this.router.navigate(['client-area/provider']);
    });
  }

  onCancel() {
    this.router.navigate([`client-area/provider`]);
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

