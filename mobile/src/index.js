import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'

import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response.data)
            setProjects(response.data)
        });
    }, []);

    // fucntion to add more projects into it
    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Eu sou o novo projeto :D `,
            owner: `Criado por: Guilherme Martins`
        });

        const project = response.data
        setProjects([...projects, project])
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#F4A460" />

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project }) => (
                        <Text style={styles.project}>{project.title} {project.owner}</Text>
                    )}
                />
                <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.button}
                    onPress={handleAddProject}
                >
                    <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
            {/* <ScrollView style={styles.container}>
            {projects.map(project =>(
             <Text style={styles.project} key={project.id}>{project.title}</Text>
            ))}
        </ScrollView> */}
        </>
    );
}



// how use css by a obj
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4A460',

    },
    project: {
        color: 'black',
        fontSize: 30,
        fontFamily: 'bold'
    },

    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    }

})