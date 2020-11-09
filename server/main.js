//import all of our dependencies
import express from 'express';
import cors from 'cors';
import _ from 'underscore';

//Create our app
const app = express();
//Choose our port
const port = 3000;

const states = [
    { id: 1, name: 'Not Started', description: 'The TODO item has yet to be started' }, 
    { id: 2, name: 'In Progress', description: 'The TODO item is in progress' },
    { id: 3, name: 'Completed', description: 'The TODO item has been completed' },
    { id: 4, name: 'Abandoned', description: 'The TODO item has been abandoned and will not be attempted' }
];

//Setup some default todo items:
let todos = [
    { id: 1, name: 'Learn Angular', stateId: 1 },
    { id: 2, name: 'Learn AngularJS', stateId: 1 }, 
    { id: 3, name: 'Learn Svelte', stateId: 1 },
    { id: 4, name: 'Learn Vue', stateId: 1 },
    { id: 5, name: 'Learn Vue without NPM', stateId: 1 },
    { id: 6, name: 'Learn React', stateId: 4 },
    { id: 7, name: 'Do the dishes', stateId: 2 },
    { id: 8, name: 'Learn JavaScript', stateId: 3 }
];

//Enable Cross Origin Requests
app.use(cors());
app.use(express.json());

//Expose a route to fetch all of our todo items.
app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    const todo = _.find(todos, t => t.id == req.params.id);
    if (!todo) {
        res.status(404).send('Sorry, we cannot find that todo!');
        return;
    }

    res.json(todo);
});

app.post('/todos', (req, res) => {

    const incomingTodo = req.body;

    if (!incomingTodo || !incomingTodo.name) {
        res.status(400).send('Invalid reqest! Please at least provide a name!');
        return;
    }

    const stateId = incomingTodo.stateId || 1;

    if (typeof stateId !== 'number') {
        res.status(400).send('Invalid request! stateId needs to be a number!');
        return;
    }

    const state = _.find(states, (t) => t.id === stateId);
    if (!state) {
        res.status(404).send("Couldn't find a state with id: " + stateId);
        return;
    }

    const sanitizedTodo = {
        id: _.max(todos, t => t.id) + 1,
        name: incomingTodo.name.toString(),
        stateId: stateId
    };

    todos.push(sanitizedTodo);

    res.json(sanitizedTodo);
});

app.put('/todos', (req, res) => {
    const incomingTodo = req.body;

    if (!incomingTodo || !incomingTodo.id) {
        res.status(400).send('Invalid reqest! Please at least provide an id!');
        return;
    }

    if (!incomingTodo.name && !incomingTodo.stateId) {
        res.stateId(400, 'Invalid request! Please specify either a name or a stateId or both');
        return;
    }

    const id = incomingTodo.id;
    if (typeof id !== 'number') {
        res.status(400).send('Invalid request! Id needs to be a number.');
        return;
    }
    
    let todo = _.find(todos, (t) => t.id === id);
    if (!todo) {
        res.status(404).send('Cannot find a todo with that Id');
        return;
    }

    let stateId = +incomingTodo.stateId || todo.stateId;
    if (typeof stateId !== 'number') {
        res.status(400).send('Invalid request! stateId needs to be a number.');
        return;
    }

    if (!_.find(states, (t) => t.id == stateId)) {
        res.status(404).send('Cannot find a state with that Id');
        return;
    }

    todo.name = incomingTodo.name || todo.name;
    todo.stateId = incomingTodo.stateId || todo.stateId;

    res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const todoIndex = _.findIndex(todos, t => t.id == req.params.id);
    if (todoIndex === -1) {
        res.status(404).send('Sorry, we cannot find that todo!');
        return;
    }

    todos.splice(todoIndex, 1);
    res.send();
});

app.get('/states', (req, res) => {
    res.json(states);
});

app.listen(port, ()  => {
    console.log(`Express listening at: http://localhost:${port}/todos`);
});