import React from "react";
import axios from "axios";
import { openCloseModal } from "./CustomModal";

let url = ADMIN_APP_BASE_URL;

export const ErrorHandling = (status,message)=> {
        if(status == 401 || status == 404){
                // window.location.href = '/'; 
        }else if([400,401,404,422].includes(status)){ 
                openCloseModal(message , true);
        }else {
                openCloseModal(message , true);
        }
}

export async function getResponseData(endpoint) {
        return await axios
        .get(url + endpoint, { withCredentials: true })
        .then((response) => {
                // if (response) {
                        return response;
                // } else {
                //         console.log(response, "error");
                // }
        })
        .catch((error) => ErrorHandling(error?.response?.status, error?.response?.data?.message) );
}

export async function postResponseData(endpoint, data, header) {        
        return await axios.post((url + endpoint), data,{ withCredentials: true })
        .then((response) => {
                // if (response && response.data && response.data.status) {
                        return response;
                // } else {
                //         console.log(response, "error");
                // }
        })
        .catch((error) => ErrorHandling(error?.response?.status, error?.response?.data?.message) );
}

export async function putResponseData(endpoint, data) {        
        return await axios.put((url + endpoint), data, { withCredentials: true })
        .then((response) => {
                // if (response && response.data && response.data.status) {
                        return response;
                // } else {
                //         console.log(response, "error");
                // }
        })
        .catch((error) => ErrorHandling(error?.response?.status, error?.response?.data?.message) );
}

export async function deleteResponseData(endpoint) {
        return await axios.delete((url + endpoint), { withCredentials: true })
        .then((response) => {
                console.log(response,"in api.js");
                // if (response && response.data && response.data.status) {
                //         return response.data.message;
                // } else {
                        console.log(response, "error");
                // }
        })
        .catch((error) => ErrorHandling(error?.response?.status, error?.response?.data?.message) );
}
