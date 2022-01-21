import axios from 'axios';

import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types'

export function loginUser(dataToSubmit){
    
    console.log('aaaaaaaaaa');
    console.log(dataToSubmit);
    const request = axios.post('/api/users/login',dataToSubmit)
    .then(response=>response.data)

    console.log(request);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit){
    
    console.log('aaaaaaaaaa');
    console.log(dataToSubmit);
    const request = axios.post('/api/users/register',dataToSubmit)
    .then(response=>response.data)

    console.log(request);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(dataToSubmit){
    
    const request = axios.get('/api/users/auth')
    .then(response=>response.data)

    console.log(request);

    return {
        type: AUTH_USER,
        payload: request
    }
}