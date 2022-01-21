import axios from 'axios';
import React, { useEffect } from 'react';

import {useDispatch} from 'react-redux'
import {auth} from '../_actions/user_action'

import { useNavigate } from "react-router-dom";

export default function (SpecificComponent,option,adminRoute =null){
    function AuthenticationCheck(){

        //----option-- 에 대한 설명
        //null   ==>아무나 출입이 가능한 페이지
        //true   ==>로그인한 유저만 출입 가능한 페이지
        //fase   ==>로그인한 유저는 출입 못하는 페이지

        //adminRute 는 관리자 접속  상태는 위와 동일

        const dispatch = useDispatch();

        const navigate = useNavigate();
        

        useEffect(()=>{
            dispatch(auth())
            .then(response=>{
                console.log(response)

                //로그인한 사람이면 로그인 페이지에 안들어가져야한다.
                if(!response.payload.isAuth){  /*로그인 하지 않은 상태 */
                    if(option){  /*option == true */
                        navigate('/login'); 
                    }
                } else {  /*로그인 한 상태 */
                    if(adminRoute && !response.payload.isAdmin){   /* adminRoute 어드민 페이지인데,    어드민이 아닌사람이 들어왔을때 */
                        navigate('/'); 
                    } else {
                        if(option==false)   /* 로그인안한 사람만 접근할수 있는 페이지를 로그인한 사람이 접근하려고 할때 */
                            navigate('/');                         
                    }
                }

                //어드민 페이지이면 평범한 유저는 못들어오게 해야한다.

            }) 
            //axios.get('/api/users/auth')

        },[])

        return (<SpecificComponent />)
    }   
    return AuthenticationCheck
}