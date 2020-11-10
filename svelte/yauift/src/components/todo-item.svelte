<script lang="typescript">
    import type Todo from './../models/todo.model';
    import type State from './../models/state.model';
    import { TodosApi } from './../todoApi';

    export let todo: Todo = null;
    export let states: State[] = [];

    async function stateChanged() {
        if (todo) {
            const api = new TodosApi();
            await api.putTodo({
                id: todo.id,
                name: todo.name,
                stateId: todo.stateId
            });
        }
    }
</script>

<style lang="scss">
.todo {
    display: flex;
    margin-bottom: 5px;
    
    .name {
        flex: 1;
        padding: 0 5px;
    }

    .state {
        margin-left: 5px;
    }
}
</style>

<div class="todo">
    <div class="name">
        <a href="{'todos/' + todo.id }">{todo.name}</a>
    </div>
    <div class="state">
        <!-- svelte-ignore a11y-no-onchange -->
        <select value={todo.stateId} on:change={() => stateChanged()}>
            {#each states as state}
            <option v-for="state of states" value={state.id}>
                { state.name }
            </option>
            {/each}
        </select>
    </div>
</div>