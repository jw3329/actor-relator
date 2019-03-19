import React from 'react';

const GraphContainer = ({ spinner }) => {

    return (
        <div className="d-flex justify-content-end mt-5 ml-5">
            <div className="card w-100" id="network" style={{ height: 600 }}>
                {spinner && (
                    <div className="text-center my-auto">
                        <div className="spinner-border" role="status" />
                    </div>
                )}
            </div>
        </div >
    );
}

export default GraphContainer;