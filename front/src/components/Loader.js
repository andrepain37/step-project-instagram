import React from 'react';
import { loaderSvg } from '../theme/loader.jsx';

function Loader() {
    return (
        <div className="loader">
            {loaderSvg()}
        </div>
    );
}

export default Loader;