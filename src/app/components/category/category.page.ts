import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  langue: string;
  categories = [];
  category: string;
  constructor(private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    this.langue = localStorage.getItem('langue');
    this.getCategories();
  }

  selectCategory(form: NgForm) {
    console.log(form.value);
    if (form.value.categoryfr) {
      this.category = form.value.categoryfr;
    } else {
      this.category = form.value.categoryAr;
    }
    this.router.navigate(['/products']);
    localStorage.setItem('category', this.category);
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories.categories;
      console.log(this.categories);
    });
  }
}
