import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [credentials, setCredentials] = useState({name: "", email: "", password: "" , cpassword: ""})
    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();
        const {name, email, password} = credentials;

        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password})
          });

          const json = await response.json();
          console.log(json);

          if(json.success){

            // save auth token and redirect

            localStorage.setItem("token", json.authtoken);
            navigate("/");

          } else {

            alert("invalid credentials")
          }

    }

    const onChange = (e) => {

        setCredentials({...credentials, [e.target.name]: e.target.value})

    }

  return (
    <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />

                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name="password" placeholder="Password" minLength={5} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" placeholder="Password" minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
  )
}

export default Signup
