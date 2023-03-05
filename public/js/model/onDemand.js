
var url = '';
var statusForOndemandRead = '';

ApiCall("/getEnv", '', 'GET', function (res) {
    var parentUrl = (window.location != window.parent.location) ? document.referrer : document.location.href;
    var hostURL = '';                
    if(parentUrl){
        var a  = document.createElement('a');
        a.href = parentUrl;
        hostURL =  a.hostname;
    }
    if(res.datascapeweburl && res.datascapeweburl === hostURL) {
        url = 'https://' + res.webservicehost + '/';
        window.onload = init();
    } else {
        location.href = '/#/inValidPage';
    }
});
/**
 *@description
 *filters meterid from url
 * 
 * @param {*} name value
 * @param {*} url connectdisconnect url with meterid
 * @returns results - meterid
 */
function gup(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}
/**
 *@description
 *API request using XMLHttpRequest
 * 
 * @param apiUrl - url for request
 * @param data - data to be send with request
 * @param type - GET or POST
 * @param successHandler - success response
 * @param errorHandler - error response
 * @returns Nil
 */
function ApiCall(apiUrl, data, type, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, apiUrl, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            successHandler && successHandler(xhr.response);
        } else {
            errorHandler && errorHandler(status);
        }
    };
    xhr.onerror = function (e) {
        errorHandler && errorHandler(e);
    };
    xhr.send(JSON.stringify(data));
}
document.getElementById('ondemandReadMsg').innerHTML = ' ';
/**
 * @description
 *POST request for meter KWH details
 * and based on response display message
 *@param Nil
 *@returns Nil
 */
