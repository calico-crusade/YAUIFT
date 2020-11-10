<script lang="typescript">
    import { TodosApi } from './../todoApi';
    import type Todo from './../models/todo.model';
    import type State from './../models/state.model';
    import TodoItem from './../components/todo-item.svelte';
    import { onMount } from 'svelte';

    let todoName = '';
    let api = new TodosApi();
    let states:State[] = [];
    let todos:Todo[] = [];
    let filteredStateId:number = 0;

    async function addTodo() {
        try {
            if (todoName.length <= 0) {
                return;
            }

            const todo = await new TodosApi().postTodo(todoName);
            todos = [...todos, todo];

            filteredStateId = 0;
            todoName = '';

        } catch (error) {
            alert('An error occurred: ' + error);
        }
    }

    onMount(async () => {
        states = await api.getStates();
        todos = await api.getTodos();
    });
</script>

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

                span {
                    margin-left: 5px;
                    flex: 1;

                }
            }
        }
    }
}
</style>

<svelte:head>
	<title>Todos</title>
</svelte:head>

<div class="container center">
    <div class="todos">
        <section class="input-section">
            <input type="text" bind:value={todoName} placeholder="Todo Name..." />
            <button on:click={() => addTodo()}>
                Add Todo
            </button>
        </section>
        <section class="todos-section">
            <ul class="todos-list">
                <li class="filter">
                    <span>Filter todo list: </span>
                    <select bind:value={filteredStateId}>
                        <option value={0}>All</option>
                        {#each states as state}
                        <option value={state.id}>
                            { state.name }
                        </option>
                        {/each}
                    </select>
                </li>
                {#each todos as todo}
                    {#if filteredStateId == 0 || filteredStateId == todo.stateId}
                        <li>
                            <TodoItem todo={todo} states={states} />
                        </li>
                    {/if}
                {/each}
            </ul>
        </section>
    </div>
</div>