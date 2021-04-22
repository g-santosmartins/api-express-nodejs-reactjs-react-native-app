const { request, response } = require('express');
const cors = require('cors')
const express = require('express');

// universal unique ID
const { uuid, isUuid } = require('uuidv4')

const app = express();

// we can use to control who is able to acess 
app.use(cors())
app.use(express.json())


const projects = [];

// middleware to capture all the routes interactions: 
function logRequests(request, response, next) {
    const { method, url } = request
    const logLabel = `[${method.toUpperCase()} ${url}]`;

    console.log('1')

    console.time(logLabel);

    // without it the app flow will be stopped
    next();

    console.timeEnd(logLabel)
}

// middleware to validate data type
function validateProjectId(request, response, next) {
    const { id } = request.params

    // validating
    if(!isUuid(id)){
        return response.status(400).json({error: 'Invalid project Id, please try again later'});
    }

    return next();
}

app.use(logRequests)

// how to use only on id cases
app.use('/projects/:id', validateProjectId);

// We could use just an / to access the root
app.get('/projects', (request, response) => {
    const { title } = request.query

    // if you can find a element, bring it, if not bring all of them
    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return response.json(results);
})

app.post('/projects', (request, response) => {

    const { title, owner } = request.body;
    const project = { id: uuid(), title, owner }

    // it pushes that item into it
    projects.push(project);

    return response.json(project);
})

app.put('/projects/:id',(request, response) => {
    const { id } = request.params
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id)

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found' })
    }

    const project = {
        id,
        title,
        owner,
    }
    projects[projectIndex] = project;

    return response.json(project);
})


app.delete('/projects/:id', (request, response) => {

    const { id } = request.params

    const projectIndex = projects.findIndex(project => project.id === id)

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found' })
    }
    projects.splice(projectIndex, 1);

    return response.status(204).send();

})

app.listen(3333, () => {
    console.log('Back-end has been started');
});