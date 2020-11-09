import { Component, OnInit, Input } from '@angular/core';
import { IState, ITodo } from '../models';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

    states: IState[] = [];

    @Input()
    todo: ITodo;

    constructor(
        private todoService: TodoService
    ) { }

    async ngOnInit() {
        this.states = await this.todoService.getStates();
    }

    async stateChanged() {
        this.todo.stateId = +this.todo.stateId;
        await this.todoService.putTodo(this.todo);
    }
}
