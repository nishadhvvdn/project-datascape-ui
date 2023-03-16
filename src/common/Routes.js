import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import Sidebar from "./Sidebar";
import App from "../components/App";
import Report from "../components/Report";
import Deltamapping from "../components/Deltamapping";
import Settings from "../components/Settings";
import Graphs from "../components/Graphs";
import Message from "../components/Message";
import Login from "../components/Login";
export default function Routes() {
  const [messageid, setMessageID]=useState("");

  return (
    <>
      <div className="fullpage-loader" id="fullpage-loader">
        <div className="loading-position">
          <img src={require('../assets/images/loader.gif').default} alt="Loading ..."/>
        </div>
      </div>
      <Router>
        <Switch>
        <Route path="/login">
            {/* <Sidebar /> */}
            <Login />
          </Route>
          <Route path="/app">
            <Sidebar messageid={messageid}/>
            <App />
          </Route>
          <Route path="/deltamapping">
            <Sidebar messageid={messageid}/>
            <Deltamapping />
          </Route>
          <Route path="/graphs">
            <Sidebar messageid={messageid}/>
            <Graphs />
          </Route>
          <Route path="/report">
            <Sidebar messageid={messageid}/>
            <Report />
          </Route>
          <Route path="/settings">
            <Sidebar messageid={messageid}/>
            <Settings />
          </Route>
          <Route path="/message">
            <Sidebar messageid={messageid}/>
            <Message messagecall={()=>{setMessageID(Math.random())}} />    
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </>
  );
}
// export default function App() {

//   return (
//     <>
//       <div className="fullpage-loader" id="fullpage-loader">
//         <div className="loading-position">
//           <img src={require('../assets/images/loader.gif').default} alt="Loading ..."/>
//         </div>
//       </div>
//       <CustomModal />
//       <Router>
//         <Switch>
//           <Route exact path="/login">
//             <Login />
//           </Route>
//           <Route path="/home">
//             <Home />
//           </Route>
//           <Redirect from="/" to="/login" />
//         </Switch>
//       </Router>
//     </>
//   );
// }