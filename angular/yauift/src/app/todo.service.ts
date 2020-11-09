import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IState, ITodo } from './models';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private states: IState[] = null;

    get apiUrl() {
        return environment.apiBase;
    }

    constructor(
        private http: HttpClient
    ) { }

    async getStates() {
        if (this.states) return this.states;

        return this.states = await this.http.get<IState[]>(this.apiUrl + '/states').toPromise();
    }

    getTodos() {
        return this.http.get<ITodo[]>(this.apiUrl + '/todos').toPromise();
    }

    getTodo(id: number) {
        return this.http.get<ITodo>(`${this.apiUrl}/todos/${id}`).toPromise();
    }

    postTodo(name: string, stateId?: number) {
        return this.http.post<ITodo>(`${this.apiUrl}/todos`, {
            stateId: stateId || 1,
            name: name
        }).toPromise();
    }

    putTodo(todo: ITodo) {
        return this.http.put<ITodo>(`${this.apiUrl}/todos`, todo).toPromise();
    }

    deleteTodo(id: number) {
        return this.http.delete(`${this.apiUrl}/todos/${id}`).toPromise();
    }
}
