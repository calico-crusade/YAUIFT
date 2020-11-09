import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IState, ITodo } from '../models';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

    private subscription: Subscription = null;

    todoId: number = 0;
    todo: ITodo = null;
    states: IState[] = [];
    state: IState = null;
    
    get stateId() {
        return this.todo.stateId;
    }
    set stateId(val: number) {
        this.todo.stateId = +val;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private todosService: TodoService
    ) { }

    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }

    async ngOnInit() {
        this.states = await this.todosService.getStates();
        this.subscription = this.route.params.subscribe(t => {
            this.todoId = +t['id'];
            this.fetchTodo();
        });

    }

    async fetchTodo() {
        try {
            if (this.todoId === 0)
                return;

            this.todo = await this.todosService.getTodo(this.todoId);
            
            this.state = null;
            for(let state of this.states) {
                if (this.todo.stateId === state.id) {
                    this.state = state;
                    break;
                }
            }
        }
        catch (error) {
            console.error('Fetching todo errored:', error);
            this.router.navigate(['/todos']);
        }
    }

    async stateChanged() {
        await this.todosService.putTodo(this.todo);
    }

}
