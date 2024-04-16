import React, {useState} from 'react';
import {LoginContainer, Form, FormTitle, Input, Label, Button, FormFooter} from './register.style';
import LoadingSpinner from '../../components/loader/loader';
import { useSetLoginHook } from '../../hooks/useUsersHook';


const Login = ({setIsMember}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setLoginQuery, isLoading} = useSetLoginHook({setEmail, setPassword});

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoginQuery({email, password});
    }

    return (
        <LoginContainer>
            {isLoading && <LoadingSpinner topPosition={'10vmin'}/>}
            <Form onSubmit={handleSubmit}>
                <FormTitle>Login</FormTitle>
                <Label htmlFor='email'>
                    <p>Email</p>
                    <Input id = 'email' type='email' value={email} onChange={(e) =>setEmail(e.target.value)} placeholder='1@2.com' required/>
                </Label>
                <Label htmlFor='password'>
                    <p>Password</p>
                    <Input id = 'password' type='password' value={password} onChange={(e) =>setPassword(e.target.value)}required/>
                </Label>
                <Button onClick={handleSubmit}>Submit</Button>
                <FormFooter>
                    Not a member yet ? <span onClick={() =>setIsMember(false)}>Register</span>
                </FormFooter>
            </Form>
        </LoginContainer>
    );
};

export default Login;