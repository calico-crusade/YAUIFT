import { Component, OnInit } from '@angular/core';
import { IState, ITodo } from '../models';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

    states: IState[] = [];
    todos: ITodo[] = [];

    todoName: string = '';

    filteredStateId: number = 0;

    get filteredTodos() {
        if (this.filteredStateId <= 0 ||
            this.filteredStateId >= this.todos.length) {
            return this.todos;
        }

        var filtered = [];
        for(let todo of this.todos) {
            if (todo.stateId == this.filteredStateId) {
                filtered.push(todo);
            }
        }

        return filtered;
    }

    constructor(
        private todoService: TodoService
    ) { }

    async ngOnInit() {
        this.states = await this.todoService.getStates();
        this.todos = await this.todoService.getTodos();
    }

    async addTodo() {
        try {
            if (this.todoName.length <= 0) {
                return;
            }

            var todo = await this.todoService.postTodo(this.todoName);
            this.todos.push(todo);

            this.filteredStateId = 0;

        } catch (error) {
            alert('An error occurred: ' + error);
        }
    }
}
