import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const initialState = { username: "", password: "" };
   const [credentials, setCredentials] = useState(initialState);

   const { username, password } = credentials;

   const navigate = useNavigate();

   const onChange = (e) => {
      setCredentials((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
   };

   const onSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            body: JSON.stringify({
               username,
               password,
            }),
            headers: { "Content-Type": "application/json" },
         });

         if (response.status === 200) {
            setCredentials(initialState);
         } else {
            console.log("400 bad request");
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <section className="content">
         <h1 className="page-heading">Login Page</h1>
         <div>
            <form onSubmit={onSubmit}>
               <input
                  type="text"
                  className="input-field input-field--login"
                  autoComplete="off"
                  placeholder="Username"
                  name="username"
                  onChange={onChange}
               />
               <br />
               <input
                  type="password"
                  className="input-field input-field--login"
                  autoComplete="new-password"
                  placeholder="Password"
                  name="password"
                  onChange={onChange}
               />
               <br />
               <button className="button center">Submit</button>
            </form>
         </div>
      </section>
   );
};

export default Login;
