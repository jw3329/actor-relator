import React, { useState } from 'react';
import axios from 'axios';
import ActorForm from './components/actor_form';
import GraphContainer from './components/graph_container';
import vis from 'vis';

const config = require('./config.json');

const App = () => {

    const [actor, setActor] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [network, setNetwork] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(network);
        if (network) {
            network.destroy();
            setNetwork(null);
        }
        setSpinner(true);
        const data = await (
            await axios.get(`${config.server.url}:${config.server.port}`, {
                params: {
                    name: actor
                }
            })
        ).data;
        visualize(data);
        console.log(data);
    }

    const visualize = async data => {
        const nodeList = [];
        const edgeList = [];
        const actorQueue = [];
        const movieQueue = [];
        const idSet = new Set();
        actorQueue.push(data);
        while (actorQueue.length > 0) {
            const actorNode = actorQueue.pop(0);
            if (idSet.has(actorNode.id)) continue;
            idSet.add(actorNode.id);
            nodeList.push({
                id: actorNode.id,
                label: actorNode.name,
                group: 'actor',
                font: {
                    color: 'white'
                },
                link: actorNode.link
            });
            if (actorNode.movies) {
                for (const movie of actorNode.movies) {
                    movieQueue.push(movie);
                    edgeList.push({
                        from: actorNode.id,
                        to: movie.id
                    });
                }
            }
            while (movieQueue.length > 0) {
                const movieNode = movieQueue.pop(0);
                if (idSet.has(movieNode.id)) continue;
                idSet.add(movieNode.id);
                nodeList.push({
                    id: movieNode.id,
                    label: movieNode.title,
                    group: 'movie',
                    font: {
                        color: 'white'
                    },
                    link: movieNode.link
                });
                if (movieNode.starring) {
                    for (const actor of movieNode.starring) {
                        actorQueue.push(actor);
                        edgeList.push({
                            from: movieNode.id,
                            to: actor.id
                        });
                    }
                }
            }
            console.log(actorQueue, movieQueue);
        }
        const nodes = new vis.DataSet(nodeList);
        const edges = new vis.DataSet(edgeList);
        const container = document.getElementById('network');
        const networkData = { nodes, edges }
        setSpinner(false);
        const options = {
            layout: {
                improvedLayout: false
            },
            groups: {
                actor: {
                    shape: 'oval',
                    color: 'green'
                },
                movie: {
                    shape: 'oval',
                    color: 'blue'
                }
            }
        }
        const network = new vis.Network(container, networkData, options);
        network.on('click', obj => {
            // const ids = obj.nodes;
            // const clicked = nodes.get(ids);
            // console.log(clicked);
            window.open(nodes.get(obj.nodes[0]).link, '_blank').focus();
        })
        setNetwork(network);
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