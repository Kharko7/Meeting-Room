import React from 'react';

interface IconInputComponent{
    iconPath:string;
}

const IconInputComponent = ({iconPath}:IconInputComponent) => {
    return (
        <svg fill="#999" viewBox="0 0 20 20" data-testid={'svg'}>
            <path
                d={iconPath}></path>
        </svg>
    );
};

export default IconInputComponent;