import React, { useState } from 'react';
import axios from 'axios';
import ActorForm from './components/actor_form';
import GraphContainer from './components/graph_container';
import vis from 'vis';

const config = require('./config.json');

const App = () => {

    const [actor, setActor] = useState('');
    const [spinner, setSpinner] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setSpinner(true);
        const data = await (
            await axios.get(`${config.server.url}:${config.server.port}`, {
                params: {
                    name: actor
                }
            })
        ).data;
        visualize(data);
        setSpinner(false);
        console.log(data);
    }

    const visualize = data => {
        const nodeList = [];
        const edgeList = [];
        const actorQueue = [];
        const movieQueue = [];
        const actorSet = new Set();
        const movieSet = new Set();
        actorQueue.push(data);
        while (actorQueue) {
            const actorNode = actorQueue.pop(0);
            if (!actorNode || actorSet.has(actorNode.name)) continue;
            actorSet.add(actorNode.name);
            nodeList.push({
                id: actorNode.name,
                label: actorNode.name
            });
            actorNode.movies.forEach(movie => {
                movieQueue.push(movie);
                edgeList.push({
                    from: actorNode.name,
                    to: movie.title
                });
            })
            while (movieQueue) {
                const movieNode = movieQueue.pop(0);
                if (!movieNode || movieSet.has(movieNode.title)) continue;
                movieSet.add(movieNode.title);
                nodeList.push({
                    id: movieNode.title,
                    label: movieNode.title
                });
                movieNode.starring.forEach(actor => {
                    actorQueue.push(actor);
                    edgeList.push({
                        from: movieNode.title,
                        to: actor.name
                    });
                });
            }
        }
        const nodes = new vis.DataSet(nodeList);
        const edges = new vis.DataSet(edgeList);
        const container = document.getElementById('network');
        const networkData = { nodes, edges }
        new vis.Network(container, networkData);
    }

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <ActorForm setActor={setActor} handleSubmit={handleSubmit} />
                    <GraphContainer spinner={spinner} />
                </div>
            </div>
        </div>
    );
}

export default App;