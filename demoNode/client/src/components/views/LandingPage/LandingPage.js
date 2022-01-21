import React,{useEffect} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {

    const navigate = useNavigate();

    const onClickHandler = () =>{
        axios.get('/api/users/logout')
        .then(response => {
            console.log(response.data)
            if(response.data.success){
                navigate('/login')
            } else {
                alert('로그아웃하는데 실패하였습니다')
            }
        })
    }


    useEffect(()=>{
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    },[]);

    return (
        <div style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center' , width: '100%', height: '100'}}>
            <h2>시작페이지</h2>
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage
