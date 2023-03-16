import React from 'react';

export function CheckAlphaNumeric(value){
    const regex = /^[0-9a-zA-Z(_ )]+$/; //this will admit letters, numbers and dashes
    if (value.match(regex) || value === "") {
      return true;
    }else {
        return false;
    }
}

export function CheckAlphabets(value){
  const regex = /^[a-zA-Z(_ )]+$/; //this will admit letters, numbers and dashes
  if (value.match(regex) || value === "") {
    return true;
  }else {
      return false;
  }
}

export function CheckNumbers(value){
    const regex = /^[0-9]+$/; //this will admit numbers
    if (value.match(regex) || value === "") {
      return true;
    }else {
        return false;
    }
}
// Added validation for Coil Multiplier field
export function CheckDecimalNumbers(value){
  const regex = /^([0-4])(\.\d{0,6})?$/; //this will admit numbers and decimals  /[-+][0-9]+\.[0-9]{0,6}+$/
  if (regex.test(value) || value === "") {
    return true;
  }else {
      return false;
  }
}

export function CheckTenantName(value){
  const regex = /^[a-z]+$/; //this will admit small letters
  if (value.match(regex) || value === "") {
    return true;
  }else {
      return false;
  }
}

export const MessageIcon = (type) => {
  if(type == "Transformer"){
    return <img src={require('../assets/images/transformer-white.png').default} className="rounded-image" />
  }else if(type == "Meter"){
    return <img src={require('../assets/images/meter-white.png').default} className="rounded-image" />
  }else {
    return <img src={require('../assets/images/tenant-white.svg').default} className="rounded-image" />
  }
}