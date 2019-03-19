import React from 'react';

const ActorForm = ({ handleSubmit, setSearch, setSelected, setLimit, invalid, errorMsg }) => {
    return (
        <div className="d-flex-inline justify-content-start mt-5 h-25">
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">Actor Relator</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group form-row m-2">
                            <select className="form-control col-7" onChange={e => setSelected(e.target.value)}>
                                <option>Actor</option>
                                <option>Movie</option>
                            </select>
                            <input type="number" min="1" className="form-control offset-1 col-4" onChange={e => setLimit(e.target.value)} placeholder="Limit" required />
                        </div>
                        <div className="form-group m-2">
                            <input type="text" className={"form-control" + (invalid ? ' is-invalid' : '')} onChange={e => setSearch(e.target.value)} placeholder="Enter actor name" required />
                            {errorMsg && (
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary m-2">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ActorForm;