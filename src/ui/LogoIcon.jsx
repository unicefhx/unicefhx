import React from 'react';
import uni_logo from '../assets/unicef_logo.png';

export const LogoIcon = () => {
    return (
        <div>
            <img src={uni_logo} style={{ width : 3840/30, height : 2160/30, x : -200 }}/>
        </div>
    )
}