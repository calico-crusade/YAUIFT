/* eslint-disable */
import $ from 'jquery';

export interface Todo {
    name: string;
    stateId: number;
    id: number;
}

export interface State {
    id: number;
    name: string;
    description: string;
}

export class TodosApi {
    baseUrl = 'http://localhost:3000';

    get<T>(url: string) {
        return new Promise<T>((resolve, reject) => {
            try {
                $.get(this.baseUrl + '/' + url, function (results: T) {
                    resolve(results);
                }).fail(function (error: any) {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    delete<T>(url: string) {
        return new Promise<T>((resolve, reject) => {
            try {
                $.ajax({
                    url: this.baseUrl + '/' + url,
                    type: 'DELETE'
                }).done(function(results: T) {
                    resolve(results);
                }).fail(function (error: any) {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    post<T>(url: string, data: any) {
        return new Promise<T>((resolve, reject) => {
            try {
                $.ajax({ 
                    url: this.baseUrl + '/' + url, 
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    type: 'POST'
                }).done((results: T) => {
                    resolve(results);
                }).fail(function (error: any) {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    put<T>(url: string, data: any) {
        return new Promise<T>((resolve, reject) => {
            try {
                $.ajax({ 
                    url: this.baseUrl + '/' + url,
                    type: 'PUT',
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                }).done(function(results: T) {
                    resolve(results);
                }).fail(function (error: any) {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    getTodos() { return this.get<Todo[]>('todos'); }

    getTodo(id: number) { return this.get<Todo>('todos/' + id); }

    postTodo(name: string, stateId?: number) {
        return this.post<Todo>('todos', {
            stateId: stateId || 1,
            name
        });
    }

    putTodo(todo: Todo) { return this.put<Todo>('todos', todo); }

    deleteTodo(id: number) { return this.delete('todos/' + id); }

    getStates()  { return this.get<State[]>('states'); }
}