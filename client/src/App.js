import React, { useState } from 'react';
import axios from 'axios';

const config = require('./config.json');

const App = () => {

  const [actor, setActor] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await (
      await axios.get(`${config.server.url}:${config.server.port}`, {
        params: {
          name: actor
        }
      })
    ).data;
    console.log(data);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="d-flex align-content-center flex-wrap mt-5">
          <div className="card text-center mx-auto">
            <div className="card-body p-5">
              <h5 className="card-title">Actor Relator</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group m-3">
                  <input type="text" className="form-control" onChange={e => setActor(e.target.value)} placeholder="Enter actor name" />
                </div>
                <button type="submit" className="btn btn-primary m-2">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;