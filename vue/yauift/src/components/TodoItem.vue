<template>
<div class="todo">
    <div class="name">
        <router-link :to="'/todos/' + todo.id">{{ todo.name }}</router-link>
    </div>
    <div class="state">
        <select v-model="todo.stateId" v-on:change="stateChanged()">
            <option v-for="state of states" :value="state.id" :key="state.id">
                {{ state.name }}
            </option>
        </select>
    </div>
</div>
</template>

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

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State, TodosApi, Todo } from '../TodosApi';

@Component({
    components: {

    },
})
export default class TodoItem extends Vue {

    @Prop() public todo?: Todo;
    @Prop() public states?: State[];

    async stateChanged() {
        if (!this.todo) {
            return;
        }
        const api = new TodosApi();
        await api.putTodo({
            id: this.todo.id,
            name: this.todo.name,
            stateId: this.todo.stateId
        });
    }
}
</script>
