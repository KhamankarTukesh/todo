import React, { useState } from "react";
import "./Signup.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const history = useNavigate();
    const [Input, setInput] = useState({
        email: "",
        username: "",
        password: "",
    });
    const change = (e) => {

        const { name, value } = e.target;

        setInput({ ...Input, [name]: value });
    }
    const submit = async (e) => {
        e.preventDefault();
        await axios.post(`${window.location.origin}/api/v1/register`, Input).then((res) => {
            if (res.data.message === "Email already exists") {
                alert(res.data.message);
            } else {
                alert(res.data.message);
                setInput({
                    email: "",
                    username: "",
                    password: "",
                });
                history("/signin");
            }


        });



    }
    return (
        <div className="signup">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
                        <div className="d-flex flex-column w-100 p-3">
                            <input
                                className="p-2 my-3 input-signup"
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                onChange={change}
                                value={Input.email}
                            />
                            <input
                                className="p-2 my-3 input-signup"
                                type="username"
                                placeholder="Enter your Username"
                                name="username"
                                onChange={change}
                                value={Input.username}
                            />
                            <input
                                className="p-2 my-3 input-signup"
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                onChange={change}
                                value={Input.password}
                            />
                            <button className=" btn-signup p-2" onClick={submit}>Sign Up</button>
                        </div>
                    </div>
                    <div className="  col-lg-4 column col-left d-lg-flex justify-content-center align-items-center mb-sm-1 d-none">
                        <HeadingComp first="Sign" second="Up" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Signup;