
import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user/userContext';
import './Login.css';
import Spinner from './Spinner.js';
import { Link } from 'react-router-dom';

const Login = ({handlesetLoggedInTrue}) => {

    const [credentials, setCredentials] = useState({ userName: "", password: "" });
  
    // For updating the details of user on account section and navbar upon new login.
    const context = useContext(UserContext);
    const { userLoad , setuserLoad} = context;

    let navigate = useNavigate();

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setuserLoad(true);

        // API Call
        const response = await fetch(`http://localhost:8080/public/login-user`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials) // body data type must match "Content-Type" header
        });
        if(!response.ok){
            console.log("Wrong username or password!");
        }
        else{
            const json = await response.json();
            console.log(json);
            console.log(json.userName);
            console.log(json.password);
            localStorage.setItem('userName', json.userName);
            localStorage.setItem('password', json.password);
            if(handlesetLoggedInTrue)
            handlesetLoggedInTrue(true)
            navigate("/");
        }
        setuserLoad(false);
        setCredentials({ userName: "", password: "" });
        // // setEmail("");
        // // setPassword("");
    }

    if (userLoad){
        return <Spinner/>;
    }

    return (
        <div className='container my-4 pb-5'>
            <section className="intro">
                <div className="bg-image h-100">
                    <div className="mask d-flex align-items-center h-100">
                        <div className="container">
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-12 col-lg-10 col-xl-8">
                                    <div className="card" style={{borderRadius: "1rem"}}>
                                        <div className="row g-0">
                                            <div className="col-md-4 d-none d-md-block">
                                                <img
                                                    src="https://mdbootstrap.com/img/Photos/Others/sidenav2.jpg"
                                                    alt="login form"
                                                    className="img-fluid" style={{borderTopLeftRadius: "1rem" , borderBottomLeftRadius: "1rem"}}
                                                />
                                            </div>
                                            <div className="col-md-8 d-flex align-items-center">
                                                <div className="card-body py-5 px-4 p-md-4">

                                                    <form onSubmit={handleSubmit}>
                                                        <h4 className="fw-bold mb-4" style={{color: "#19376D"}}>Log in to your account</h4>
                                                        <p className="mb-4" style={{color: "#45526e"}}>To log in, please fill in these text fiels with your e-mail address and password.</p>

                                                        <div className="form-outline mb-4">
                                                            <input type="text" className="form-control mb-1" id="userName" name="userName" aria-describedby="emailHelp" placeholder='Enter userName' value={credentials.userName} onChange={onchange} required />
                                                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                            <label className="form-label" htmlFor="userName">Username</label>
                                                        </div>

                                                        <div className="form-outline mb-3">
                                                            <input type="password" className="form-control mb-1" id="password" name='password' placeholder='Enter Password' value={credentials.password} onChange={onchange} required />
                                                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                            <label className="form-label" htmlFor="password">Password</label>
                                                        </div>

                                                        <div className="d-flex justify-content-end">
                                                            <button className="btn btn-primary btn-rounded btncss" type="submit">Log in</button>
                                                        </div>
                                                        <hr/>
                                                            <Link className="link float-start linkstyle" to="/SignUp">New User? Create Account!</Link>
                                                            <Link className="link float-end linkstyle" to="/ForgetPassword">Forgot password?</Link>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='my-4 text-light'><hr></hr></div>
            {/* <div className="container my-5">
                <div className="card text-black" style={{ borderRadius: "25px" }}>
                    <div className="card-body p-md-3">
                        <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc6-S-VnSgVpVmKh9duISEhAQQ-bd7oXJm5wosD_SFew&usqp=CAU&ec=48600113"
                                    className="img-fluid rounded mx-auto d-block" alt="Sample image" />

                            </div>
                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 p-3">

                                <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                                <form className="mx-1 mx-md-3" onSubmit={handleSubmit}>
                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                        <label className="form-label me-3" htmlFor="email">Email</label>
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder='Enter Email' value={credentials.email} onChange={onchange} required />
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                        <label className="form-label me-3" htmlFor="password">Password</label>
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="password" className="form-control" id="password" name='password' placeholder='Enter Password' value={credentials.password} onChange={onchange} required />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                                    </div>

                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Login;