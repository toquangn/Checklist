import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  user: string;

  constructor(private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.user = params.username;
    });
  }

}
