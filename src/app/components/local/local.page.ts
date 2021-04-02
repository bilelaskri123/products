import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalService} from '../../services/local.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-local',
  templateUrl: './local.page.html',
  styleUrls: ['./local.page.scss'],
})
export class LocalPage implements OnInit {

  langue: string;
  locals = [];
  local: string;
  constructor(private router: Router, private localService: LocalService) { }

  ngOnInit() {
    this.langue = localStorage.getItem('langue');
    this.getLocals();
  }

  getLocals() {
    this.localService.getLocals().subscribe(locals => {
      this.locals = locals.locals;
      console.log(this.locals);
    });
  }

  selectLocal(form: NgForm) {
    console.log(form.value);
    if (form.value.localFr) {
      this.local = form.value.localFr;
    } else {
      this.local = form.value.localAr;
    }
    this.router.navigate(['/category']);
    localStorage.setItem('local', this.local);
  }
}
