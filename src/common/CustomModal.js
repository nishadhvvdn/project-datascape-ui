import React, { useEffect, useRef, useState } from 'react';

export default function CustomModal() {
	const wrapperRef = useRef(null);
	
	// useEffect(() => {
	// 	function handleClickOutside(event) {
	// 	  if (event.target.id == "modal__backdrop") {
	// 		document.getElementById(event.target.id).style.display = "none";
	// 	  }
	// 	}
	// 	document.addEventListener("mousedown", handleClickOutside);
	// 	return () => {
	// 	  document.removeEventListener("mousedown", handleClickOutside);
	// 	};
	// }, [wrapperRef]);

	return (
		<div className="modal__backdrop" id="modal__backdrop" ref={wrapperRef}>
			<div className="modal__container"> 
				<p id="message-para"></p>
				<div className='row'>
					<div className='col-lg-7' />
					<div className='col-lg-5'>
					<button type="button"  className="btn btn-warning w-100" onClick={() => {openCloseModal("",false)}}>Okay</button>
					</div>
				</div>
			</div>
		</div>
	);
};


export function openCloseModal(message, show){
	document.getElementById("modal__backdrop").style.display = show ? "block" : "none";
	document.getElementById("message-para").innerHTML = message;
	return false;
}