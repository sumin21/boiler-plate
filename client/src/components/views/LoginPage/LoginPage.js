import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useState} from 'react';

import Axios from 'axios';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

function LoginPage(history) {

    const navigate = useNavigate();


    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    
    const onSubmitHandler = (event) =>{
        //변경 없이 submit 클릭 -> 리로드 x
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        Axios.post('/api/users/login', body)//
        .then(function (response) {
            console.log(response.data.login);
            //페이지 이동
            if(response.data.login) navigate("/");

        })
          .catch(function (error) {
            console.log(error);
        });


    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler} >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <Button type="submit">
                    Login
                </Button>
            </form>
        </div>
    )
}

export default LoginPage
