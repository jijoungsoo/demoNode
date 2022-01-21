import { Axios } from 'axios'
import React,{useState} from 'react'
import {useDispatch} from 'react-redux'

import {registerUser} from '../../../_actions/user_action'
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) =>{
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }

    const onConfirmPassword = (event) =>{
        setConfirmPassword(event.currentTarget.value)
    }


    const onSubmitHandler = (event) =>{
        event.preventDefault();   //이거 안해주면 페이지가 계속 리플레쉬됨
        console.log('Email',Email)
        console.log('Name',Name)
        console.log('Password',Password)

        if(Password !== ConfirmPassword){
            return alert("비밀번호와 비밀번호 확인은 같아야합니다.")
        }

        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        dispatch(registerUser(body))
        .then(response=>{
            if(response.payload.success){
                navigate('/login');   //v6일때 
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
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}  />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}  />
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPassword}  />
                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default RegisterPage