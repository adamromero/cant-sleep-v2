import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthState";

const Login = () => {
   const initialState = { username: "", password: "" };
   const [credentials, setCredentials] = useState(initialState);
   const [message, setMessage] = useState("");
   const { handleLogin, username, isAuthenticated } = useContext(AuthContext);

   const navigate = useNavigate();

   useEffect(() => {
      if (isAuthenticated || username) {
         navigate("/admin");
      }
   }, [isAuthenticated, username]);

   const onChange = (e) => {
      setCredentials((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
   };

   const onSubmit = async (e) => {
      e.preventDefault();
      handleLogin(credentials);
   };

   return (
      <section className="content">
         <h1 className="page-heading">Login Page</h1>
         <div>
            <form onSubmit={onSubmit}>
               <input
                  type="text"
                  className="admin-form__field center"
                  autoComplete="off"
                  placeholder="Username"
                  name="username"
                  onChange={onChange}
               />
               <br />
               <input
                  type="password"
                  className="admin-form__field center"
                  autoComplete="new-password"
                  placeholder="Password"
                  name="password"
                  onChange={onChange}
               />
               <br />
               <button className="button center">Submit</button>
            </form>
            {message}
         </div>
      </section>
   );
};

export default Login;
