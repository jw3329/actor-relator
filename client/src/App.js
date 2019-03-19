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
    const [invalid, setInvalid] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        if (network) {
            network.destroy();
            setNetwork(null);
        }
        setSpinner(true);
        setInvalid(false);
        try {
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
        } catch (error) {
            setSpinner(false);
            setInvalid(true);
            setErrorMsg(error.response.data);
        }
    }

    const actorFormProps = {
        setSearch,
        handleSubmit,
        setSelected,
        setLimit,
        invalid,
        errorMsg
    }

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <ActorForm {...actorFormProps} />
                    </div>
                    <div className="offset-lg-1 col-lg-8">
                        <GraphContainer spinner={spinner} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;