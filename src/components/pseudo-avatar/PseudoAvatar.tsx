import React from 'react';
import {FirstLetters} from "../../utils/get-first-letters-by-login";

interface PseudoAvatar {
    firstname: string;
    lastname:string;
    color:string;
}

const PseudoAvatar = ({firstname,lastname,color}: PseudoAvatar) => {
    return (
        <span style={{color:`#f4f6fa`,
            background:`${color}`,
            minHeight:"50px",
            maxHeight:"50px",
            minWidth:"50px",
            maxWidth:"50px",
            borderRadius:'50%',
            display:'flex',
            justifyContent:"center",
            alignItems:"center",
            fontWeight:'700',
            fontSize:"19px"
        }}>
            <span>{FirstLetters(firstname,lastname)}</span>
        </span>
    );
};

export default PseudoAvatar;