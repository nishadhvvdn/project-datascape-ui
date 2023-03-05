describe('Controller: homePageCtrl', function () {
    var scope, rootScope, $dates, spy, state, filter, uibModal, refreshservice, optionDataService, dataSCAPEApp;
    var deviceService = {
        DataQualityReturns: function () {
            return new Promise(function (resolve, reject) {
                var objData = {
                    Details: [{
                        MeterLoadDetail: [{ MeterSerialNumber: 123, MeterDeviceID: 12, MeterLoad: 123, MeterStatus: 'Active' }]
                    }]
                }
                resolve(objData);
            });
        },
        Outagereport: function () {
            return new Promise(function (resolve, reject) {
                var objData = {
                    Details: [{
                        MeterLoadDetail: [{ MeterSerialNumber: 123, MeterDeviceID: 12, MeterLoad: 123, MeterStatus: 'Active' }]
                    }]
                }
                resolve(objData);
            });
        },
        DelayResponseReport: function () {
            return new Promise(function (resolve, reject) {
                var objData = {
                    Details: [{
                        MeterLoadDetail: [{ MeterSerialNumber: 123, MeterDeviceID: 12, MeterLoad: 123, MeterStatus: 'Active' }]
                    }]
                }
                resolve(objData);
            });
        },
        DeviceErrorReports: function () {
            return new Promise(function (resolve, reject) {
                var objData = {
                    Details: [{
                        MeterLoadDetail: [{ MeterSerialNumber: 123, MeterDeviceID: 12, MeterLoad: 123, MeterStatus: 'Active' }]
                    }]
                }
                resolve(objData);
            });
        },
        SolarPanelReturn: function () {
            return new Promise(function (resolve, reject) {
                var objData = {
                    Details: [{
                        MeterLoadDetail: [{ MeterSerialNumber: 123, MeterDeviceID: 12, MeterLoad: 123, MeterStatus: 'Active' }]
                    }]
                }
                resolve(objData);
            });
        },
        BatteryLifeReport: function () {
            return new Promise(function (resolve, reject) {
                var objData = {
                    Details: [{
                        MeterLoadDetail: [{ MeterSerialNumber: 123, MeterDeviceID: 12, MeterLoad: 123, MeterStatus: 'Active' }]
                    }]
                }
                resolve(objData);
            });
        },
    };
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function ($injector, $rootScope, $controller, $state,
            $filter, $timeout, $location) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            state = $injector.get('$state');
            uibModal = $injector.get('$uibModal');
            filter = $injector.get('$filter');
            refreshservice = $injector.get('refreshservice');
            optionDataService = $injector.get('optionDataService');
            dataSCAPEApp = $controller('homePageCtrl', {
                '$scope': scope,
                '$state': state,
                '$rootScope': rootScope,
                '$uibModal': uibModal,
                '$filter': filter,
                'DeviceService': deviceService,
                'refreshservice': refreshservice,
                'optionDataService': optionDataService
            });
            done();
        });
        spy = jasmine.createSpyObj(scope, ['$broadcast']);
        spy.$broadcast('start-date-changed');
        spy.$broadcast('end-date-changed');

        $dates = [{
            "utcDateValue": 1550966400000, "selectable": true, "active": false,
            "current": false, "display": "24", "future": false, "past": true
        }, {
            "utcDateValue": 1551052800000,
            "selectable": true, "active": false, "current": false, "display": "25", "future": false, "past": true
        },
        {
            "utcDateValue": 1551139200000, "selectable": true, "active": false, "current": false, "display": "26",
            "future": false, "past": true
        }, {
            "utcDateValue": 1551225600000, "selectable": true, "active": false,
            "current": false, "display": "27", "future": false, "past": true
        }, {
            "utcDateValue": 1551312000000,
            "selectable": true, "active": false, "current": false, "display": "28", "future": false, "past": true
        }, { "utcDateValue": 1551398400000, "selectable": true, "active": false, "current": false, "display": "1", "future": false, "past": false }, { "utcDateValue": 1551484800000, "selectable": true, "active": false, "current": false, "display": "2", "future": false, "past": false }, { "utcDateValue": 1551571200000, "selectable": true, "active": false, "current": false, "display": "3", "future": false, "past": false }, { "utcDateValue": 1551657600000, "selectable": true, "active": false, "current": false, "display": "4", "future": false, "past": false }, { "utcDateValue": 1551744000000, "selectable": true, "active": false, "current": false, "display": "5", "future": false, "past": false }, { "utcDateValue": 1551830400000, "selectable": true, "active": false, "current": false, "display": "6", "future": false, "past": false }, { "utcDateValue": 1551916800000, "selectable": true, "active": false, "current": false, "display": "7", "future": false, "past": false }, { "utcDateValue": 1552003200000, "selectable": true, "active": false, "current": false, "display": "8", "future": false, "past": false }, { "utcDateValue": 1552089600000, "selectable": true, "active": false, "current": false, "display": "9", "future": false, "past": false }, { "utcDateValue": 1552176000000, "selectable": true, "active": false, "current": false, "display": "10", "future": false, "past": false }, { "utcDateValue": 1552262400000, "selectable": true, "active": true, "current": true, "display": "11", "future": false, "past": false }, { "utcDateValue": 1552348800000, "selectable": true, "active": false, "current": false, "display": "12", "future": false, "past": false }, { "utcDateValue": 1552435200000, "selectable": true, "active": false, "current": false, "display": "13", "future": false, "past": false }, { "utcDateValue": 1552521600000, "selectable": true, "active": false, "current": false, "display": "14", "future": false, "past": false }, { "utcDateValue": 1552608000000, "selectable": true, "active": false, "current": false, "display": "15", "future": false, "past": false }, { "utcDateValue": 1552694400000, "selectable": true, "active": false, "current": false, "display": "16", "future": false, "past": false }, { "utcDateValue": 1552780800000, "selectable": true, "active": false, "current": false, "display": "17", "future": false, "past": false }, { "utcDateValue": 1552867200000, "selectable": true, "active": false, "current": false, "display": "18", "future": false, "past": false }, { "utcDateValue": 1552953600000, "selectable": true, "active": false, "current": false, "display": "19", "future": false, "past": false }, { "utcDateValue": 1553040000000, "selectable": true, "active": false, "current": false, "display": "20", "future": false, "past": false }, { "utcDateValue": 1553126400000, "selectable": true, "active": false, "current": false, "display": "21", "future": false, "past": false }, { "utcDateValue": 1553212800000, "selectable": true, "active": false, "current": false, "display": "22", "future": false, "past": false }, { "utcDateValue": 1553299200000, "selectable": true, "active": false, "current": false, "display": "23", "future": false, "past": false }, { "utcDateValue": 1553385600000, "selectable": true, "active": false, "current": false, "display": "24", "future": false, "past": false }, { "utcDateValue": 1553472000000, "selectable": true, "active": false, "current": false, "display": "25", "future": false, "past": false }, { "utcDateValue": 1553558400000, "selectable": true, "active": false, "current": false, "display": "26", "future": false, "past": false }, { "utcDateValue": 1553644800000, "selectable": true, "active": false, "current": false, "display": "27", "future": false, "past": false }, { "utcDateValue": 1553731200000, "selectable": true, "active": false, "current": false, "display": "28", "future": false, "past": false }, { "utcDateValue": 1553817600000, "selectable": true, "active": false, "current": false, "display": "29", "future": false, "past": false }, { "utcDateValue": 1553904000000, "selectable": true, "active": false, "current": false, "display": "30", "future": false, "past": false }, { "utcDateValue": 1553990400000, "selectable": true, "active": false, "current": false, "display": "31", "future": false, "past": false }, { "utcDateValue": 1554076800000, "selectable": true, "active": false, "current": false, "display": "1", "future": true, "past": false }, { "utcDateValue": 1554163200000, "selectable": true, "active": false, "current": false, "display": "2", "future": true, "past": false }, { "utcDateValue": 1554249600000, "selectable": true, "active": false, "current": false, "display": "3", "future": true, "past": false }, { "utcDateValue": 1554336000000, "selectable": true, "active": false, "current": false, "display": "4", "future": true, "past": false }, { "utcDateValue": 1554422400000, "selectable": true, "active": false, "current": false, "display": "5", "future": true, "past": false }, {
            "utcDateValue": 1554508800000,
            "selectable": true, "active": false, "current": false, "display": "6", "future": true, "past": false
        }];
    }); // end of inject

    it('01. startDateOnSetTime function to be called', (done) => {
        expect(scope.startDateOnSetTime).toBeDefined();
        scope.startDateOnSetTime();
        expect(spy.$broadcast).toHaveBeenCalled();
        expect(spy.$broadcast).toHaveBeenCalledWith('start-date-changed');
        done();
    });

    it('02. endDateOnSetTime function to be called', (done) => {
        expect(scope.endDateOnSetTime).toBeDefined();
        scope.endDateOnSetTime();
        expect(spy.$broadcast).toHaveBeenCalled();
        expect(spy.$broadcast).toHaveBeenCalledWith('end-date-changed');
        done();
    });
    it('03. startDateBeforeRender function to be called', (done) => {
        expect(scope.startDateBeforeRender).toBeDefined();
        scope.dateRangeEnd = '03/18/2018';
        $dates = {
            filter: function () {
                return {
                    forEach: function () {

                    }
                };
            }
        }
        scope.startDateBeforeRender($dates);
        expect(scope.dateRangeEnd).toBeTruthy();
        done();
    });
    it('04. endDateBeforeRender function to be called', (done) => {
        expect(scope.endDateBeforeRender).toBeDefined();
        scope.dateRangeStart = '03/18/2018';
        $dates = {
            filter: function () {
                return {
                    forEach: function () {

                    }
                };
            }
        }
        scope.endDateBeforeRender('', $dates);
        expect(scope.dateRangeStart).toBeTruthy();
        done();
    });
    it('05. update function to be called', (done) => {
        scope.selectedReport.name = 'Network Response Report';
        scope.update();
        expect(scope.datagridMessage).toEqual('Loading...');
        expect(scope.DataQuality).toBe(false);
        done();
    });
    it('06. update function to be called', (done) => {
        scope.selectedReport.name = 'Outages Report';
        scope.update();
        expect(scope.datagridMessage).toEqual('Loading...');
        expect(scope.OutagesReport).toBe(false);
        done();
    });
    it('07. update function to be called', (done) => {
        scope.selectedReport.name = 'Delayed Response Report';
        scope.update();
        expect(scope.DelayedResponseReport).toBe(false);
        done();
    });
    it('08. update function to be called', (done) => {
        scope.selectedReport.name = 'Device Error Report';
        scope.update();
        expect(scope.DeviceErrorReport).toBe(false);
        done();
    });
    it('09. update function to be called', (done) => {
        scope.selectedReport.name = 'Solar Report';
        scope.update();
        expect(scope.SolarReport).toBe(false);
        done();
    });
    it('10. update function to be called', (done) => {
        scope.selectedReport.name = 'Battery Report';
        scope.update();
        expect(scope.datagridMessage).toEqual('Loading...');
        expect(scope.BatteryReport).toBe(false);
        done();
    });
    it('11. update function to be called', (done) => {
        scope.selectedReport.name = 'Network Statistics Report';
        scope.update();
        expect(scope.datagridMessage).toEqual('Loading...');
        expect(scope.NetworkStatisticsReport).toBe(false);
        done();
    });
    it('12. exporterPdfFooter function to be called', (done) => {
        expect(JSON.stringify(scope.dataQualityOptions.exporterPdfFooter(12, 13)))
            .toEqual('{"text":"12 of 13","style":"footerStyle"}');
        let docDefinition = {
            styles: {
                headerStyle: {},
                footerStyle: {}
            }
        }
        expect(JSON.stringify(scope.dataQualityOptions.exporterPdfCustomFormatter(docDefinition)))
            .toEqual('{"styles":{"headerStyle":{"fontSize":22,"bold":true},"footerStyle":{"fontSize":10,"bold":true}}}');
        var grid = {
            selection: {
                on: {
                    rowSelectionChanged: function () {
                        return 0;
                    },
                    rowSelectionChangedBatch: function () {
                        return 0;
                    }
                }
            }
        }
        scope.dataQualityOptions.onRegisterApi(grid);
        expect(scope.gridApi).toBe(grid);
        done();
    });
    it('13. filterDataQuality function to be called', (done) => {
        scope.filterDataQuality(12);
        expect(scope.dataQualityOptions.data.length).toBe(0)
        done();
    });
    it('14. exporterPdfFooter function to be called of outageOptions ', (done) => {
        expect(JSON.stringify(scope.outageOptions.exporterPdfFooter(12, 13)))
            .toEqual('{"text":"12 of 13","style":"footerStyle"}');
        let docDefinition = {
            styles: {
                headerStyle: {},
                footerStyle: {}
            }
        }
        let gridApi = {
            core: {
                refresh: function () {
                    return 0;
                }
            }
        };
        expect(JSON.stringify(scope.outageOptions.exporterPdfCustomFormatter(docDefinition)))
            .toEqual('{"styles":{"headerStyle":{"fontSize":22,"bold":true},"footerStyle":{"fontSize":10,"bold":true}}}');
        scope.outageOptions.onRegisterApi(gridApi);
        expect(optionDataService.gridApi).toBe(gridApi);
        done();
    });
    it('15. filterOutageCircuit function to be called', (done) => {
        scope.filterOutageCircuit(12);
        expect(scope.outageOptions.data.length).toBe(0)
        done();
    });
    it('16. filterOutageDevice  function to be called', (done) => {
        scope.filterOutageDevice(12);
        expect(scope.outageOptions.data.length).toBe(0)
        done();
    });
    it('17. exporterPdfFooter function to be called of delayedResponseOptions ', (done) => {
        expect(JSON.stringify(scope.delayedResponseOptions.exporterPdfFooter(12, 13)))
            .toEqual('{"text":"12 of 13","style":"footerStyle"}');
        let docDefinition = {
            styles: {
                headerStyle: {},
                footerStyle: {}
            }
        }
        let gridApi = {
            core: {
                refresh: function () {
                    return 0;
                }
            }
        };
        expect(JSON.stringify(scope.delayedResponseOptions.exporterPdfCustomFormatter(docDefinition)))
            .toEqual('{"styles":{"headerStyle":{"fontSize":22,"bold":true},"footerStyle":{"fontSize":10,"bold":true}}}');
        scope.delayedResponseOptions.onRegisterApi(gridApi);
        expect(optionDataService.gridApi).toBe(gridApi);
        done();
    });
    it('18. exporterPdfFooter function to be called of deviceErrorOptions  ', (done) => {
        expect(JSON.stringify(scope.deviceErrorOptions.exporterPdfFooter(12, 13)))
            .toEqual('{"text":"12 of 13","style":"footerStyle"}');
        let docDefinition = {
            styles: {
                headerStyle: {},
                footerStyle: {}
            }
        }
        let gridApi = {
            core: {
                refresh: function () {
                    return 0;
                }
            }
        };
        expect(JSON.stringify(scope.deviceErrorOptions.exporterPdfCustomFormatter(docDefinition)))
            .toEqual('{"styles":{"headerStyle":{"fontSize":22,"bold":true},"footerStyle":{"fontSize":10,"bold":true}}}');
        scope.deviceErrorOptions.onRegisterApi(gridApi);
        expect(optionDataService.gridApi).toBe(gridApi);
        done();
    });
    it('19. exporterPdfFooter function to be called of solarOptions   ', (done) => {
        expect(JSON.stringify(scope.solarOptions.exporterPdfFooter(12, 13)))
            .toEqual('{"text":"12 of 13","style":"footerStyle"}');
        let docDefinition = {
            styles: {
                headerStyle: {},
                footerStyle: {}
            }
        }
        let gridApi = {
            core: {
                refresh: function () {
                    return 0;
                }
            }
        };
        expect(JSON.stringify(scope.solarOptions.exporterPdfCustomFormatter(docDefinition)))
            .toEqual('{"styles":{"headerStyle":{"fontSize":22,"bold":true},"footerStyle":{"fontSize":10,"bold":true}}}');
        scope.solarOptions.onRegisterApi(gridApi);
        expect(optionDataService.gridApi).toBe(gridApi);
        done();
    });
    it('20. filterSolar function to be called', (done) => {
        scope.filterSolar(12);
        expect(scope.solarOptions.data.length).toBe(0)
        done();
    });
    it('21. exporterPdfFooter function to be called of batteryOptions   ', (done) => {
        expect(JSON.stringify(scope.batteryOptions.exporterPdfFooter(12, 13)))
            .toEqual('{"text":"12 of 13","style":"footerStyle"}');
        let docDefinition = {
            styles: {
                headerStyle: {},
                footerStyle: {}
            }
        }
        let gridApi = {
            core: {
                refresh: function () {
                    return 0;
                }
            }
        };
        expect(JSON.stringify(scope.batteryOptions.exporterPdfCustomFormatter(docDefinition)))
            .toEqual('{"styles":{"headerStyle":{"fontSize":22,"bold":true},"footerStyle":{"fontSize":10,"bold":true}}}');
        scope.batteryOptions.onRegisterApi(gridApi);
        expect(optionDataService.gridApi).toBe(gridApi);
        done();
    });
    it('21. exporterPdfFooter function to be called of batteryModalOptions   ', (done) => {
        expect(JSON.stringify(scope.batteryModalOptions.exporterPdfFooter(12, 13)))
            .toEqual('{"text":"12 of 13","style":"footerStyle"}');
        let docDefinition = {
            styles: {
                headerStyle: {},
                footerStyle: {}
            }
        }
        let gridApi = {
            core: {
                refresh: function () {
                    return 0;
                }
            }
        };
        expect(JSON.stringify(scope.batteryModalOptions.exporterPdfCustomFormatter(docDefinition)))
            .toEqual('{"styles":{"headerStyle":{"fontSize":22,"bold":true},"footerStyle":{"fontSize":10,"bold":true}}}');
        scope.batteryModalOptions.onRegisterApi(gridApi);
        expect(optionDataService.gridApi).toBe(gridApi);
        done();
    });
});