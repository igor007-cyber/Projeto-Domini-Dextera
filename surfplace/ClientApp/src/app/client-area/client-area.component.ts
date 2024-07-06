import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CheckInService } from '../_services/checkin.service';
import { FilterDefaultModel } from '../_model/filter-default-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { FileHelper } from '../_helpers/file-helper';

@Component({
    selector: 'app-client-area',
    templateUrl: './client-area.component.html'
})

export class ClientAreaComponent implements OnInit {
    canvas: any;
    ctx: any;
    chart: any;
    dataset: any[] = [];
    form: FormGroup;
    formRel: FormGroup;
    lst = [];
    products = [];
    constructor(private checkInService: CheckInService,
        private formBuilder: FormBuilder,
        private fileHelper: FileHelper,
        private productService: ProductService,) {
    }

    ngOnInit() {

        this.form = this.formBuilder.group({
            product: [''],
          });

          this.formRel = this.formBuilder.group({
            product: [''],
          });

          const filter: FilterDefaultModel = new FilterDefaultModel();
          this.productService.getByFilter(filter).subscribe(result => {
          this.lst = result;
          this.products = result;
        });

        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        this.chart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                datasets: [{
                    label: "",
                    data: [],
                    backgroundColor: ["red", , , , , , , , "orange"],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                responsive: false
            }
        });

        // this.onSubmitCheckIn();
    }



    loadChart(data, label) {
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        this.chart.destroy();
        this.chart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: ["red","blue","orange","green","black","gray","yellow","red","blue","orange","green","black"],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                responsive: false
            }
        });


        
    }

    onSubmitCheckIn(id) {
        this.dataset = [];
        const filter: FilterDefaultModel = new FilterDefaultModel();
        filter.id = id;
        let ammount = 0;
        this.checkInService.getByFilter(filter).subscribe(
            result => {
                if (result.length > 0) {
                    for (let i = 1; i < 13; i++) {
                        result.forEach(r => {
                            let dt = new Date(r.checkInDate);
                            let month = dt.getUTCMonth() + 1;
                            if (month === i) {
                                ammount = ammount + r.quantity;
                            }
                        });
                        this.dataset.push(ammount);
                        ammount = 0;
                      }
                }
                console.log(this.dataset);
                this.loadChart(this.dataset,"");
            }
        );
    }

    onChange(){
        if (this.form.controls.product.value !== undefined) {
          this.onSubmitCheckIn(Number(this.form.controls.product.value));
        } 
      }

      onChangeProduct() {
        if (this.formRel.controls.product.value !== undefined) {
            const filter: FilterDefaultModel = new FilterDefaultModel();
            filter.id = this.formRel.controls.product.value;
            this.productService.rel(filter).subscribe((data: any) => {
              if (data) {
                this.fileHelper.Download(data, 'application/excel', 'rel.xlsx');
              } 
            });
          } 

      }

}

