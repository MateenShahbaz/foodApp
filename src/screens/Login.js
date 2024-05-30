import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
})
  let navigate = useNavigate();
const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:3333/api/v1/user/loginuser", {
        method: 'POST',
        headers:{
            'content-Type': 'application/json'
        },
        body:JSON.stringify({
            email: credentials.email,
            password: credentials.password,
        })
    })
    const json = await response.json();
    console.log(json);
    if(!json.success){
        alert("Enter valid credentials")
    }
    if(json.success){
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate('/')
    }
}

const handleChange = (e) =>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={handleChange}
              value={credentials.email}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handleChange}
              value={credentials.password}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">Don't have account</Link>
        </form>
      </div>
    </>
  )
}

export default Login