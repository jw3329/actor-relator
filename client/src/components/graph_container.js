import React from 'react';

const GraphContainer = ({ spinner }) => {

    return (
        <div className="col-sm-8 float-left d-flex justify-content-end mt-5 ml-5">
            <div className="card" id="network" style={{ minWidth: 700, height: 600 }}>
                {spinner && (
                    <div className="text-center my-auto">
                        <div className="spinner-border" role="status" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default GraphContainer;