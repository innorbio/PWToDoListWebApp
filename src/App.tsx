import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { logOut } from "./services/auth";
import ToDoList from "./pages/ToDoList";

const App = () => {
  localStorage.removeItem('registerError')
  localStorage.removeItem('loginError')


  const [user, setUser] = useState<any>(null);
  const [registerFormStatus, setRegisterFormStatus] = useState<boolean>(false);

  const registerBtnClick = () => {
    setRegisterFormStatus(true)
  }

  const loginBtnClick = () => {
    setRegisterFormStatus(false)
  }

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

      <footer>

      </footer>
    </>
  );
};

export default App;
