import { 
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from "../_actions/types";


export default function (state = {}/*전 state */,action){
    switch (action.type){
        case LOGIN_USER:
            /*스프레드 오퍼레이트 ...    예전것을 그대로 넘기는 것을 의미 */
            console.log(action.payload);
            return {...state, loginSuccess: action.payload}
            break;
        case REGISTER_USER:
            console.log(action.payload);
            return {...state, register: action.payload}
            break;            

        case AUTH_USER:
            console.log(action.payload);
            return {...state, userData: action.payload}
            break;            

        default: 
            return state;
            break;
    }
}