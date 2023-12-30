import React from 'react'

const CenteralizeComponent = (OriginalComponent) => {

    function CenteredComponent() {
        return (
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <OriginalComponent />
            </div>
        );
    }
    return CenteredComponent;
}

export default CenteralizeComponent;