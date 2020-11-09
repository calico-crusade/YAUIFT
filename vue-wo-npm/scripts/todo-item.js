Vue.component('todo-item', {
    props: ['todo', 'states'],
    data: function() {
        return {}
    },
    methods: {
        async stateChanged() {
            var api = new TodosApi();
            await api.putTodo({
                id: this.todo.id,
                name: this.todo.name,
                stateId: this.todo.stateId
            });
        }
    },
    template: '#todo-item-template'
});