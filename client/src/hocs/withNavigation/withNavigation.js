import React, {useState} from 'react';
import Navigation from '../../components/navigation/Navigation';
//TODO: DO WHATEVER YOU WANT HERE including changing the name of the folders and functions
const withNavigation = (Component) => {
    return (props) =>{

        return(
            <>
                <Navigation/>
                <Component {...props}/>
            </>
        )
    }
};

export default withNavigation;