function onDemandRead() {
    document.getElementById('dis').disabled = true;
    document.getElementById('con').disabled = true;
    var onDemandReadMeterID = gup('value', window.location.href);
    //var onDemandReadMeterID=1;
    document.getElementById('onDemandReadButton').disabled = false;
    document.getElementById('ondemandReadMsg').innerHTML = ' ';
    var MeterKwHApi = "MeterKwH";
    var MeterKwHDetailsApi = "MeterKwHDetails";
    var onDemandReadObj = {};
    onDemandReadObj.MeterID = onDemandReadMeterID;
    document.getElementById('ondemandReadMsg').innerHTML = "Requesting...";
    document.getElementById('ondemandReadMsg').style = 'padding-top:3px'
    ApiCall(url + MeterKwHApi, onDemandReadObj, 'POST', function (res) {
        if (res.Message.length != 0) {
            if (res.Message == 0) {
                document.getElementById('ondemandReadMsg').innerHTML = "Failed to get Meter KwH Details,Please try again!";
                document.getElementById('ondemandReadMsg').style = 'padding-top:3px';
                document.getElementById('onDemandReadButton').disabled = false;
                document.getElementById('dis').disabled = false;
                document.getElementById('con').disabled = false;
            } else if (res.Message == 1) {
                var d = new Date();
                var initialTime = d.getTime();
                var load = function () {
                    /** 
                     * API request for ondemand Connect disconnect
                    */
                    ApiCall(url + MeterKwHDetailsApi, onDemandReadObj, 'POST', function (res) {
                        var date2 = new Date();
                        var afterResponseTime = date2.getTime();
                        // condition when response message is NoValueFound
                        if (res.Message === 'NoValueFound') {
                            document.getElementById('ondemandReadMsg').innerHTML = "Request in Progress...";
                            document.getElementById('ondemandReadMsg').style = 'padding-top:3px';
                            document.getElementById('onDemandReadButton').disabled = true;
                            if (45000 < (afterResponseTime - initialTime)) {
                                document.getElementById('ondemandReadMsg').innerHTML = "Unable to get the meter response.Please try again!";
                                document.getElementById('ondemandReadMsg').style = 'padding-top:3px';
                                document.getElementById('onDemandReadButton').disabled = false;
                                document.getElementById('dis').disabled = false;
                                document.getElementById('con').disabled = false;
                            } else {
                                setTimeout(load, 5000)
                            }
                        } else {
                            document.getElementById('onDemandReadButton').disabled = false;
                            document.getElementById('ondemandReadMsg').innerHTML = "Meter kWh:" + parseFloat(res.Message).toFixed(3);
                            document.getElementById('ondemandReadMsg').style = 'padding-left: 45px;padding-top:3px';
                            document.getElementById('dis').disabled = false;
                            document.getElementById('con').disabled = false;
                        }
                    }, function () {
                        document.getElementById('ondemandReadMsg').innerHTML = "Unable to get the meter response.Please try again!";
                        document.getElementById('ondemandReadMsg').style = 'padding-top:3px';
                        document.getElementById('dis').disabled = false;
                        document.getElementById('con').disabled = false;
                    });
                }
                setTimeout(load, 5000);
                // condition when response message is 2
            } else if (res.Message == 2) {
                document.getElementById('ondemandReadMsg').innerHTML = "Meter not accessible,Device connectivity failed!";
                document.getElementById('ondemandReadMsg').style = 'padding-top:3px';
                document.getElementById('dis').disabled = false;
                document.getElementById('con').disabled = false;
            } else if (res.Message == 3) {
                document.getElementById('ondemandReadMsg').innerHTML = "Device Not Registered";
                document.getElementById('ondemandReadMsg').style = 'padding-top:3px';
                document.getElementById('dis').disabled = false;
                document.getElementById('con').disabled = false;
            }
        } else {
            document.getElementById('onDemandReadButton').disabled = false;
            document.getElementById('ondemandReadMsg').innerHTML = "Meter details not available in system!";
            document.getElementById('ondemandReadMsg').style = 'padding-top:3px';
            document.getElementById('dis').disabled = false;
            document.getElementById('con').disabled = false;
        }
    }, function (status) {
        document.getElementById('ondemandReadMsg').innerHTML = "Unable to get the meter response.Please try again!";
        document.getElementById('ondemandReadMsg').style = 'padding-top:3px';
        document.getElementById('dis').disabled = false;
        document.getElementById('con').disabled = false;
    });
}
var respMeterId = '';
/**
 *@description
 *GET request for meter status
 *
 * @param {*} url url for meter status
 * @param {*} successHandler success response
 * @param {*} errorHandler error response
 * @returns Nil
 */
function getMeterStatus(url, successHandler, errorHandler) {
    var mId = gup('value', window.location.href);
    //var mId=1;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            successHandler && successHandler(xhr.response);
        } else {
            errorHandler && errorHandler(status);
        }
    };
    xhr.send(JSON.stringify({ "MeterID": mId }));
    xhr.onerror = function (e) {
        errorHandler && errorHandler(e);
    };
};
/**
 *@description
 *Display status of Meter Connect Disconnect based on message
 *@param Nil
 *@returns Nil
 */
