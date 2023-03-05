angular.isUndefinedOrNull = function (val) {
    return angular.isUndefined(val) || val === null;
};
/**
  * @ngdoc overview
  * @name dataSCAPEApp.module:dataSCAPEApp
  *
  * @description
  * it contains route config for all reports
  * 
*/
angular.module('dataSCAPEApp', ['ui.router', 'ngAnimate', 'ngMessages',
    'ui.bootstrap', 'ui.grid', 'ngTouch', 'ui.grid.selection',
    'ui.grid.pagination', 'ui.grid.exporter',
    'ui.grid.resizeColumns', 'ncy-angular-breadcrumb',
    'ngSanitize', 'uiSwitch', 'ngFileUpload', 'ui.bootstrap.datetimepicker'])
    // configure our routes
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        var _this = this;
        _this.routeconfig = {
            billingReport: {
                url: '/billingReport',
                templateUrl: 'pages/billingReport.html',
                controller: 'billingReportCtrl',
                controllerAs: 'vm',
                ncyBreadcrumb: {
                    label: 'Billing Report',
                    skip: true
                }
            },
            dbStatistics: {
                url: '/dbStatistics',
                templateUrl: 'pages/dbStatistics.html',
                controller: 'dbStatisticsCtrl',
                controllerAs: 'vm',
                ncyBreadcrumb: {
                    label: 'Database Statistics',
                    skip: true
                }
            },
            nonTechnicalLoss: {
                url: '/nonTechnicalLoss',
                templateUrl: 'pages/nonTechnicalLoss.html',
                controller: 'nonTechnicalLossCtrl',
                controllerAs: 'vm',
                ncyBreadcrumb: {
                    label: 'Non-Technical Loss',
                    skip: true
                }
            },
            help: {
                url: '/help',
                templateUrl: 'online_Help/onlineHelpHome.html',
                controller: 'onlineHelpCtrl',
                controllerAs: 'vm',
                ncyBreadcrumb: {
                    label: 'Online Help',
                    skip: true
                }
            },
            helpHome: {
                url: '/home',
                templateUrl: 'online_Help/home.html',
                controller: 'onlineHelpCtrl',
                // controller: function ($scope) {
                //     $scope.tabChange = function () {

                //     }
                // }
            },
            inValidPage: {
                url: '/inValidPage',
                templateUrl: 'pages/inValidPage.html',
                controller: 'inValidAccessCtrl'
            },
            helpDashboard: {
                url: '/dashboard',
                templateUrl: 'online_Help/dashboard/dashboard.html',
                controller: 'onlineHelpCtrl'
            },
            helpDtc: {
                url: '/dtcInfo',
                templateUrl: 'online_Help/dashboard/dtcInfo.html',
                controller: 'onlineHelpCtrl'
            },
            helpNetworkCoverageMap: {
                url: '/networkCoverageMapDash',
                templateUrl: 'online_Help/dashboard/networkCoverageMapDash.html',
                controller: 'onlineHelpCtrl'
            },
            helpNonTechnicalLoss: {
                url: '/nonTechnicalLossMapDash',
                templateUrl: 'online_Help/dashboard/nonTechnicalLossMapDash.html',
                controller: 'onlineHelpCtrl'
            },
            helpOutageMap: {
                url: '/outageMapDash',
                templateUrl: 'online_Help/dashboard/outageMapDash.html',
                controller: 'onlineHelpCtrl'
            },
            helpSummaryMap: {
                url: '/summaryMapDash',
                templateUrl: 'online_Help/dashboard/summaryMapDash.html',
                controller: 'onlineHelpCtrl'
            },
            helpMapping: {
                url: '/Mapping',
                templateUrl: 'online_Help/mapping/mapping.html',
                controller: 'onlineHelpCtrl'
            },
            mapSummary: {
                url: '/Mapping/SummaryMap',
                templateUrl: 'online_Help/mapping/summaryMap.html',
                controller: 'onlineHelpCtrl'
            },
            mapNonTechnicalLoss: {
                url: '/Mapping/NonTechnicalLossMap',
                templateUrl: 'online_Help/mapping/nonTechnicalLossMap.html',
                controller: 'onlineHelpCtrl'
            },
            mapOutage: {
                url: '/Mapping/OutageMap',
                templateUrl: 'online_Help/mapping/outageMap.html',
                controller: 'onlineHelpCtrl'
            },
            mapNetworkCoverage: {
                url: '/Mapping/NetworkCoverage',
                templateUrl: 'online_Help/mapping/networkCoverageMap.html',
                controller: 'onlineHelpCtrl'
            },
            graph: {
                url: '/Graph',
                templateUrl: 'online_Help/graphs/graphs.html',
                controller: 'onlineHelpCtrl'
            },
            graphDtc: {
                url: '/Graphs/Dtc',
                templateUrl: 'online_Help/graphs/dtcGraphing.html',
                controller: 'onlineHelpCtrl'
            },
            graphMeter: {
                url: '/Graphs/Meter',
                templateUrl: 'online_Help/graphs/meterGraphing.html',
                controller: 'onlineHelpCtrl'
            },
            graphTransformer: {
                url: '/Graphs/Transformer',
                templateUrl: 'online_Help/graphs/transformerGraphing.html',
                controller: 'onlineHelpCtrl'
            },
            graphDeltalink: {
                url: '/Graphs/deltalink',
                templateUrl: 'online_Help/graphs/deltalinkGraphing.html',
                controller: 'onlineHelpCtrl'
            },
            graphOutage: {
                url: '/Graphs/Outage',
                templateUrl: 'online_Help/graphs/outageGraphing.html',
                controller: 'onlineHelpCtrl'
            },
            helpReports: {
                url: '/Reports',
                templateUrl: 'online_Help/reports/report.html',
                controller: 'onlineHelpCtrl'
            },
            reportsBilling: {
                url: '/Reports/Billing',
                templateUrl: 'online_Help/reports/billing.html',
                controller: 'onlineHelpCtrl'
            },
            reportNonTechnicalLoss: {
                url: '/Reports/NonTechnicalLoss',
                templateUrl: 'online_Help/reports/nonTechnicalLoss.html',
                controller: 'onlineHelpCtrl'
            },
            reportDelayedResponse: {
                url: '/Reports/DelayedResponse',
                templateUrl: 'online_Help/reports/delayedResponse.html',
                controller: 'onlineHelpCtrl'
            },
            reportBattery: {
                url: '/Reports/Battery',
                templateUrl: 'online_Help/reports/battery.html',
                controller: 'onlineHelpCtrl'
            },
            reportDatarate: {
                url: '/Reports/DataRate',
                templateUrl: 'online_Help/reports/datarate.html',
                controller: 'onlineHelpCtrl'
            },
            reportSolar: {
                url: '/Reports/Solar',
                templateUrl: 'online_Help/reports/solar.html',
                controller: 'onlineHelpCtrl'
            },
            reportCloudStatistics: {
                url: '/Reports/CloudStatistics',
                templateUrl: 'online_Help/reports/cloudStatistics.html',
                controller: 'onlineHelpCtrl'
            },
            reportNetwork: {
                url: '/Reports/NetworkResponse',
                templateUrl: 'online_Help/reports/networkResponse.html',
                controller: 'onlineHelpCtrl'
            },
            reportDeviceError: {
                url: '/Reports/DeviceError',
                templateUrl: 'online_Help/reports/deviceError.html',
                controller: 'onlineHelpCtrl'
            },
            reportNetworkStatistics: {
                url: '/Reports/NetworkStatistics',
                templateUrl: 'online_Help/reports/networkStatistics.html',
                controller: 'onlineHelpCtrl'
            },
            reportDatabaseStatistics: {
                url: '/Reports/DatabaseStatistics',
                templateUrl: 'online_Help/reports/dataBaseStatistics.html',
                controller: 'onlineHelpCtrl'
            },
            reportOutage: {
                url: '/Reports/ReportOutage',
                templateUrl: 'online_Help/reports/outages.html',
                controller: 'onlineHelpCtrl'
            },
            settings: {
                url: '/Settings',
                templateUrl: 'online_Help/Settings/userSettings.html',
                controller: 'onlineHelpCtrl'
            },
            phaserGraphs: {
                url: '/phaserGraphs',
                templateUrl: 'pages/phaserGraphs.html',
                controller: 'phaserGraphsCtrl',
                controllerAs: 'vm',
                ncyBreadcrumb: {
                    label: 'Phaser Graphs',
                    skip: true
                }
            },
            transformerDataRate: {
                url: '/transformerDataRate',
                templateUrl: 'pages/dataRate.html',
                controller: 'dataRateCtrl',
                controllerAs: 'vm'
            },

            meterDataRate: {
                url: '/meterDataRate',
                templateUrl: 'pages/meterDataRate.html',
                controller: 'meterDataRateCtrl',
                controllerAs: 'vm'
            },
            deltaLinkDataRate: {
                url: '/deltaLinkDataRate',
                templateUrl: 'pages/deltaLinkDataRate.html',
                controller: 'deltaLinkDataRateCtrl',
                controllerAs: 'vm'
            }
        }
        $urlRouterProvider.otherwise("/deviceManagement");
        $stateProvider
            //route for the Reports
            .state('solarPanelReport', {
                url: '/solarReport',
                templateUrl: 'pages/solarPanelReport.html',
                controller: 'solarPanelReportCtrl',
                controllerAs: 'vm',
                ncyBreadcrumb: {
                    label: 'Solar Panel Management',
                    skip: true
                }
            })
            .state('networkResponseReport', {
                url: '/networkResponseReport',
                templateUrl: 'pages/networkResponseReport.html',
                controller: 'networkResponseReportCtrl',
                controllerAs: 'vm',
                ncyBreadcrumb: {
                    label: 'Network Response Management',
                    skip: true
                }
            })
            .state('batteryLifeReport', {
                url: '/batteryLifeReport',
                templateUrl: 'pages/batteryLifeReport.html',
                controller: 'batteryLifeReportCtrl',
                controllerAs: 'vm',
                ncyBreadcrumb: {
                    label: 'Battery Life Management',
                    skip: true
                }
            })
            .state('deviceErrorReport', {
                url: '/deviceErrorReport',
                templateUrl: 'pages/deviceErrorReport.html',
                controller: 'deviceErrorReportCtrl',
                controllerAs: 'vm',
                ncyBreadcrumb: {
                    label: 'Device Error Management',
                    skip: true
                }
            })
            .state('delayedResponseReport', {
                url: '/delayedResponseReport',
                templateUrl: 'pages/delayedResponseReport.html',
                controller: 'delayedResponseReportCtrl',
                controllerAs: 'vm',
                ncyBreadcrumb: {
                    label: 'Delayed Response Management',
                    skip: true
                }
            })
            .state('deviceDataRateReport', {
                url: '/deviceDataRateReport',
                templateUrl: 'pages/deviceDataRateReport.html',
                controller: 'deviceDataRateReportCtrl',
                controllerAs: 'vm'
            })
            .state('deviceOutageReport', {
                url: '/outageReport',
                templateUrl: 'pages/outageReportReport.html',
                controller: 'outageReportCtrl',
                controllerAs: 'vm',
                ncyBreadcrumb: {
                    label: 'Outage Report Management',
                    skip: true
                }
            })
            .state('deviceManagement', {
                url: '/deviceManagement',
                templateUrl: 'pages/homePage.html',
                controller: 'homePageCtrl',
                controllerAs: 'vm',
                ncyBreadcrumb: {
                    label: 'Device Management',
                    skip: true
                }
            })
            .state('servers_networkStatistics', {
                url: "/servers_networkStatistics",
                templateUrl: "pages/networkStatistics.html",
                controller: 'networkStatisticsCtrl',
                controllerAs: "vm",
                ncyBreadcrumb: {
                    label: 'HyperSPROUT\u2122'
                }
            })
            .state('cellRelays_networkStatistics', {
                url: "/cellRelays_networkStatistics",
                templateUrl: "pages/networkStatisticsMeter.html",
                controller: 'networkStatisticsMeterCtrl',
                controllerAs: "vm",
                ncyBreadcrumb: {
                    label: 'Meters',
                    parent: function ($scope) {
                        return $scope.from || 'servers_networkStatistics';
                    }
                }
            })            
           
            //route for Billing Report
            .state('transformerDataRate', _this.routeconfig.transformerDataRate)
            .state('meterDataRate', _this.routeconfig.meterDataRate)
            .state('deltaLinkDataRate', _this.routeconfig.deltaLinkDataRate)

            .state('billingReport', _this.routeconfig.billingReport)
            //route for Graphs
            .state('phaserGraphs', _this.routeconfig.phaserGraphs)
            //route for Database Statistics Report
            .state('dbStatistics', _this.routeconfig.dbStatistics)
            //route for Non-Technical Loss Report
            .state('nonTechnicalLoss', _this.routeconfig.nonTechnicalLoss)
            //help screen routing
            .state('help', _this.routeconfig.help)
            .state('help.home', _this.routeconfig.helpHome)
            .state('inValidPage', _this.routeconfig.inValidPage)            
            //----------------------dashboard route-------------------------------------------
            .state('help.dashboard', _this.routeconfig.helpDashboard)
            .state('help.dtcInfo', _this.routeconfig.helpDtc)
            .state('help.networkCoverageMapDash', _this.routeconfig.helpNetworkCoverageMap)
            .state('help.nonTechnicalLossMapDash', _this.routeconfig.helpNonTechnicalLoss)
            .state('help.outageMapDash', _this.routeconfig.helpOutageMap)
            .state('help.summaryMapDash', _this.routeconfig.helpSummaryMap)
            //-----------------------------------Mapping route----------------------------
            .state('help.mapping', _this.routeconfig.helpMapping)
            .state('help.summaryMap', _this.routeconfig.mapSummary)
            .state('help.nonTechnicalLossMap', _this.routeconfig.mapNonTechnicalLoss)
            .state('help.outageMap', _this.routeconfig.mapOutage)
            .state('help.networkCoverageMap', _this.routeconfig.mapNetworkCoverage)
            //----------------------------graph route Start----------------------
            .state('help.graphing', _this.routeconfig.graph)
            .state('help.dtc', _this.routeconfig.graphDtc)
            .state('help.meter', _this.routeconfig.graphMeter)
            .state('help.transformer', _this.routeconfig.graphTransformer)
            .state('help.outage', _this.routeconfig.graphOutage)
            .state('help.deltalink', _this.routeconfig.graphDeltalink)
            //----------------------------------report route Start-------------------
            .state('help.reports', _this.routeconfig.helpReports)
            .state('help.billing', _this.routeconfig.reportsBilling)
            .state('help.nonTechnicalLoss', _this.routeconfig.reportNonTechnicalLoss)
            .state('help.delayedResponse', _this.routeconfig.reportDelayedResponse)
            .state('help.battery', _this.routeconfig.reportBattery)
            .state('help.solar', _this.routeconfig.reportSolar)
            .state('help.cloud', _this.routeconfig.reportCloudStatistics)
            .state('help.network', _this.routeconfig.reportNetwork)
            .state('help.deviceError', _this.routeconfig.reportDeviceError)
            .state('help.networkStatistics', _this.routeconfig.reportNetworkStatistics)
            .state('help.DataRate', _this.routeconfig.reportDatarate)
            .state('help.databaseStatistics', _this.routeconfig.reportDatabaseStatistics)
            .state('help.reportOutage', _this.routeconfig.reportOutage)
            .state('help.settings', _this.routeconfig.settings);
    }]);
