import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/_model/product-model';
import { forkJoin } from 'rxjs';
import { BrandService } from 'src/app/_services/brand.service';
import { FilterDefaultModel } from 'src/app/_model/filter-default-model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public product: Product = new Product();

  lstBrand = [];
  uploaded = false;
  brand = [];

  logo: any;
  public files: any = [];

  @ViewChild('fileUpload') fileUpload: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private brandService: BrandService
  ) { }

  get f() { return this.formAdd.controls; }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id > 0) {
        this.product.id = Number(params.id);
      }
    });

    this.formAdd = this.formBuilder.group({
      id: [0],
      description: ['', [Validators.required]],
      code: [''],
      valueMinimum: ['', [Validators.required]],
      value: ['', [Validators.required]],
      brand: ['', [Validators.required]],
    });

    const filter: FilterDefaultModel = new FilterDefaultModel();
      this.brandService.getByFilter(filter).subscribe(result => {
      this.lstBrand = result;
      if (this.product.id > 0) {
        this.load();
      }
    });

  }

  load() {
    this.productService.get(this.product.id).subscribe(product => {
     this.product = product;
     this.setControls(this.product);
   });
 }

  setControls(item: Product) {
    this.formAdd.controls.id.setValue(item.id);
    this.formAdd.controls.description.setValue(item.description);
    this.formAdd.controls.code.setValue(item.code);
    this.formAdd.controls.value.setValue(item.value);
    this.formAdd.controls.valueMinimum.setValue(item.valueMinimum);
    this.formAdd.controls.brand.setValue(item.brandId);
    this.logo = environment.urlImageProduct + item.imageName;
  }

  onSave() {
    if ((this.files.length === 0) && (this.logo === undefined)){
      this.toastr.error('Selecione uma Foto!');
      return;
    }
    this.submitted = true;
    if (this.formAdd.invalid) {
      return;
    }
    const formData = new FormData();
    this.product.valueMinimum = this.formAdd.controls.valueMinimum.value;
    this.product.description = this.formAdd.controls.description.value;
    this.product.code = this.formAdd.controls.code.value;
    this.product.value = this.formAdd.controls.value.value;
    this.product.brandId = Number(this.formAdd.controls.brand.value);

    formData.append('product', JSON.stringify(this.product));
    if(this.files.length > 0) {
      this.files.forEach(f => {
        formData.append('file', f.file, f.file.name);
    });
  }
    this.productService.save(formData).subscribe(result => {
      this.toastr.success('Registro efetuado com sucesso!');
      this.router.navigate(['client-area/product']);
    });
  }

  onCancel() {
    this.router.navigate(['client-area/product']);
  }

  onFileChange(event) {
    if (event.target.files.length > 3) {
    return this.toastr.error('Só é permitido anexar três arquivos ou menos!');
    }

    if (event.target.files.length > 0) {
      // this.onResetFileChange();
      this.files = [];
      for (const file of event.target.files) {
        this.files.push({ file });
      }
    }
  }

  onResetFileChange() {
    this.fileUpload.nativeElement.value = '';
}

getImage(nomeImage) {
  return environment.urlImageProduct + nomeImage;
}



}

