import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager";

export const Login = ({ setToken, setStaff }) => {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      username: username.current.value,
      password: password.current.value,
    };

    loginUser(user).then((res) => {
      if ("valid" in res && res.valid) {
        setToken(res.token);
        setStaff(res.staff);
        navigate("/");
      } else {
        setIsUnsuccessful(true);
      }
    });
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  // Apply dark mode classes conditionally
  const darkModeClass = darkMode ? "dark" : "";

  useEffect(() => {
    username.current.value = "belle_gen_z_queen";
    password.current.value = "shutterbug";
  }, []);

  return (
    <section className={`columns is-centered ${darkModeClass}`}>
      <form className={`column is-two-thirds ${darkModeClass}`} onSubmit={handleLogin}>
        <h1 className="title text-3xl text-center">Shutterbug</h1>
        <p className="subtitle text-center">Please sign in</p>

        <div className="field">
          <label className={`label ${darkModeClass}`}>Username</label>
          <div className="control">
            <input className={`input ${darkModeClass}`} type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className={`label ${darkModeClass}`}>Password</label>
          <div className="control">
            <input className={`input ${darkModeClass}`} type="password" ref={password} />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className={`button is-link ${darkModeClass}`} type="submit">Submit</button>
          </div>
          <div className="control">
            <Link to="/register" className={`button is-link is-light ${darkModeClass}`}>Cancel</Link>
          </div>
        </div>
        {isUnsuccessful && <p className={`help is-danger ${darkModeClass}`}>Email or password not valid</p>}
      </form>
      <div className={`absolute top-4 right-4 ${darkModeClass}`}>
        <label className={`switch ${darkModeClass}`}>
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} className="hidden" />
          <span className={`slider round ${darkModeClass}`}></span>
        </label>
      </div>
    </section>
  );
}
