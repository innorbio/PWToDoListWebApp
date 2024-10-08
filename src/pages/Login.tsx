import { useEffect, useState } from "react";
import { logIn } from "../services/auth";
import "../auth.css"

const Login = (props: any) => {
  // Stores the users email they enter into the input field
  const [email, setEmail] = useState<string>("");
  // Stores the users password they enter into the input field
  const [password, setPassword] = useState<string>("");
  // Stores the error message
  const [loginError, setLoginError] = useState<string>("");

  useEffect(() => {
    // Gets the error message from local storage
    setLoginError(localStorage.getItem('loginError') || "")
  })
  

  // Logs the user in and calls service level logic for logging in the user with the db
  const handleLogIn = async () => {
    localStorage.removeItem('loginError')
    try {
      const userCredential = await logIn(email, password);
      props.setUser(userCredential.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
    setLoginError(localStorage.getItem('loginError') || "")
  };

  return (
    <>
      <div className="container">
        <h1>Sign In!</h1>
        <p className="error">{loginError}</p>
        <div className="input-group input-group-top">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="pwd">Password</label>
          <input
            id="pwd"
            name="pwd"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="cta-container">
        <button type="submit" onClick={handleLogIn} className="cta-primary"><span>Sign In</span></button>
        <button className="cta-login cta-secondary" type="button" onClick={() => { props.goToRegister() }}>Don't have an account?</button>
        </div>
      </div>
    </>
  )
}

export default Login;
