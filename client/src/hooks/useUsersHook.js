
import { useSetLoginMutation, useSetSignupMutation } from '../store/api';
import { setLogin } from '../store/services/usersReducer';
import { useNavigate   } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {toast} from 'react-toastify';



export const useSetLoginHook = ({setEmail, setPassword}) => {

    const [setLoginQuery, {isLoading, isError, isSuccess, data, error, isUninitialized, reset}] = useSetLoginMutation();
    
    const dispatch = useDispatch();
    const navigate = useNavigate ();

    useEffect(() => {
        if (!isUninitialized && isSuccess && data) {
            handleSuccess(data)
        }
    }, [isSuccess, isUninitialized, data])

    useEffect(() => {
        if (!isUninitialized && isError) {
            handleError()
        }
    }, [isUninitialized, isError])

    const handleSuccess = () =>{
        const {email, name, _id} = data.user;
        const {token, isNew} = data;
        localStorage.setItem('user',JSON.stringify({email,name, _id, token, isNew}))
        dispatch(setLogin({email, name, token, _id, isNew}));
        navigate('/');
    }

    const handleError = () =>{
        const {message} = error.data
        reset();
        setEmail('')
        setPassword('')
        toast.error( message)
    }

    return { setLoginQuery, isLoading };
}

export const useSetRegisterHook = () => {
    
        const [setRegisterQuery, {isLoading, isError, isSuccess, data, error, isUninitialized, reset}] = useSetSignupMutation();
        
        const dispatch = useDispatch();
        const navigate = useNavigate ();
    
        useEffect(() => {
            if (!isUninitialized && isSuccess && data) {
                handleSuccess(data)
            }
        }, [isSuccess, isUninitialized, data])
    
        const handleSuccess = () =>{
            const {email, name, _id} = data.user;
            const {token, isNew} = data;
            localStorage.setItem('user',JSON.stringify({email,name, _id, token, isNew}))
            dispatch(setLogin({email, name, token, _id, isNew}));
            navigate('/');
        }
    
        return { setRegisterQuery, isLoading, isError, data, reset, error };
    }

