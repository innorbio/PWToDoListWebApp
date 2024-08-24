import { useEffect, useState } from "react";
import { signUp } from "../services/auth";
import "../auth.css"

const Register = (props: any) => {
  // Stores email
  const [email, setEmail] = useState<string>("");
  // Stores Password
  const [password, setPassword] = useState<string>("");
  // Stpres error messages
  const [registerError, setRegisterError] = useState<string>("");

  useEffect(() => {
    // Gets error messages stores in local storage
    setRegisterError(localStorage.getItem('registerError') || "")
  })
  

  // Signsup user and call service level logic for signing up the user in the db
  const handleSignUp = async () => {
    localStorage.removeItem('registerError')
    try {
      const userCredential = await signUp(email, password);
      props.setUser(userCredential.user);
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
    setRegisterError(localStorage.getItem('registerError') || "")
  };

  return (
    <>
      <div className="container">
      <h1>Register!</h1>
        <p className="error">{registerError}</p>
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
        <button type="submit" className="cta-primary" onClick={handleSignUp}><span>Create New Account</span></button>
        <button className="cta-secondary" type="button" onClick={() => { props.goToLogin() }}>Already have an account?</button>
        </div>
      </div></>
  )
}

export default Register;
