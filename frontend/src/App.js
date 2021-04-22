import React, { useState, useEffect } from 'react'

// importing our api by using axios 
import api from './services/api'

// Calling componentes or style sheets
import './App.css';

import Header from './components/Header'

function App() {

    // use state returns an array with two elements
    // variable with it very first value
    // function to update

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data);
        })
    }, [])


    function handleAddProject() {
        // projects.push(`Novo projeto ${Date.now()}`)

        setProjects([...projects, `Novo projeto ${Date.now()}`]);

        console.log(projects);
    }
    return (
        <>
            <Header title="Projeto listador de dados da API REST" />

            <ul>
                {/* map not only search the array but returns something for us */}
                {/* I did the key with the project name, 'cause it will
                 never be two of them with the same name */}

                {projects.map(project => <li key={project.id}> {project.title} | Autor: {project.owner}</li>)}

                <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
            </ul>
        </>
    )
}

export default App;