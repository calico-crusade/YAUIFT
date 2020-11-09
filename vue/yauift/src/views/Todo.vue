<template>
<div class="container center">
    <section v-if="!loading">
        <h1>{{ todo.name }}</h1>
        <p>Current State: {{ state.name }} - {{ state.description }}</p>
        <select v-model="stateId" v-on:change="stateChanged()">
            <option v-for="state of states" :value="state.id" :key="state.id">
                {{ state.name }}
            </option>
        </select>
    </section>
    <section v-else>
        <h1>Loading...</h1>
    </section>
</div>
</template>

<style lang="scss">

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { State, TodosApi, Todo } from '../TodosApi';

@Component({
    components: {
        
    },
})
export default class Home extends Vue {
    public states: State[] = [];
    public todo?: Todo;
    public todoId = 0;
    public state?: State;
    public stateId = 0;

    public loading = true;

    mounted() {
        this.getData(+this.$route.params.id);
    }

    async getData(id: number) {
        this.loading = true;

        this.todoId = id;
        const api = new TodosApi();
        this.states = await api.getStates();
        this.todo = await api.getTodo(this.todoId);

        this.stateId = this.todo.stateId;
        this.setState();            

        this.loading = false;
    }

    async stateChanged() {
        if (!this.todo) return;

        this.setState();
        const api = new TodosApi();
        await api.putTodo({
            id: this.todo.id,
            name: this.todo.name,
            stateId: this.stateId
        });
    }

    setState() {
        for(const state of this.states) {
            if (state.id === this.stateId) {
                this.state = state;
                break;
            }
        }
    }
    
    /* eslint-disable */
    beforeRouteUpdate(to: Route, from: Route, next: any) {
        this.getData(+to.params.id);
        next();
    }
}
</script>
