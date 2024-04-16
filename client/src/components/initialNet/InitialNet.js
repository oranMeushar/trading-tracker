import React, { useState } from 'react';
import { useSetInitialNetHook } from '../../hooks/useTradesHooks';
import { Container } from './InitialNet.style';

const InitialNet = () => {

    const [initial, setInitial] = useState(0);
    const {postInitialNetQuery} = useSetInitialNetHook();

    return (
        <Container>
            <p>Specify the initial Net that you will trade with</p>
            <input type='number' placeholder='Initial Net' required min={0} onChange={(e) => setInitial(e.target.value)}/>
            <button onClick={() => postInitialNetQuery({initial})}>Submit</button>
        </Container>
    );
};

export default InitialNet;