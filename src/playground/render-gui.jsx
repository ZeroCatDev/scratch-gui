import React from 'react';
import GUI from '../containers/gui.jsx';

//const searchParams = new URLSearchParams(location.search);
//searchParams.get('cloud_host') ||
const cloudHost = 'wss://zerocat.houlangs.com/clouddata';

const RenderGUI = props => (
    <GUI
        cloudHost={cloudHost}
        canUseCloud
        hasCloudPermission
        canSave
        basePath={process.env.ROOT}
        enableCommunity
        {...props}
    />
);
//canEditTitle
export default RenderGUI;
