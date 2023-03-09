import React from 'react';

export default function Card(props) {

    return (
        <div className="right-sidebar" id={props.id}>
            <div className="sidebar-header">
            <div>
                <h4>{props.rowID ? "Edit" : "Add"} {props.name}</h4>
            </div>
            <button type="button" className="close" aria-label="Close" data-bs-toggle="collapse" href={`#${props.id}`} role="button" aria-expanded="false" aria-controls={props.id}>
                Close
            </button>
            </div>
            {props.children}
            <div className="sidebar-footer">
                <button type="button" className="btn btn-outline-dark" aria-label="Close" data-bs-toggle="collapse" href={`#${props.id}`} role="button" aria-expanded="false" aria-controls={props.id}>
                    Cancel
                </button>
                <button type="button" disabled={props.loading} className="btn btn-warning" onClick={() => {props.onSave()}}>
                    Save
                </button>
            </div> 
        </div>
    )
}