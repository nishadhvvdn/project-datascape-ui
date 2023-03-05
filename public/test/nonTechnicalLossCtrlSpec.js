describe('Controller: nonTechnicalLossCtrl', function () {
    var scope, uibModal, dataSCAPEApp, state, deviceService, timeout, filter;
    deviceService = {
        NonTechnicalLossReport: function () {
            return new Promise(function (resolve, reject) {
                var objData = {
                    Details: [{
                        meterConnected: [{ MeterSerialNumber: 123, MeterDeviceID: 12, MeterLoad: 123, MeterStatus: 'Active' }]

                    }]
                }
                resolve(objData);
            });
        }
    }
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function ($injector, $rootScope, $controller, $state, $timeout, $filter) {
            scope = $rootScope.$new();
            state = $injector.get('$state');
            uibModal = $injector.get('$uibModal');
            timeout = $injector.get('$timeout');
            filter = $injector.get('$filter');
            dataSCAPEApp = $controller('nonTechnicalLossCtrl', {
                '$scope': scope,
                '$state': state,
                '$uibModal': uibModal,
                'DeviceService': deviceService,
                '$timeout': timeout,
                '$filter': filter
            });
        });
        done();
    });
    it('01.NonTechnicalLossReport to be called', (done) => {
        expect(scope.nonTechnicalOptions.data.length).toBe(1);
        done();
    });
    it('02. exporterPdfFooter function to be called', (done) => {
        expect(JSON.stringify(scope.nonTechnicalOptions.exporterPdfFooter(12, 13)))
            .toEqual('{"text":"12 of 13","style":"footerStyle"}');
        let docDefinition = {
            styles: {
                headerStyle: {},
                footerStyle: {}
            }
        }
        expect(JSON.stringify(scope.nonTechnicalOptions.exporterPdfCustomFormatter(docDefinition)))
            .toEqual('{"styles":{"headerStyle":{"fontSize":22,"bold":true},"footerStyle":{"fontSize":10,"bold":true}}}');
        scope.nonTechnicalOptions.onRegisterApi('gridApi');
        expect(scope.gridApi).toBe('gridApi');
        done();
    });
    it('03.filterNTLcircuit  function to be called', (done) => {
        scope.filterNTLcircuit('123');
        expect(scope.nonTechnicalOptions.data.length).toBe(0);
        done();
    });
});