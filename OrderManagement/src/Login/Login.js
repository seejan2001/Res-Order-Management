import React from "react";
import { useState } from "react";
import AuthorizedLogin from "./Authorized";
import "./Login.css";

const Login = ({ setState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authorizedLogin = async (e) => {
    e.preventDefault();
    AuthorizedLogin(email, password, setState);
  };

  return (
    <>
      <div className="res-login-container">
        <div className="res-login-mid-container">
          <h1 style={{ fontFamily: "arial" }}>Login Section</h1>
          <div className="res-div-form">
            <form action="POST" onSubmit={(e) => authorizedLogin(e)}>
              <label style={{ fontFamily: "arial" }}>
                Email or PhoneNumber
              </label>
              <br />
              <input
                className="res-input"
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <br />
              <br />
              <label style={{ fontFamily: "arial" }}>Password</label>
              <br />
              <input
                className="res-input"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              <br />
              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
