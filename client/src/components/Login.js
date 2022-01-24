import React from "react";

const Login = () => {
   return (
      <section className="content">
         <h1 className="page-heading">Login Page</h1>
         <div>
            <form action="/auth" method="POST">
               <input
                  type="text"
                  className="input-field input-field--login"
                  autocomplete="off"
                  placeholder="Username"
                  name="username"
               />
               <br />
               <input
                  type="password"
                  className="input-field input-field--login"
                  autocomplete="new-password"
                  placeholder="Password"
                  name="password"
               />
               <br />
               <input type="submit" className="button center" text="Login" />
            </form>
         </div>
      </section>
   );
};

export default Login;
