const todosVue = {
    template: '#todos-template',
    data: function() {
        return {
            states: [],
            todos: [],

            todoName: '',
            filteredStateId: 0,

        }
    },
    methods: {
        async getData() {
            var api = new TodosApi();
            this.states = await api.getStates();
            this.todos = await api.getTodos();
        },
        async addTodo() {
            try {
                if (this.todoName.length <= 0) {
                    return;
                }
    
                var todo = await new TodosApi().postTodo(this.todoName);
                this.todos.push(todo);
    
                this.filteredStateId = 0;
                this.todoName = '';
    
            } catch (error) {
                alert('An error occurred: ' + error);
            }
        }
    },
    computed: {
        filteredTodos: function() {
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
    },
    created() {
        this.getData();
    },
    beforeRouteUpdate(to, from, next) {
        this.getData();
        next();
    }
}