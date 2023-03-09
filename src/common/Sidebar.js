import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getResponseData, postResponseData } from "./Api";

export default function Sidebar() {
  let location = useLocation();
  const [messageCount, setMessageCount] = useState(0);
  useEffect(() => {
    ApiCalls();
  }, []);

  const ApiCalls = async () => {
    await getLoginData();
    await getMessageData();
  };
  async function getLoginData() {
    await postResponseData("login", {
      email: "abhishek",
      password: "MTExMTExMUA=",
    }).then((res) => {
      if (res.type) {
        console.log("Login successful");
      }
    });
  }
  async function getMessageData() {
    getResponseData("GetMessageCount").then((res) => {        
        if(res.data.type){
            setMessageCount(res.data.data);
        }
    });
  }

  return (
    <div>
      <div className="sidebar">
        <div className="delta-logo">
          <Link to={`/app`}>
            <img src={require("../assets/images/delta-logo.png").default} />
          </Link>
        </div>
        <div className="navigation">
          <ul>
            <li className={location.pathname == "/app" ? "active" : ""}>
              <Link to={`/app`}>
                <img src={require("../assets/images/dashboard.png").default} />
              </Link>
            </li>
            <li
              className={location.pathname == "/deltamapping" ? "active" : ""}
            >
              <Link to={`/deltamapping`}>
                <img
                  src={require("../assets/images/deltamapping.png").default}
                />
              </Link>
            </li>
            <li className={location.pathname == "/graphs" ? "active" : ""}>
              <Link to={`/graphs`}>
                <img src={require("../assets/images/graphs.png").default} />
              </Link>
            </li>
            <li className={location.pathname == "/report" ? "active" : ""}>
              <Link to={`/report`}>
                <img src={require("../assets/images/reports.png").default} />
              </Link>
            </li>
            <li className={location.pathname == "/settings" ? "active" : ""}>
              <Link to={`/settings`}>
                <img src={require("../assets/images/settings.png").default} />
              </Link>
            </li>
            <li className={location.pathname == "/message" ? "active" : ""}>
              <Link to={`/message`} style={{ position: "relative" }}>
                <img src={require("../assets/images/message.png").default} />
                <span className="message-count">{messageCount}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
