var objCacheDetails;
describe('Controller: circuitGroupingCtrl', function () {
    var rootScope, scope, state, uibModal, filter, deviceService, dataSCAPEApp, refreshservice, timeout;
    refreshservice = {
        refresh: function () {
            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
    };
    timeout = function () {
        return 0;
    };
    deviceService = {
        getAllCircuits: function () {
            return new Promise(function (resolve, reject) {
                var objData = [{
                    CircuitID: '1234',
                    NoOfTransformerAllocated: 2,
                    SubstationID: 123,
                    Address: 'xyzauauaua',
                    KVARating: 12,
                    SubstationName: 'Mysore',
                    Country: 'India',
                    State: 'karnataka',
                    City: 'Mysore',
                    ZipCode: '570101'
                }]
                resolve(objData);
            });
        }
    };
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function ($injector, $rootScope, $controller, $state, $filter, $timeout, $httpBackend) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            state = $injector.get('$state');
            uibModal = $injector.get('$uibModal');
            filter = $injector.get('$filter');

            dataSCAPEApp = $controller('circuitGroupingCtrl', {
                '$scope': scope,
                '$uibModal': uibModal,
                '$rootScope': rootScope,
                '$state': state,
                '$filter': filter,
                '$timeout': timeout,
                'DeviceService': deviceService,
                'refreshservice': refreshservice
            });
        });
        done();
    });
    it('01.', (done) => {
        expect(scope.circuitGroupingOptions.data.length).toBe(1);
        done();
    });
    it('02. exporterPdfFooter function to be called', (done) => {
        expect(JSON.stringify(rootScope.circuitGroupingOptions.exporterPdfFooter(12, 13)))
            .toEqual('{"text":"12 of 13","style":"footerStyle"}');
        let docDefinition = {
            styles: {
                headerStyle: {},
                footerStyle: {}
            }
        }
        expect(JSON.stringify(scope.circuitGroupingOptions.exporterPdfCustomFormatter(docDefinition)))
            .toEqual('{"styles":{"headerStyle":{"fontSize":22,"bold":true},"footerStyle":{"fontSize":10,"bold":true}}}');
        scope.circuitGroupingOptions.onRegisterApi('gridApi');
        expect(scope.gridApi).toBe('gridApi');
        done();
    });
    it('02. viewCircuitInfo  function to be called', (done) => {
        var row = {
            entity: 'lmnop'
        }
        objCacheDetails = {
            data: {
                selectedData: ''
            }
        }
        dataSCAPEApp.viewCircuitInfo(row);
        expect(objCacheDetails.data.selectedData).toBe('lmnop');
        done();
    });
    it('03. mapTransformerInfo  function to be called', (done) => {
        var row = {
            entity: {
                circuitId: '1234'
            }
        }
        objCacheDetails = {
            data: {
                selectedCircuit: ''
            }
        };
        spyOn(state, 'go');
        dataSCAPEApp.mapTransformerInfo(row);
        expect(objCacheDetails.data.selectedCircuit).toBe('1234');
        done();
    });
    it('04. searchCircuitGroupingGrid function to be called', (done) => {
        scope.searchCircuitGroupingGrid('1234');
        expect(scope.circuitGroupingOptions.data.length).toBe(1);
        done();
    });
    it('04. ok  function to be called', (done) => {
        scope.ok();
        done();
    });
});