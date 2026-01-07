import React from "react";
import "./Signup.css";
import HeadingComp from "./HeadingComp";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";


const Signin = () => {
    const  dispatch = useDispatch() ; 
    const history = useNavigate();
    const [Input, setInput] = useState({
        email: "",
        password: "",
    });

    const change = (e) => {

        const { name, value } = e.target;

        setInput({ ...Input, [name]: value });
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/api/v1/signin`, Input);
            sessionStorage.setItem("id", res.data.others._id);
            dispatch(authActions.login(res.data.others));
            history("/todo");
        } catch (error) {
            console.error("Signin error:", error);
            alert("An error occurred during signin. Please try again.");
        }
    }


    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 column col-left d-none d-lg-flex justify-content-center align-items-center ">
                        <HeadingComp first="Sign" second="In" />
                    </div>
                    <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
                        <div className="d-flex flex-column w-100 p-3">
                            <input
                                className="p-2 my-3 input-signup"
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={Input.email}
                                onChange={change}
                            />
                            <input
                                className="p-2 my-3 input-signup"
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                value={Input.password}
                                onChange={change}
                            />
                            <button className=" btn-signup p-2" onClick={submit}>Sign In</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Signin;