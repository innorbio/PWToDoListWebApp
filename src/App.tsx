import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { logOut } from "./services/auth";
import ToDoList from "./pages/ToDoList";

const App = () => {
  // Remove any error messages from previous sessions
  localStorage.removeItem('registerError')
  localStorage.removeItem('loginError')

// Store user login session data
  const [user, setUser] = useState<any>(null);
  // Keep track of which form is being displayed to the user (login or register)
  const [registerFormStatus, setRegisterFormStatus] = useState<boolean>(false);

  // Show register form to user
  const registerBtnClick = () => {
    setRegisterFormStatus(true)
  }

  // Show login form to user
  const loginBtnClick = () => {
    setRegisterFormStatus(false)
  }

  // Log out the user and delete any session data
  const handleLogOut = async () => {
    try {
      await logOut();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  return (
    <>
      <header>

        {
          user ?
            (<div className="user-details">
              <h2>Welcome, {user.email}</h2>
              <p><b>User ID:</b> {user.uid}</p>
              <div className="input-group">
                <button type="button" className="cta-primary" onClick={handleLogOut}><span>Logout</span></button>
                <a target="_blank" href="https://innorbio.net/index.html" className="cta-secondary">innorbio.net</a>
              </div>
            </div>)
            :
            (<h1>Innorbio To Do List Web App</h1>)

        }

      </header>

      <main>
        {
          user ? (<ToDoList />) : (registerFormStatus ? (<Register setUser={setUser} goToLogin={loginBtnClick} />) : (<Login setUser={setUser} goToRegister={registerBtnClick} />))
        }

      </main>
    </>
  );
};

export default App;
