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
  todos = {}

  constructor(private _router: Router, private _route: ActivatedRoute, private _todo: TodoService) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.user = params.username;
    });

    this._todo.getUserTodos(this.user)
    .subscribe(
      res => {
        this.todos = res;
      },
      err => console.log('err: ', err)
    );
  }

}
