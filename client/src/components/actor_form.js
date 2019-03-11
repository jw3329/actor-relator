import React from 'react';

const ActorForm = ({ handleSubmit, setActor }) => {
    return (
        <div className="col-sm-3 float-left d-flex justify-content-start mt-5 h-25">
            <div className="card text-center">
                <div className="card-body">
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
    );
}

export default ActorForm;