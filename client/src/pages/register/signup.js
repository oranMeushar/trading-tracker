import React, {useEffect, useState} from 'react';
import {LoginContainer, Form , FormTitle, Input, Label, Button, FormFooter} from './register.style';
import { useDispatch } from 'react-redux';
import { useNavigate   } from 'react-router-dom';
import LoadingSpinner from '../../components/loader/loader';
import { setLogin } from '../../store/services/usersReducer';
import { useSetRegisterHook } from '../../hooks/useUsersHook';


const Signup = ({setIsMember}) => {

    const [name, setName] = useState({value:'', isError:false});
    const [email, setEmail] = useState({value:'', isError:false});
    const [password, setPassword] = useState({value:'', isError:false});
    const [passwordConfirm, setPasswordConfirm] = useState({value:'', isError:false});

    const {setRegisterQuery, isLoading, isError, data, reset, error} = useSetRegisterHook();

    useEffect(() => {
        if(isError) handleError();
    }, [isError])

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const body = {
            name:name.value,
            email: email.value,
            password: password.value,
            passwordConfirm:passwordConfirm.value
        }
        setRegisterQuery(body)
    }

    const handleError = () =>{
        const {errors} = error?.data;
        if (errors) {
            for (const key in errors) {
                switch (key) { 
                    case 'name':
                        setName({value:errors[key].message, isError:true});
                        break;
                    case 'email':
                        setEmail({value:errors[key].message, isError:true});
                        break;
                    case 'password':
                        setPassword({value:errors[key].message, isError:true});
                        break;
                    case 'passwordConfirm':
                        setPasswordConfirm({value:errors[key].message, isError:true});
                        break;
                    default:
                        break;
                }
            }
        }
        if (error.data.message.includes('E11000')) {
            setEmail({value:'Email already exists', isError:true});
        }
        reset();
    }


    return (
        <LoginContainer>
            {isLoading && <LoadingSpinner topPosition={'1vmin'}/>}
            <Form onSubmit={handleSubmit}>
                <FormTitle>Register</FormTitle>
                <Label htmlFor='name'>
                    <p>Name</p>
                    <Input 
                        id = 'name' 
                        type='text' 
                        value={name.value} 
                        onChange={(e) => setName({value:e.target.value, isError:false})} 
                        isError={name.isError} 
                        onFocus={(e) => {setName({value:e.target.value, isError:false}); name.isError && e.target.select()}} 
                        required
                    />
                </Label>
                <Label htmlFor='email'>
                    <p>Email</p>
                    <Input 
                        id = 'email' 
                        type='email' 
                        value={email.value} 
                        onChange={(e) => setEmail({value:e.target.value, isError:false})} 
                        isError={email.isError} 
                        onFocus={(e) =>{setEmail({value:e.target.value, isError:false});email.isError && e.target.select() }}  
                        required
                    />
                </Label>
                <Label htmlFor='password' isError={password.isError}>
                    <p>Password</p>
                    <Input 
                        id = 'password' 
                        type={password.isError ? 'text' : 'password'} 
                        value={password.value} 
                        onChange={(e) => setPassword({value:e.target.value, isError:false})} 
                        isError={password.isError}
                        onFocus={(e) => setPassword({value: password.isError ? '' : e.target.value, isError:false})} 
                        required
                    />
                </Label>
                <Label htmlFor='passwordConfirm' isError={password.isError}>
                    <p>Confirm Password</p>
                    <Input 
                        id = 'passwordConfirm' 
                        type=  {passwordConfirm.isError ? 'text' : 'password'} 
                        value={passwordConfirm.value} 
                        onChange={(e) => setPasswordConfirm({value:e.target.value, isError:false})} 
                        isError={passwordConfirm.isError} 
                        onFocus={(e) => setPasswordConfirm({value: passwordConfirm.isError ? '' : e.target.value, isError:false})} 
                        required
                    />
                </Label>
                <Button onClick={handleSubmit}>Submit</Button>
                <FormFooter>
                    Already a member ? <span onClick={() =>setIsMember(true)}>Login</span>
                </FormFooter>
            </Form>
        </LoginContainer>
    );
};

export default Signup;