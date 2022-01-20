import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';

import React, {useEffect} from 'react'

import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage(props) {
    const navigate = useNavigate();

    //랜딩페이지에 들어오자마자 실행됨
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => {
            console.log(response.data)
        })
    }, [])

    const onClickHandler = () => {
        axios.get(`/api/users/logout`)
            .then(response => {
                if (response.data.success) {
                    navigate("/login");
                } else {
                    alert('로그아웃 하는데 실패 했습니다.')
                }
            })
    }



    return (
        // <div style={{
        //     display: 'flex', justifyContent: 'center', alignItems: 'center'
        //     , width: '100%', height: '100vh'
        // }}>
        //     <h2>시작 페이지</h2>

        //     <Button onClick={onClickHandler} >
        //         로그아웃
        //     </Button>

        // </div>
        <div className="landing-page">
            <div className="container">
            <div className="row">
                <div className="col-md-5 mx-auto">
                <div id="first">
                    <div className="myform form ">
                        <div className="logo mb-3">
                            <div className="col-md-12 text-center">
                                <h1>Login</h1>
                            </div>
                        </div>
                    <form action="" method="post" name="login">
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" name="email"  className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" id="password"  className="form-control" aria-describedby="emailHelp" placeholder="Enter Password"/>
                            </div>
                            <div className="col-md-12 text-center ">
                                <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                            </div>
                            <div className="col-md-12 ">
                                <div className="login-or">
                                    <hr className="hr-or"/>
                                    <span className="span-or">or</span>
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <p className="text-center">
                                    <a className="google btn mybtn"><i className="fa fa-google-plus">
                                    </i> Signup
                                    </a>
                                </p>
                            </div>
                            <div className="form-group">
                                <p className="text-center">Don't have account? <a id="signup">Sign up here</a></p>
                            </div>
                            </form>
                    
                    </div>
                </div>
                <div id="second">
                    <div className="myform form ">
                            <div className="logo mb-3">
                            <div className="col-md-12 text-center">
                                <h1 >Signup</h1>
                            </div>
                            </div>
                            <form action="#" name="registration"/>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text"  name="firstname" className="form-control" id="firstname" aria-describedby="emailHelp" placeholder="Enter Firstname"/>
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text"  name="lastname" className="form-control" id="lastname" aria-describedby="emailHelp" placeholder="Enter Lastname"/>
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" name="email"  className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" id="password"  className="form-control" aria-describedby="emailHelp" placeholder="Enter Password"/>
                            </div>
                            <div className="col-md-12 text-center mb-3">
                                <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Get Started For Free</button>
                            </div>
                            <div className="col-md-12 ">
                                <div className="form-group">
                                    <p className="text-center"><a id="signin">Already have an account?</a></p>
                                </div>
                            </div>
                                </div>
                            
                        </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default LandingPage
