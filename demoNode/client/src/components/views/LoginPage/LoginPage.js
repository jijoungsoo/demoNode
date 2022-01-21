import { Axios } from 'axios'
import React,{useState} from 'react'
import {useDispatch} from 'react-redux'

import {loginUser} from '../../../_actions/user_action'
import { useNavigate } from "react-router-dom";

function LoaginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //props,state
    //state  이런경우는 state를 쓴다고 한다.

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }


    const onSubmitHandler = (event) =>{
        event.preventDefault();   //이거 안해주면 페이지가 계속 리플레쉬됨
        console.log('Email',Email)
        console.log('Password',Password)

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
        .then(response=>{
            if(response.payload.loginSuccess){
                ///props.history.push('/') v5일때 

                navigate('/');   //v6일때 
            } else {
                alert('Error')
            }
        })
    }


    return (
        <div style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center' , width: '100%', height: '100vh'}}>
            <form style={{display: 'flex', flexDirection: 'column'}}
            
            onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}  />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}  />
                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoaginPage
