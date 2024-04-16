import React, {useState} from 'react';
import {} from './register.style';
import Login from './login';
import Signup from './signup';

const Register = () => {

    const [isMember, setIsMember] = useState(true);
    return isMember ? <Login setIsMember={setIsMember} /> : <Signup setIsMember={setIsMember} />
};

export default Register;