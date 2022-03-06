import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const initialState = { username: "", password: "" };
   const [credentials, setCredentials] = useState(initialState);
   const [message, setMessage] = useState("");

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

      await fetch("http://localhost:5000/login", {
         method: "POST",
         body: JSON.stringify({
            username,
            password,
         }),
         headers: { "Content-Type": "application/json" },
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.token) {
               localStorage.setItem("token", data.token);
               setCredentials(initialState);
               navigate("/Admin");
            }
         })
         .catch((error) => {
            console.log(error);
            //setMessage(error);
         });
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
