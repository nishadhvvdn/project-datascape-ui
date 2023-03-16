import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { postResponseData } from "../common/Api";
import { openCloseModal } from "../common/CustomModal";
import axios from "axios";

export default function Login({ connect }) {
  let history = useHistory();
  // const envURL = "http://172.21.245.27:3002/";
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [usernameHelpText, setUsernameHelpText] = useState(false);
  const [passwordHelpText, setPasswordHelpText] = useState(false);
  const [btnHelpText, setBtnHelpText] = useState(false);

  function onKeyDown(e) {
    if (e.keyCode == 13) {
      onLogin();
    }
  }
  async function onLogin() {
    if (!username) {
      setUsernameHelpText(true);
      return false;
    }
    if (!password) {
      setPasswordHelpText(true);
      return false;
    }
    let url = process.env.ADMIN_APP_BASE_URL + "login";
    await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "access-control-request-headers":
          "cache-control,content-type,expires,pragma",
      },
      body: JSON.stringify({ email: username, password: window.btoa(password) }),
    })
      .then((e) => e.json())
      .then((res) => {
        if (res.type) {
          // localStorage.setItem("userDetails", JSON.stringify(res.data));
          console.log(res);
          history.push("/app");
        }
        else{
          setBtnHelpText(true);
        }
      });
  }

  return (
    <div className="d-flex">
      <div className="login-banner">
        <img
          className="banner"
          src={require("../assets/images/login-banner.png").default}
        />
        <div className="blur-bg">
          <img
            className="l-logo"
            src={require("../assets/images/Login-logo.png").default}
          />
        </div>
      </div>
      <div className="login-wrapper">
        <div className="login-form">
          <h2>Login</h2>
          <div className="user-name">
            <input
              type="email"
              value={username}
              onKeyDown={onKeyDown}
              onChange={(e) => {
                setUserName(e.target.value);
                setUsernameHelpText(false);
                setBtnHelpText(false)
              }}
              className="form-control"
              placeholder="Username"
            />
            {usernameHelpText && (
              <small className="form-text text-muted">
                Please enter the Username
              </small>
            )}
          </div>
          <div className="log-pass">
            <input
              type={isVisible ? "text" : "password"}
              onKeyDown={onKeyDown}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordHelpText(false);
                setBtnHelpText(false)
              }}
              className="form-control"
              placeholder="Password"
            />
            <i
              className={"fa fa-eye" + (!isVisible ? "-slash" : "")}
              aria-hidden="true"
              onClick={() => {
                setIsVisible((e) => !e);
              }}
            />
            {passwordHelpText && (
              <small className="form-text text-muted">
                Please enter the Password
              </small>
            )}
          </div>
          <br />
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              onLogin();
            }}
          >
            Login
          </button>
          {btnHelpText && (
            <small className="form-text text-muted">Invalid credentials</small>
          )}
        </div>
      </div>
    </div>
  );
}
