import React, { useState } from 'react';
import axios from 'axios';
import ActorForm from './components/actor_form';
import GraphContainer from './components/graph_container';

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
        setSpinner(false);
        console.log(data);
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