function init() {
    document.getElementById('msg').innerHTML = "Page is loading...";
    document.getElementById("con").style.display = "none";
    document.getElementById("dis").style.display = "none";
    var getMeterDetailsApi = "MeterConnectDisconnectDetails"
    getMeterStatus(url + getMeterDetailsApi, function (res) {
        //respMeterId=res.Message[0].MeterID;
        if (res.Message.length != 0) {
            if (res.Message[0].Status == 'Registered' && res.Message[0].ConnDisconnStatus == 'Connected') {
                document.getElementById("con").style.display = "none";
                document.getElementById("dis").style.display = "inline-block";
                document.getElementById('msg').innerHTML = "Status: Connected";
                document.getElementById('msg').style = 'padding-top:3px';
                document.getElementById('dis').disabled = false;
                document.getElementById('con').disabled = false;
            } else if (res.Message[0].Status === 'NotRegistered' && (res.Message[0].ConnDisconnStatus === 'Connected' || res.Message[0].ConnDisconnStatus === 'Disconnected')) {
                document.getElementById("con").style.display = "none";
                document.getElementById("dis").style.display = "none";
                document.getElementById('msg').innerHTML = "Status: Device Not Registered";
            } else if (res.Message[0].Status === 'Registered' && res.Message[0].ConnDisconnStatus === 'Disconnected') {
                document.getElementById("con").style.display = "inline-block";
                document.getElementById("dis").style.display = "none";
                document.getElementById('msg').innerHTML = "Status: Disconnected";
                document.getElementById('msg').style = 'padding-top:3px';
                document.getElementById('dis').disabled = false;
                document.getElementById('con').disabled = false;
                statusForOndemandRead = 'Disconnected';
            } else if (res.Message[0].Status === 'Registered' && res.Message[0].ConnDisconnStatus === 'DisconnectInitiated') {
                document.getElementById("con").style.display = "none";
                document.getElementById("dis").style.display = "none";
                document.getElementById('msg').innerHTML = "Status: Meter Disconnect Initiated";
                document.getElementById('msg').style = 'padding-top:3px';
                document.getElementById('dis').disabled = true;
                document.getElementById('con').disabled = false;
                init();
            } else if (res.Message[0].Status == 'Registered' && res.Message[0].ConnDisconnStatus == 'ConnectInitiated') {
                document.getElementById("con").style.display = "none";
                document.getElementById("dis").style.display = "none";
                document.getElementById('msg').innerHTML = "Status: Meter connect Initiated";
                document.getElementById('msg').style = 'padding-top:3px';
                document.getElementById('dis').disabled = false;
                document.getElementById('con').disabled = true;
                init();
            } else {
                document.getElementById('msg').innerHTML = "Unable to get the meter response.Please try again!";
                document.getElementById("con").style.display = "none";
                document.getElementById("dis").style.display = "none";
            }
        } else {
            document.getElementById("con").style.display = "none";
            document.getElementById("dis").style.display = "none";
            document.getElementById('msg').innerHTML = "<b>Status:</b> Meter details not available in system!";
        }
    }, function () {
        document.getElementById('msg').innerHTML = "Unable to get the meter response.Please try again!";
        document.getElementById("con").style.display = "none";
        document.getElementById("dis").style.display = "none";
    });
}
/** 
 * @description
 * Function for Connect Disconnect meter 
 * confirmation swal on connect or disconnect
 * password input swal on confirmation
 * @param statusType connect/disconnect confirmation swal 
 * @returns true
*/
function connectOrDisconnectMeter(statusType) {
    var meterID = gup('value', window.location.href);
    //var meterID=1;
    var meterStatus = statusType;
    var connectAndDisconnectApi = "MeterConnectDisconnect";

    var r = confirm('Are you sure you want to ' + statusType + ' meter ID= ' + meterID + '?');
    if (!r) {
        return;
    } 
    
    var eneteredPassword = prompt("Please enter the password to " + statusType + " meter ID=" + meterID, "");
    if (eneteredPassword !== null) {    
    var getMeterDetails = "MeterConnectDisconnectDetails";
    var obj = {};
    obj.MeterID = meterID;
    obj.OnDemandType = meterStatus;
    obj.Password = window.btoa(eneteredPassword);
    document.getElementById('onDemandReadButton').disabled = true;
    /** 
     * Meter connect Disconnect request and response
    */
    ApiCall(url + connectAndDisconnectApi, obj, 'POST', function (res) {
        if (res.Message == 0) {
            document.getElementById('msg').innerHTML = "Status: Meter not eligible for online Connect/Disconnect!!";
            document.getElementById('onDemandReadButton').disabled = false;
        } else if (res.Message == 1) {
            init();
        } else if (res.Message == 2) {
            document.getElementById('msg').innerHTML = "Status: Meter Disconnect failed, please try again !!";
            document.getElementById('onDemandReadButton').disabled = false;
        }
        else if (res.Message == 3) {
            if (meterStatus === 'Connect') {
                document.getElementById('msg').innerHTML = "Status: Meter connect Initiated !!";
                document.getElementById("con").style.display = "none";
                document.getElementById("dis").style.display = "none";
            } else {
                document.getElementById('msg').innerHTML = "Status: Meter Disconnect Initiated !!";
                document.getElementById("con").style.display = "none";
                document.getElementById("dis").style.display = "none";
            }
            var load = function () {
                getMeterStatus(url + getMeterDetails, function (res) {
                    if (res.Message[0].Status === 'Registered' && res.Message[0].ConnDisconnStatus === 'DisconnectInitiated') {
                        document.getElementById("con").style.display = "none";
                        document.getElementById("dis").style.display = "inline-block";
                        document.getElementById('msg').innerHTML = "Status: Meter Disconnect Initiated";
                        document.getElementById('dis').disabled = true;
                        document.getElementById('con').disabled = false;
                        setTimeout(load, 3000)
                    } else if (res.Message[0].Status == 'Registered' && res.Message[0].ConnDisconnStatus == 'ConnectInitiated') {
                        document.getElementById("con").style.display = "inline-block";
                        document.getElementById("dis").style.display = "none";
                        document.getElementById('msg').innerHTML = "Status: Meter connect Initiated";
                        document.getElementById('msg').style = 'padding-top:3px';
                        document.getElementById('dis').disabled = false;
                        document.getElementById('con').disabled = true;
                        setTimeout(load, 300)

                    }
                    else if (res.Message[0].Status == 'Registered' && res.Message[0].ConnDisconnStatus == 'Connected') {
                        document.getElementById("con").style.display = "none";
                        document.getElementById("dis").style.display = "inline-block";
                        document.getElementById('msg').innerHTML = "Status: Connected";
                        document.getElementById('msg').style = 'padding-top:3px';
                        document.getElementById('dis').disabled = false;
                        document.getElementById('con').disabled = false;
                        document.getElementById('onDemandReadButton').disabled = false;
                        statusForOndemandRead = 'Connected';
                    } else if (res.Message[0].Status == 'NotRegistered') {
                        document.getElementById("con").style.display = "none";
                        document.getElementById("dis").style.display = "none";
                        document.getElementById('msg').innerHTML = "Status: Device Not Registered";
                        document.getElementById('msg').style = 'padding-top:3px';
                        document.getElementById('onDemandReadButton').disabled = false;
                    } else if (res.Message[0].Status === 'Registered' && res.Message[0].ConnDisconnStatus === 'Disconnected') {
                        document.getElementById("con").style.display = "inline-block";
                        document.getElementById("dis").style.display = "none";
                        document.getElementById('msg').innerHTML = "Status: Disconnected";
                        document.getElementById('msg').style = 'padding-top:3px';
                        document.getElementById('dis').disabled = false;
                        document.getElementById('con').disabled = false;
                        document.getElementById('onDemandReadButton').disabled = false;
                        statusForOndemandRead = 'Disconnected';
                    }
                }, function (status) {
                    document.getElementById('msg').innerHTML = "Unable to get the meter response.Please try again!";
                    document.getElementById('dis').disabled = false;
                    document.getElementById('con').disabled = false;
                });
            };

            setTimeout(load, 3000)

        } else if (res.Message == 4) {
            document.getElementById('msg').innerHTML = "Status: Meter not accessible,Device connectivity failed!";
            document.getElementById('dis').disabled = false;
            document.getElementById('con').disabled = false;
        } else if(res.Message == 'Wrong Password'){
            alert('Password is invalid. Please try agian!');
            return;
        }
    }, function () {
        document.getElementById('msg').innerHTML = "Unable to get the meter response.Please try again!";
        document.getElementById('dis').disabled = false;
        document.getElementById('con').disabled = false;
    });
    } else {
        return;
    }
}
