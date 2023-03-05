describe('Controller: dbStatisticsCtrl', function () {
    var rootScope, dataSCAPEApp, scope, state, uibModal, filter, timeout, deviceService, refreshservice, http;
    var objData = {
        dbStats: ['a', 'b', 'c'],
        Errors: [{
            writeError: {
                code: '',
                errmsg: ''
            },
            errorTimestamp: ''
        }]
    }
    deviceService = {
        DBStatistics: function () {
            return new Promise(function (resolve, reject) {
                resolve(objData);
            });
        }
    };
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function ($injector, $rootScope, $controller, $uibModal, $filter,
            $timeout, $http) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            state = $injector.get('$state');
            uibModal = $injector.get('$uibModal');
            filter = $injector.get('$filter');
            timeout = $injector.get('$timeout');
            refreshservice = $injector.get('refreshservice');
            http = $injector.get('$http');
            dataSCAPEApp = $controller('dbStatisticsCtrl', {
                '$scope': scope,
                '$rootScope': rootScope,
                '$uibModal': uibModal,
                '$state': state,
                '$filter': filter,
                '$timeout': timeout,
                'DeviceService': deviceService,
                'refreshservice': refreshservice.get,
                '$http': http
            });
        });
        done();
    });
    it('01.init function to be called', (done) => {
        expect(scope.transactionsGrid.data.length).toBe(1);
        done();
    });
    it('2. exporterPdfCustomFormatter should return', (done) => {
        let docDefinition = {
            styles: {
                headerStyle: {},
                footerStyle: {}
            }
        }
        expect(JSON.stringify(scope.transactionsGrid.exporterPdfCustomFormatter(docDefinition)))
            .toEqual('{"styles":{"headerStyle":{"fontSize":22,"bold":true},"footerStyle":{"fontSize":10,"bold":true}}}');
        done();
    });
    it('3. onRegisterApi should define gridApi value', (done) => {
        let gridApi = {
            core: {
                refresh: function () {
                    return 0;
                }
            }
        };
        scope.transactionsGrid.onRegisterApi(gridApi);
        expect(scope.gridApi.core.refresh()).toEqual(0);

        done();
    });
    it('4. exporterPdfFooter should return', (done) => {
        expect(JSON.stringify(scope.transactionsGrid.exporterPdfFooter(10, 5)))
            .toBe('{"text":"10 of 5","style":"footerStyle"}');
        done();
    });
    it('5. exporterPdfCustomFormatter should return', (done) => {
        let docDefinition = {
            styles: {
                headerStyle: {},
                footerStyle: {}
            }
        }
        expect(JSON.stringify(scope.errorDetailGrid.exporterPdfCustomFormatter(docDefinition)))
            .toEqual('{"styles":{"headerStyle":{"fontSize":22,"bold":true},"footerStyle":{"fontSize":10,"bold":true}}}');
        done();
    });
    it('6. onRegisterApi should define gridApi value', (done) => {
        let gridApi = {
            core: {
                refresh: function () {
                    return 0;
                }
            }
        };
        scope.errorDetailGrid.onRegisterApi(gridApi);
        expect(scope.gridApi.core.refresh()).toEqual(0);

        done();
    });
    it('7. exporterPdfFooter should return', (done) => {
        expect(JSON.stringify(scope.errorDetailGrid.exporterPdfFooter(10, 5)))
            .toBe('{"text":"10 of 5","style":"footerStyle"}');
        done();
    });
    it('8. gdata  should be called', (done) => {
        scope.gdata();
        expect(scope.errorDetailGrid.data.length).toBe(1);
        done();
    });


});