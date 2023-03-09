import React from 'react';

export default function Table(props){

    function Status(type){
      if(['Infra Creating','Code Deploying','Restoring'].includes(type)){
        return "primary-status";
      }else if(['Suspended','Suspending'].includes(type)){
        return "warning-status";
      }else if(['Active'].includes(type)){
        return "active-status";
      }else {
        return "error-status";
      }
    }

    function disableDelete (status){
      if(props.formName === "Tenant"){
        if(!["Active", "Failed"].includes(status)){
          return 'disabled';
        }else return '';
      }else {
        return '';
      }
    }
    function disableEdit(status){
      if(props.formName === "Tenant"){
        if(!["Active"].includes(status)){
          return 'disabled';
        }else return '';
      }else {
        return '';
      }
    }

    return (
        <table>
            <thead>
              <tr>
                {props?.headers?.map((e,i) => (
                    <th key={`headers-${i}`}>{e}</th>
                ))}                
              </tr>
            </thead>
            <tbody>
              {props?.body?.map((e,index) => (
                  <tr key={`tr-${index}`}>
                    {props.isStatus && <td>
                      <span
                        className={Status(e[props.isStatus])}
                      >
                        {e[props.isStatus]}
                      </span>
                    </td>}
                    {props?.bodyFieldLabel.map((f,i) => (
                        <td key={`body-${f}`}>{e[f]}</td>
                    ))}                    
                    <td>
                      <div className="dropdown">
                        <button type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                        >
                          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li className={`dropdown-item ${disableEdit(e[props.isStatus])}`} data-bs-toggle="collapse" role="button" aria-expanded="false" href={`#${props.modalID}`} aria-controls={props.modalID} 
                          onClick={() => props.onEdit(e[props.id])}>
                              Edit
                          </li>                          
                          {e[props.isStatus] == "Active" && <li className={`dropdown-item`}
                          onClick={() => props.onSuspend(e[props.id],e[props.isStatus])}
                          >
                              Suspend
                          </li>}
                          {e[props.isStatus] == "Suspended" && <li className={`dropdown-item`}                          
                          onClick={() => props.onRestore(e[props.id],e[props.isStatus])}
                          >
                              Restore
                          </li>}
                          <li className={`dropdown-item ${disableDelete(e[props.isStatus])}`} //d-tooltip
                          onClick={() => props.onDelete(e[props.id],e[props.isStatus])}
                          >
                              Delete                              
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
        </table>
    )
}