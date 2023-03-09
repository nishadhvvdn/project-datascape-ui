
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