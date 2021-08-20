import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const Login = () => {
  const { push } = useHistory()
  const error = "";
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [form, setFrom] = useState({
    username: '',
    password: ''
  })
  const [loginError, setLoginError] = useState(error)

  const handleChange = evt => {
    setFrom({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }
  // handleSubmit 
  const login = (evt) => {
    evt.preventDefault()
    axiosWithAuth().post('/login', form)
      .then(res => {
        //console.log("🚀 ~ file: Login.js ~ line 18 ~ login ~ res", res)
        localStorage.setItem('token', res.data.payload)
        push('/bubbles')
      })
      .catch(err => {
        //console.log('err', err)
        setLoginError('Username or Password is not valid')
      })
  }


  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
        <form onSubmit={login}>
          <input id='username'
            name='username' type='text' value={form.username} placeholder='User Name'
            onChange={handleChange} />
          <input id='password' name='password' type='text' value={form.password}
            placeholder='Password' onChange={handleChange} />
          <button id='submit' type='submit'>Submit</button>
        </form>
      </div>

      <p id="error" className="error">{loginError}</p>
    </div>
  );
};

export default Login;

//Task List:
//X. Build a form containing a username and password field.
//X. Add whatever state necessary for form functioning.
//X. If either the username or password is not entered, 
//      display the following words with the p tag provided: Username or Password not valid.
//X. If the username / password is equal to "Lambda" / "School", save that token to localStorage 
//       and redirect to a BubblePage route.
//X. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//X. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"