/**
 *@description
 *API GET request using XMLHttpRequest
 * 
 * @param  apiUrl - API URL for request
 * @param  successHandler - success response
 * @param  errorHandler - error response
 */
function ApiCall(apiUrl, successHandler, errorHandler) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', apiUrl, true);
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
    xhr.send();
}
/**
 *@description
 *Request and Response for Cloud Status and assigning value
 *@param Nil
 *@returns Nil
 */
function load() {
    document.getElementById("mainTable").style.display = "none";
    document.getElementById("msg").innerHTML = "Loading...";
    ApiCall("/getEnv", function (res) {
        var url = (window.location != window.parent.location) ? document.referrer : document.location.href;
        var hostURL = '';                
        if(url){
            var a  = document.createElement('a');
            a.href = url;
            hostURL =  a.hostname;
        }
        
        if(res.datascapeweburl && res.datascapeweburl === hostURL) {
            ApiCall('https://' + res.webservicehost + '/CloudStats', function (res) {
                if (res.TotalCost && res.ActiveServices && res.CloudServices && res.CloudServices.Services) {
                    var cost = res.TotalCost.toFixed(4);
                    document.getElementById("cost").innerHTML = '<b>MONTH to DATE COST: $' + cost + '</b>';
                    var activeServices = res.ActiveServices;
                    var cloudServices = res.CloudServices.Services;
                    var CloudServicesTable = document.getElementById("CloudServices");
                    for (var i = 0; i < cloudServices.length; i++) {
                        var crow = CloudServicesTable.insertRow(-1);
                        var cell1 = crow.insertCell(0);
                        var cell2 = crow.insertCell(1);
                        cell1.innerHTML = cloudServices[i].Resources;
                        cell2.innerHTML = cloudServices[i].Status;
                    }
                    var table = document.getElementById("actService");
                    for (var j = 0; j < activeServices.length; j++) {
                        var row = table.insertRow(-1);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        cell1.innerHTML = activeServices[j].MeterName;
                        cell2.innerHTML = activeServices[j].MeterCategory;
                        cell3.innerHTML = activeServices[j].MeterGroup;
                        cell4.innerHTML = activeServices[j].MeterStatus;

                    }
                    document.getElementById("msg").innerHTML = " ";
                    document.getElementById("mainTable").style.display = "block";
                }
            }, function () {
                document.getElementById("msg").innerHTML = "Failed to get cloud status details!";
            });
        } else {
            location.href = '/#/inValidPage';
        }
    });
}