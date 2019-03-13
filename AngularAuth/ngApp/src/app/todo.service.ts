import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getUserTodos(username){
    return this.http.get(`http://localhost:3000/api/${username}`);
  }

  addTodoItem(username, todo){
    return this.http.post(`http://localhost:3000/api/${username}`, todo);
  }
}
