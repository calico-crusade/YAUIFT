<script context="module" lang="typescript">
    export async function preload({ params }) {
        return {
            id: params.id
        }
    }
</script>

<script lang="typescript">
    import { TodosApi } from './../../todoApi';
    import type Todo from './../../models/todo.model';
    import type State from './../../models/state.model';
    import { onMount } from 'svelte';

    export let id: number = 0;
    export let todo: Todo = {name: 'Loading', stateId: 0, id: 0};
    export let states: State[] = [];

    let loading = true;
    let state: State = null;
    let stateId: number = 0;

    onMount(async () => {
        loading = true;
        const api: TodosApi = new TodosApi();
        states = await api.getStates();
        todo = await api.getTodo(id);

        stateId = todo.stateId;
        setState();

        loading = false;
    });

    async function stateChanged() {
        if (!todo) return;

        setState();
        const api = new TodosApi();
        await api.putTodo({
            id: todo.id,
            name: todo.name,
            stateId: stateId
        });
    }

    function setState() {
        for(const fstate of states) {
            if (fstate.id === stateId) {
                state = fstate;
                break;
            }
        }
    }
</script>

<style lang="scss">

</style>

<svelte:head>
	<title>Todos - {todo.name}</title>
</svelte:head>

<!-- svelte-ignore a11y-no-onchange -->
<div class="container center">
    {#if !loading}
    <section>
        <h1>{todo.name}</h1>
        <p>Current State: {state.name} - {state.description}</p>
        <select bind:value={stateId} on:change={() => stateChanged()}>
            {#each states as fstate}
            <option value={fstate.id}>
                {fstate.name}
            </option>
            {/each}
        </select>
    </section>
    {:else}
    <section>
        <h1>Loading...</h1>
    </section>
    {/if}
</div>