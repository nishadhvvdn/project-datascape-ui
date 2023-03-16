import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { getResponseData, postResponseData } from "./Api";
import mqtt from 'mqtt';
import moment from "moment";
import { MessageIcon } from "./Validations";
import  { Toast } from 'bootstrap';

export default function Sidebar(props) {
  let location = useLocation();
  const [messageCount, setMessageCount] = useState(0);
  const [message,setMessage] = useState({});
  const [toast, setToast] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    const url = process.env.ADMIN_APP_MQTT_HOST;
    const options = {
      clean: true,
      clientId: `admin_app_${Math.random().toString(16).substr(2, 8)}`,
      username: process.env.ADMIN_APP_MQTT_USERNAME,
      password: process.env.ADMIN_APP_MQTT_PASSWORD,
    };
    let client = mqtt.connect(url, options);
    client.on('connect', () => {console.log('connect to mqtt');});
    client.on('message', (topic, message) => {  
        let msg = JSON.parse(message.toString());
        console.log(msg,'message');
        if(topic.includes("transformer")){
            msg.type = 'Transformer';
        }else if(topic.includes("meter")){
            msg.type = 'Meter';
        }else {
            msg.type = 'Tenant';
        }
        setMessage(msg);
        setToast(true);
    });
    client.subscribe(process.env.ADMIN_APP_MQTT_TOPICS, { qos: 0 }, (error) => {
      if (error) {
        console.log('Subscribe to topics error', error);
        return;
      }
    });
  }, []);
  
  useEffect(() => {
    var myToast = toastRef.current;
    var bsToast = Toast.getInstance(myToast);
    if(message){
        if (!bsToast) {
            bsToast = new Toast(myToast, {
                delay: 3000
                // autohide: false
            });
            bsToast.hide();
            setToast(false);
        }
        else {
            toast ? bsToast.show() : bsToast.hide();
        }
    }
  }, [message, toast]);

  useEffect(() => {
    ApiCalls();
  }, [props.messageid]);

  const ApiCalls = async () => {
    await getMessageData();
  };
  async function getLoginData() {
    await fetch(process.env.ADMIN_APP_BASE_URL + "login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "access-control-request-headers": "cache-control,content-type,expires,pragma"
      },
      body: JSON.stringify({ email: "abhishek", password: "MTExMTExMUA=" }),
    })
      .then((e) => e.json())
      .then((res) => {
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

  function ClickMe(){
    fetch("https://datascape-qa.deltaglobalnetwork.com/trusted", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "access-control-request-headers": "cache-control,content-type,expires,pragma"
      },
      body: JSON.stringify({
        "username":"Bittoo",
        "target_site": "DatascapeQA",
        "client_ip":"40.83.150.233"
      }),
    })
    .then((e) => e.json())
    .then((res) => {
        console.log(res," - datascape");
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
            {/* <li >
              <button className="btn btn-primary" onClick={ClickMe}> 
                Click Me
              </button>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="toast position-absolute top-0 end-0 m-4" role="alert" ref={toastRef}>
                <div className="toast-header">
                    <strong className="me-auto">{message?.sender}</strong>
                    <small>{moment(message?.date).format("h:mm a, DD MMM YYYY")}</small>
                    <button type="button" className="btn-close" onClick={() => setToast(false)} aria-label="Close"></button>
                </div>
                <div className="toast-body">                    
                    <div className='display-flex'>                         
                            {MessageIcon(message?.type)}
                        <p className='toast-message-text'>{message?.message}</p>
                    </div>
                </div>
            </div>
    </div>
  );
}
