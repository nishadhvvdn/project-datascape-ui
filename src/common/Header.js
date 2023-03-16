import React from 'react';
import { Router, Link, useHistory } from 'react-router-dom';
import { postResponseData} from "../common/Api";

export default function Header(){
    let history = useHistory();
    async function Logout(){
        await postResponseData('logout', {})
        .then(res => {
          if(res){
            setTimeout(() => {                
                history.push("/");
            }, 1000);
          }
        })
    }

    return (
        <div>
            <div className='delta-header'>
                <div className='user-account'>
                    <div className='notification'>
                        <i className="fa fa-bell" aria-hidden="true"></i>
                    </div>
                    <div className='user-profile'>
                        <span>A</span>
                        <h4>Admin</h4>
                        <i className="fa fa-angle-down" aria-hidden="true" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li className="dropdown-item" onClick={() => Logout()}>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}