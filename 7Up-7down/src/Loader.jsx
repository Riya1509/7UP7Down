import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a network request or some async operation
        setTimeout(() => {
            setLoading(false);
        }, 3000); // 3 seconds
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {loading ? <CircularProgress /> : <p>Data loaded</p>}
        </div>
    );
};

export default Loader;
