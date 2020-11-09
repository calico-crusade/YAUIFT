class TodosApi {
    baseUrl = 'http://localhost:3000';

    get(url) {
        return new Promise((resolve, reject) => {
            try {
                $.get(this.baseUrl + '/' + url, function (results) {
                    resolve(results);
                }).fail(function (error) {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    delete(url) {
        return new Promise((resolve, reject) => {
            try {
                $.ajax({
                    url: this.baseUrl + '/' + url,
                    type: 'DELETE'
                }).done(function(results) {
                    resolve(results);
                }).fail(function (error) {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    post(url, data) {
        return new Promise((resolve, reject) => {
            try {
                $.ajax({ 
                    url: this.baseUrl + '/' + url, 
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    type: 'POST'
                }).done(function (results) {
                    resolve(results);
                }).fail(function (error) {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    put(url, data) {
        return new Promise((resolve, reject) => {
            try {
                $.ajax({ 
                    url: this.baseUrl + '/' + url,
                    type: 'PUT',
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                }).done(function(results) {
                    resolve(results);
                }).fail(function (error) {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    getTodos() { return this.get('todos'); }

    getTodo(id) { return this.get('todos/' + id); }

    postTodo(name, stateId) {
        return this.post('todos', {
            stateId: stateId || 1,
            name
        });
    }

    putTodo(todo) { return this.put('todos', todo); }

    deleteTodo(id) { return this.delete('todos/' + id); }

    getStates()  { return this.get('states'); }
}