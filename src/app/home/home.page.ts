import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  french() {
    this.router.navigate(['/local']);
    localStorage.setItem('langue', 'fr');
  }
  arab() {
    this.router.navigate(['/local']);
    localStorage.setItem('langue', 'ar');
  }

}
