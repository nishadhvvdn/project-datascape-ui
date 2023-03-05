describe('Controller: openExportBillingReportCtrl', function () {
    var dataSCAPEApp, scope, uibModal, modalInstance, deviceService;
    modalInstance = {
        dismiss: function () {
            return true;
        },
        result: function () {
            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
    };
    uibModal = {
        open: function () {
            return {
                result: function () {
                    return {
                        then: function () {

                        }
                    }
                }
            }
        }
    }
    deviceService = {
        DeleteMeterBilling: function () {
            return new Promise(function (resolve, reject) {
                resolve();
            });
        },
        ViewBillingData: function () {
            var objData = {};
            return new Promise(function (resolve, reject) {
                resolve(objData);
            });
        },
        UniqueFileNameandTimeStamp: function () {
            var objData = {
                Details: [{
                    FileName: 'azx',
                    StoredTime: '3:30'
                }]
            };
            return new Promise(function (resolve, reject) {
                resolve(objData);
            });
        }

    }
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function ($injector, $rootScope, $controller) {
            scope = $rootScope.$new();
            dataSCAPEApp = $controller('openExportBillingReportCtrl', {
                '$scope': scope,
                '$modalInstance': modalInstance,
                '$uibModal': uibModal,
                'DeviceService': deviceService
            });
        });
        done();
    });
    it('01.should open1 to be called', (done) => {
        scope.open1();
        expect(scope.popup1.opened).toBe(true);
        done();
    });
    it('02.should setDate  to be called', (done) => {
        scope.setDate(1991, 03, 23);
        expect(scope.startingDate.toString()).toBe('Tue Apr 23 1991 00:00:00 GMT+0530 (India Standard Time)');
        done();
    });
    it('03.should getDayClass  to be called', (done) => {
        var data = {
            date: '1991/03/23',
            mode: 'day'
        }
        scope.events = ["fdfd", "gffg"]
        expect(dataSCAPEApp.getDayClass(data)).toBe('');

        done();
    });
    it('04.should scope.ismeridian to be false', (done) => {
        done();
        scope.toggleMode();
        expect(scope.ismeridian).toBe(false);
    });
    it('05.should scope.setFromDate to be called', (done) => {
        scope.setFromDate('12/03/1992');
        expect(scope.startingDate).toBe('12/03/1992');
        done();
    });
    it('06.should scope.setStartTime  to be called', (done) => {
        scope.setStartTime('12/03/1992');
        expect(scope.properDateTime).toBe(false);
        scope.setStartTime(null);
        expect(scope.properDateTime).toBe(true);
        done();
    });
    it('07.should scope.setToTime   to be called', (done) => {
        scope.setToTime('12/03/1992');
        expect(scope.properDateTime).toBe(false);
        scope.setToTime(null);
        expect(scope.properDateTime).toBe(true);
        done();
    });
    it('08.should scope.cancel to be called', (done) => {
        scope.cancel();
        // scope.openView('123');
        done();
    });
    it('10. exporterPdfFooter function to be called', (done) => {
        expect(JSON.stringify(scope.billingFileGrid.exporterPdfFooter(12, 13)))
            .toEqual('{"text":"12 of 13","style":"footerStyle"}');
        let docDefinition = {
            styles: {
                headerStyle: {},
                footerStyle: {}
            }
        }
        expect(JSON.stringify(scope.billingFileGrid.exporterPdfCustomFormatter(docDefinition)))
            .toEqual('{"styles":{"headerStyle":{"fontSize":22,"bold":true},"footerStyle":{"fontSize":10,"bold":true}}}');
        scope.billingFileGrid.onRegisterApi('gridApi');
        expect(scope.gridApi).toBe('gridApi');
        done();
    });
    it('11.scope.deleteFile to be called', (done) => {
        scope.deleteFile('1');
        expect(scope.deleteFile).toBeDefined();
        done();
    });
    it('12.scope.viewFile to be called', (done) => {
        var row = {
            entity: {
                Filename: 'azx',
                TimeStamp: 123
            }
        }
        scope.viewFile(row);
        expect(scope.viewFile).toBeDefined();
        done();
    });
    it('13.scope.deleteFile to be called', (done) => {
        scope.showGrid();
        expect(scope.showGrid).toBeDefined();
        expect(scope.billingFileGrid.data.length).toBe(0);
        done();
    });

});