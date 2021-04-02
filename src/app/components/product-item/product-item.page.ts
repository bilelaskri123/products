import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PriceService} from '../../services/price.service';
import {Price} from '../../models/Price';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.page.html',
  styleUrls: ['./product-item.page.scss'],
})
export class ProductItemPage implements OnInit {
  prices: Price[];
  data = [];
  labels = [];
  imageUrl: string;
  local: string;
  productName: string;
  langue: string;
  mediumPrice: number;
  maxPrice: number;
  minPrice: number;
  unity: string;
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  constructor(private activatedRoute: ActivatedRoute, private priceService: PriceService) { }

  ngOnInit() {
    this.langue = localStorage.getItem('langue');
    this.getPrices();
  }

  getPrices() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const productId = paramMap.get('productId');
      this.priceService.getPrices(productId).subscribe((pricesData) => {
        this.prices = pricesData.prices;
        console.log(this.prices);
        this.imageUrl = this.prices[this.prices.length - 1].imageUrl;
        this.local = this.prices[this.prices.length - 1].local;
        this.productName = this.prices[this.prices.length - 1].productName;
        this.mediumPrice = this.prices[this.prices.length - 1].mediumPrice;
        this.maxPrice = this.prices[this.prices.length - 1].maxPrice;
        this.minPrice = this.prices[this.prices.length - 1].minPrice;
        this.unity = this.prices[this.prices.length - 1].unity;
        this.prices.map(price => {
          this.data.push(price.mediumPrice);
          this.labels.push(new Date(price.date).toLocaleDateString());
        });
        this.lineChartData[0].data = [...this.data];
        this.lineChartLabels = this.labels;
        this.lineChartData[0].label = this.prices[0].productName;
      });
    });
  }

}
