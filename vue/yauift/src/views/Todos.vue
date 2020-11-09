<template>
<div class="container center">
    <div class="todos">
        <section class="input-section">
            <input type="text" v-model="todoName" placeholder="Todo Name..." />
            <button v-on:click="addTodo()">
                Add Todo
            </button>
        </section>
        <section class="todos-section">
            <ul class="todos-list">
                <li class="filter">
                    <label>Filter todo list: </label>
                    <select v-model="filteredStateId">
                        <option :value="0">All</option>
                        <option v-for="state of states" :value="state.id" :key="state.id">
                            {{ state.name }}
                        </option>
                    </select>
                </li>
                <li v-for="todo of filteredTodos" :key="todo.id">
                    <TodoItem :todo="todo" :states="states" />
                </li>
            </ul>
        </section>
    </div>
</div>
</template>

<style lang="scss">
.todos {
    width: 500px;

    .input-section {
        display: flex;
        margin-bottom: 5px;

        input {
            border-radius: 5px;
            padding: 5px;
            outline: none;
            border: none;
            margin-right: 5px;
            flex: 1;
        }

        button {
            border-radius: 5px;
            padding: 5px 15px;
            outline: none;
            background-color: #1845A5;
            border: 1px solid #fff;
            cursor: pointer;
        }

        select {
            margin-left: 5px;
        }
    }

    .todos-section {
        max-height: 500px;
        overflow-y: auto;

        .todos-list {
            list-style-type: none;
            margin: 0;
            padding: 0;

            .filter {
                display: flex;
                margin-bottom: 5px;

                label {
                    margin-left: 5px;
                    flex: 1;

                }
            }
        }
    }
}

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, TodosApi, Todo } from '../TodosApi';
import TodoItem from '@/components/TodoItem.vue';

@Component({
    components: {
        TodoItem
    },
})
export default class TodoVue extends Vue {

    public states: State[] = [];
    public todos: Todo[] = [];

    public todoName = '';
    public filteredStateId = 0;

    public get filteredTodos() {
        if (this.filteredStateId <= 0 ||
            this.filteredStateId >= this.todos.length) {
            return this.todos;
        }

        const filtered = [];
        for(const todo of this.todos) {
            if (todo.stateId == this.filteredStateId) {
                filtered.push(todo);
            }
        }

        return filtered;
    }

    async mounted() {
        const api = new TodosApi();
        this.states = await api.getStates();
        this.todos = await api.getTodos();
    }

    async addTodo() {
        try {
            if (this.todoName.length <= 0) {
                return;
            }

            const todo = await new TodosApi().postTodo(this.todoName);
            this.todos.push(todo);

            this.filteredStateId = 0;
            this.todoName = '';

        } catch (error) {
            alert('An error occurred: ' + error);
        }
    }
}
</script>
