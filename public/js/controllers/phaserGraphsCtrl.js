/**
  * @this vm
  * @ngdoc controller
  * @name dataSCAPEApp.controller:phaserGraphsCtrl
  *
  * @description
  * displaying the content of billing Report based on selected date
*/
(function (angular) {
    "use strict";
    angular.module('dataSCAPEApp').controller('phaserGraphsCtrl',
        ['$scope', '$rootScope', 'DeviceService', '$timeout', function ($scope, $rootScope, deviceService, $timeout) {

                $rootScope.isValidHostIframe = false;
                deviceService.inIframeAccess().then(function (resObj) {
                    if (!resObj) {                   
                        location.href = '/#/inValidPage';
                    }
                });
                //code for Datetime Picker starts
                $scope.showDateFilter = true;
                $scope.commonMsg = '';
                $scope.validData = false;
                $scope.phaseBtnClickable = true;
                $scope.sineBtnClickable = true;
                //code for Datetime Picker starts
                $scope.endDateOnSetTime = endDateOnSetTime
                $scope.startDateOnSetTime = startDateOnSetTime
                $scope.graphType = 'phasorGraph';
                $scope.showSineWave = false;
                $scope.circuitList = [];
                $scope.transformerList = [];
                $scope.phaseDetails = [];
                $scope.selectedCircutID = '';
                $scope.selectedTransformerID = '';
                var chart;
                $scope.sinewaveChartDestroy = false;
                $scope.disableDate = false;
                var dateEnd = new Date();
                $scope.dateRangeEnd = dateEnd;
                var dateStart = new Date();
                dateStart.setMinutes(dateStart.getMinutes() - 15);
                $scope.dateRangeStart = dateStart;
                var timezone = moment.tz.guess();
                $scope.sinewaveCommonMsg = '';
                $scope.phasorData = {
                    title: "Sample Data",
                    samplesPerCycle: 1,
                    data: [
                        {
                            samples: [0],
                            label: "V1",
                            unit: "Voltage",
                            phase: "1",
                            angle : 0
                        },
                        {
                            samples: [0],
                            label: "V2",
                            unit: "Voltage",
                            phase: "2",
                            angle : 120
                        },
                        {
                            samples: [0],
                            label: "V3",
                            unit: "Voltage",
                            phase: "3",
                            angle : 240
                        },
                        {
                            samples: [0],
                            label: "I1",
                            unit: "Current",
                            phase: "1",
                            angle : 0
                        },
                        {
                            samples: [0],
                            label: "I2",
                            unit: "Current",
                            phase: "2",
                            angle : 0
                        },
                        {
                            samples: [0],
                            label: "I3",
                            unit: "Current",
                            phase: "3",
                            angle : 0
                        }
                    ]
                };

                $scope.phases = {
                    1 : 'Single Phase, Single Drop',
                    2 : 'Single Phase, Double Drop',
                    3 : 'Three Phase'
                }

                let v1sinedata = [];
                let i1sinedata = [];
                let v2sinedata = [];
                let i2sinedata = [];
                let v3sinedata = [];
                let i3sinedata = [];
                let p1sinedata = [];
                let p2sinedata = [];
                let p3sinedata = [];
                let timestamp = [];

                init();
                //onChangeGraphType();
                function init() {
                    deviceService.getAllCircuitDetails()
                     .then(function (apiData) {
                        if (!angular.isUndefinedOrNull(apiData) && apiData.type) {
                            $scope.circuitList = [];
                            if (apiData.CircuitDetails.length > 0) {
                                $scope.circuitList = apiData.CircuitDetails;
                                $scope.selectedCircutID = $scope.circuitList[0];
                                onSelectCircuitList();
                            }
                        }
                    });
                }
                $scope.changeCircuitID = function () {
                    onSelectCircuitList();
                };
                function onSelectCircuitList() {
                    $scope.selectedTransformerID = '';
                    $scope.transformerList = [];
                     deviceService.getAllTransformerDetails($scope.selectedCircutID.DTC)
                    .then(function (apiData) {
                        if (!angular.isUndefinedOrNull(apiData) && apiData.type) {
                            $scope.transformerList = [];
                            if (apiData.TransformerDetails.length > 0) {
                                $scope.transformerList = apiData.TransformerDetails;
                                $scope.selectedTransformerID = $scope.transformerList[0];
                            } else {
                                $scope.transformerList = [];
                            }
                        } else {
                            $scope.transformerList = [];
                        }
                    });
                }
                $scope.createGraph = function () {
                    if ($scope.sinewaveChartDestroy) {
                        chart.destroy();
                        $scope.sinewaveChartDestroy = false;
                    }
                    $scope.sinewaveCommonMsg = 'Loading...';
                    $scope.sineBtnClickable = false;
                    $timeout(function () {
                        $scope.$apply(function () {
                            $scope.sineBtnClickable = true;
                        });
                    }, 5000);
                    $scope.showSineWave = false;
                    $scope.phaseDetails.length = 0;
                    v1sinedata = [];
                    i1sinedata = [];
                    v2sinedata = [];
                    i2sinedata = [];
                    v3sinedata = [];
                    i3sinedata = [];
                    p1sinedata = [];
                    p2sinedata = [];
                    p3sinedata = [];
                    timestamp = [];

                    let startDate = moment.utc($scope.dateRangeStart).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    let endDate = moment.utc($scope.dateRangeEnd).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    let urlQuery = "getTransformerPhaseDetailsByTransformerID?transformerId=" + $scope.selectedTransformerID.TransformerID+ "&startDate="+ startDate + "&endDate=" + endDate;
                    deviceService.getAllPhaseDetails(urlQuery).then(function (apiData) {
                                if (!angular.isUndefinedOrNull(apiData) && apiData.type) {
                                    $scope.phaseDetails = [];
                                    $scope.phaseDetails.length = 0;
                                        if (apiData.TransformerPhaseDetails.length > 0) {
                                            $scope.sinewaveCommonMsg = '';
                                            $scope.phaseDetails.push(apiData.TransformerPhaseDetails);
                                            for (let i  = 0; i < $scope.phaseDetails[0].length; i++) {
                                                for (let p=0, q=0; q < 24; q++) {
                                                    v1sinedata.push(Math.sin(p*((Math.PI)/180)));
                                                    i1sinedata.push(Math.sin(($scope.phaseDetails[0][i].Line1PhaseAngle + p)*((Math.PI)/180)));
                                                    timestamp.push(moment.tz($scope.phaseDetails[0][i].ReadTimestamp,timezone).format('YYYY-MM-DD HH:mm:ss'));
                                                    p1sinedata.push($scope.phaseDetails[0][i].Line1PhaseAngle);
                                                    p+=15;
                                                }
                                                for (let t=120, u=0; u < 24; u++) {
                                                    if (t >= 360) {
                                                        t=0;
                                                    }
                                                    v2sinedata.push(Math.sin(t*((Math.PI)/180)));
                                                    i2sinedata.push(Math.sin(($scope.phaseDetails[0][i].Line2PhaseAngle + t)*((Math.PI)/180)));
                                                    p2sinedata.push($scope.phaseDetails[0][i].Line2PhaseAngle);
                                                    t+=15;
                                                }
                                                for (let x=240, y=0; y < 24; y++) {
                                                    if (x >= 360) {
                                                        x=0;
                                                    }
                                                    v3sinedata.push(Math.sin(x*((Math.PI)/180)));
                                                    i3sinedata.push(Math.sin(($scope.phaseDetails[0][i].Line3PhaseAngle + x)*((Math.PI)/180)));
                                                    p3sinedata.push($scope.phaseDetails[0][i].Line3PhaseAngle);
                                                    x+=15;
                                                }
                                            }
                                            onChangeGraphType();
                                        } else {
                                            $scope.sinewaveCommonMsg = '';
                                            swal('There is No Records Available');
                                        }
                                }
                        });
                };
    
                /**
                 * @description
                 * invokes on change of start Date
                 *
                 * @param  Nil
                 * @return  Nil
                 */
                function startDateOnSetTime() {
                    $scope.$broadcast('start-date-changed');
                    if ($scope.dateRangeEnd) { 
                        var startDifference = $scope.dateRangeEnd.getTime() - $scope.dateRangeStart.getTime();
                        var startDifferenceDays = startDifference / (1000 * 3600 * 24);
                        if (startDifferenceDays <= 0 || startDifferenceDays > 1) {
                            $scope.disableDate = true;
                        } else {
                            $scope.disableDate = false;
                        }
                    }
                }
    
                /**
                 * @description
                 * invokes on change of end Date
                 *
                 * @param  Nil
                 * @return  Nil
                 */
                function endDateOnSetTime() {
                    $scope.$broadcast('end-date-changed');
                    if ($scope.dateRangeStart) { 
                        var startDifference = $scope.dateRangeEnd.getTime() - $scope.dateRangeStart.getTime();
                        var startDifferenceDays = startDifference / (1000 * 3600 * 24);
                        if (startDifferenceDays <= 0 || startDifferenceDays > 1) {
                            $scope.disableDate = true;
                        } else {
                            $scope.disableDate = false;
                        }
                    }
                }
    
                /**
                 * @description
                 * makes all the date field disable after the ending date
                 *
                 * @param  $dates - all the dates present in calendar
                 * @return  Nil
                 */
                function startDateBeforeRender($dates) {
                    if ($scope.dateRangeEnd) {
                        var activeDate = moment($scope.dateRangeEnd);
                        $dates.filter(function (date) {
                            return date.localDateValue() >= activeDate.valueOf()
                        }).forEach(function (date) {
                            date.selectable = false;
                        })
                    }
                }
    
                /**
                 * @description
                 * makes all the date disable before the start date
                 *
                 * @param  $view
                 * @param  $dates - all the dates present in calendar
                 * @return  Nil
                 */
                function endDateBeforeRender($view, $dates) {
                    if ($scope.dateRangeStart) {
                        var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute');
                        $dates.filter(function (date) {
                            return date.localDateValue() <= activeDate.valueOf()
                        }).forEach(function (date) {
                            date.selectable = false;
                        })
                    }
                }
                function createDataForPhaseDiagram() {
                    $scope.commonMsg = 'Loading...';
                    let urlQuery = "getTransformerPhaseDetailsByTransformerID?transformerId=" + $scope.selectedTransformerID.TransformerID;
                    deviceService.getAllPhaseDetails(urlQuery).then(function (apiData) {
                            if (!angular.isUndefinedOrNull(apiData) && apiData.type && apiData.TransformerPhaseDetails.length) {
                                $scope.validData = true;
                                $scope.phasorData.data[0].samples = [apiData.TransformerPhaseDetails[0].Line1Voltage];

                                $scope.phasorData.data[1].samples = [apiData.TransformerPhaseDetails[0].Line2Voltage];

                                $scope.phasorData.data[2].samples = [apiData.TransformerPhaseDetails[0].Line3Voltage];


                                $scope.phasorData.data[3].samples = [apiData.TransformerPhaseDetails[0].Line1Current];
                                $scope.phasorData.data[3].angle = (apiData.TransformerPhaseDetails[0].Line1PhaseAngle) + 0;

                                $scope.phasorData.data[4].samples = [apiData.TransformerPhaseDetails[0].Line2Current];
                                $scope.phasorData.data[4].angle = (apiData.TransformerPhaseDetails[0].Line2PhaseAngle) + 120;

                                $scope.phasorData.data[5].samples = [apiData.TransformerPhaseDetails[0].Line3Current];
                                $scope.phasorData.data[5].angle = (apiData.TransformerPhaseDetails[0].Line3PhaseAngle) + 240;

                                var wfSet = ACWF.WaveformSet.create($scope.phasorData);
                                wfSet.analyze(0);
                                var phasor = new ACWF.PhasorDiagram("phasor");
                                phasor.plotWaveformSet(wfSet, 0);
                            } else {
                                $scope.commonMsg = '';
                                $scope.validData = false;
                                swal('There is No Records Available');
                            }
                        });
                }
                $scope.clearPhaseGraph = function () {
                    var listOfCanvas = document.getElementsByTagName("canvas");
                    for(var i = 0; i < listOfCanvas.length; i++){
                        listOfCanvas[i].parentNode.removeChild(listOfCanvas[i]);
                    }
                };




                function onChangeGraphType() {
                    if ($scope.graphType === 'sineWaveGraph') {
                        $scope.showSineWave = true;
                                    var options = {};
                                    options = {
                                        series: [{name: "V1", data: v1sinedata },
                                                { name: "I1", data: i1sinedata },
                                                { name: "V2", data: v2sinedata },
                                                { name: "I2", data: i2sinedata }, 
                                                { name: "V3", data: v3sinedata },
                                                { name: "I3", data: i3sinedata }],
                                        chart: {
                                            height: 550,
                                            type: 'line',
                                            zoom: {
                                                enabled: true,
                                                type: 'x'
                                            },
                                            animations: {
                                                enabled: false,
                                            },
                                            events: {
                                                updated:(chartContext, config) =>{
                                                    createRangeArea(chartContext,0)
                                                    createRangeArea(chartContext,2)
                                                    createRangeArea(chartContext,4)
                                                }
                                            }
                                    },
                                    colors: ['#000000','#000000', '#f00000','#f00000', '#0000FF','#0000FF'],
                                    dataLabels: {
                                        enabled: false
                                    },
                                    stroke: {
                                        width: [4, 4, 4, 4, 4, 4],
                                        curve: 'straight',
                                        dashArray: [0, 7, 0, 7, 0, 7]
                                    },                                
                                    xaxis: {
                                    categories: timestamp,
                                    tickAmount: 12,
                                        labels: {
                                            show: false,
                                        }
                                    },
                                    grid: {
                                        padding: {
                                            left: 65
                                        }
                                    },
                                    annotations: {
                                        yaxis: [{
                                            y: 0,
                                            borderColor: '#000000',
                                            fillColor: '#000000'
                                        }]
                                    },
                                    yaxis: {
                                        tickAmount: 2,
                                        forceNiceScale: true,
                                        floating: false,
                                        decimalsInFloat: undefined,
                                        min:-1,
                                        max:1,ticks: {
                                            beginAtZero: true
                                        },
                                        labels: {
                                            formatter: function (val) {
                                                return angular.isUndefinedOrNull(val) ? val : val.toFixed(2)
                                            }
                                        }
                                    },
                                    tooltip: {
                                        custom: function(opts) {
                                          return '<div class="custom-phaser-tooltip"><span>'+timestamp[opts.dataPointIndex] +'</span><div class="arrow_box black_arrow_box">' +
                                            '<span> PA 1:&nbsp&nbsp' + p1sinedata[opts.dataPointIndex] + '&#176</span>' +
                                            '</div>' +
                                            '<div class="arrow_box red_arrow_box">' +
                                            '<span> PA 2:&nbsp&nbsp' + p2sinedata[opts.dataPointIndex] + '&#176</span>' +
                                            '</div>' +
                                            '<div class="arrow_box blue_arrow_box">' +
                                            '<span> PA 3:&nbsp&nbsp' + p3sinedata[opts.dataPointIndex] + '&#176</span>' +
                                            '</div></div>'
                                        }
                                    },
                                    legend: {
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        formatter: function(seriesName, opts) {
                                             var selectedLine;
                                            switch(seriesName) {
                                                case "V1":
                                                    selectedLine = '<span class="sinesolid sineblack">'+seriesName+'</span>';
                                                  break;
                                                case "I1":
                                                    selectedLine = '<span class="sinedash sineiblack">'+seriesName+'</span>';
                                                  break;
                                                case "V2":
                                                    selectedLine = '<span class="sinesolid sinered">'+seriesName+'</span>';
                                                  break;
                                                case "I2":
                                                    selectedLine = '<span class="sinedash sineired">'+seriesName+'</span>';
                                                  break;
                                                case "V3":
                                                    selectedLine = '<span class="sinesolid sineblue">'+seriesName+'</span>';
                                                  break;
                                                case "I3":
                                                    selectedLine = '<span class="sinedash sineiblue lastsinedash">'+seriesName+'</span>';
                                                  break;
                                                default:
                                                    selectedLine = '<span class="sinedash sinered">'+seriesName+'</span>';
                                              }
                                              return selectedLine;
                                               
                                            },
                                        labels: {
                                                  useSeriesColors: true
                                              },
                                         markers: {
                                                 width: 0,
                                                  height:0,
                                              }
                                        }
                                    };
                            
                                    chart = new ApexCharts(document.querySelector("#waveForm"), options);
                                    chart.render();
                                    $scope.sinewaveChartDestroy = true;
                                    //Function to fill color between two lines in svg
                                    function createRangeArea(chartContext, lineIndex) {
                                    try{
                                    let chartLineContainer = chartContext.el.querySelector("g.apexcharts-line-series.apexcharts-plot-series");
                                    let cloneElement2 = chartLineContainer.querySelectorAll("g.apexcharts-series")[lineIndex];
                                    let cloneElement = chartLineContainer.querySelectorAll("g.apexcharts-series")[lineIndex+1].cloneNode(true);
                                    cloneElement.removeAttribute("id");
                                    let newPath = cloneElement.querySelectorAll("path")[0];
                                    let oldPathElements = newPath.getAttribute("d").replace(/L/g, " L ");
                                    oldPathElements = oldPathElements.split(" ");
                                    let newPathElements = cloneElement2.querySelectorAll("path")[0].getAttribute("d").replace(/L/g, " L ");
                                    newPathElements = newPathElements.split(" ");
                                    let startingPoint = 0;
                                    oldPathElements.forEach((element, i) => {
                                    if (element==="") {
                                        oldPathElements.splice(i, 1);
                                        }
                                    });
                                    newPathElements.forEach((element, i) => {
                                    if (element==="") {
                                        newPathElements.splice(i, 1);
                                        }
                                    });
                                    if (oldPathElements[0]==="M") {
                                        startingPoint = oldPathElements[1]
                                        oldPathElements[0] = `M ${oldPathElements[1]}`;
                                        oldPathElements.splice(1, 1);
                                        oldPathElements.splice(oldPathElements.length - 1,0,`${oldPathElements[oldPathElements.length - 1]} L ${oldPathElements[oldPathElements.length - 2]}`);
                                    }
                                    if (newPathElements[0]==="M") {
                                        newPathElements[0] = `M ${newPathElements[1]}`;
                                        newPathElements.splice(1, 1);
                                    }
                                    oldPathElements[oldPathElements.length - 1] =newPathElements[newPathElements.length - 1];
                                    newPathElements.splice(1,0,`${oldPathElements[1].replace(/C/g, '')} L ${startingPoint}`);
                                    oldPathElements = oldPathElements.join(" ");
                                    newPathElements = newPathElements.join(" ");
                                    let createdPath = oldPathElements + " " + newPathElements;
                                    newPath.setAttribute("d", createdPath);
                                    newPath.setAttribute("id", "customRangeArea");
                                    newPath.setAttribute("fill", options.colors[lineIndex]);
                                    newPath.setAttribute("stroke", options.colors[lineIndex]);
                                    newPath.setAttribute("stroke-width", "0");
                                    newPath.setAttribute("fill-rule", "evenodd");
                                    newPath.setAttribute("fill-opacity", "0.5");
                                    newPath.removeAttribute("pathTo");
                                    newPath.removeAttribute("pathFrom");
                                    chartLineContainer.appendChild(cloneElement);
                                    }catch(err){
                                    console.log(err)
                                    }
                                }
                    } else {
                    
                        $scope.clearPhaseGraph();
                    }
                }
                $scope.createPhaseGraph = function () {
                    $scope.phaseBtnClickable = false;
                    $timeout(function () {
                        $scope.$apply(function () {
                            $scope.phaseBtnClickable = true;
                        });
                    }, 3000);
                    $scope.validData = false;
                    $scope.clearPhaseGraph();
                    createDataForPhaseDiagram();
                }
            }]);
})(window.angular);
