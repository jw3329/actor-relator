import React, { useState } from 'react';
import axios from 'axios';
import ActorForm from './components/actor_form';
import GraphContainer from './components/graph_container';
import config from './config.json';
import { visualize } from './visualization/network';

const App = () => {

    const [search, setSearch] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [network, setNetwork] = useState(null);
    const [selected, setSelected] = useState('Actor');
    const [limit, setLimit] = useState(0);

    const handleSubmit = async e => {
        e.preventDefault();
        if (network) {
            network.destroy();
            setNetwork(null);
        }
        setSpinner(true);
        const data = await (
            await axios.get(`${config.server.url}:${config.server.port}`, {
                params: {
                    search,
                    selected,
                    limit
                }
            })
        ).data;
        console.log(data);
        visualize(data, { setSpinner, setNetwork });
    }

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <ActorForm setSearch={setSearch} handleSubmit={handleSubmit} setSelected={setSelected} setLimit={setLimit} />
                    <GraphContainer spinner={spinner} />
                </div>
            </div>
        </div>
    );
}

export default App;