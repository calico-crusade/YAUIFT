const todoVue = {
    template: '#todo-template',
    data: function() {
        return {
            states: [],
            todo: null,
            todoId: 0,
            state: null,
            stateId: 0,

            loading: true
        }
    },
    methods: {
        async getData(id) {
            this.loading = true;

            this.todoId = id;
            var api = new TodosApi();
            this.states = await api.getStates();
            this.todo = await api.getTodo(this.todoId);

            this.stateId = this.todo.stateId;
            this.setState();            

            this.loading = false;
        },
        setState() {
            for(let state of this.states) {
                if (state.id === this.stateId) {
                    this.state = state;
                    break;
                }
            }
        },
        async stateChanged() {
            this.setState();
            var api = new TodosApi();
            await api.putTodo({
                id: this.todo.id,
                name: this.todo.name,
                stateId: this.stateId
            });
        }
    },
    created() {
        this.getData(this.$route.params.id);
    },
    beforeRouteUpdate(to, from, next) {
        this.getData(to.params.id);
        next();
    }
}