describe('Controller: batteryLifeCtrl', function () {
    var scope, dataSCAPEApp, reportsService;
    reportsService = {
        batteryLife: function () {
            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
    };

    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function ($rootScope,
            $controller) {
            scope = $rootScope.$new();
            dataSCAPEApp = $controller('batteryLifeCtrl', {
                '$scope': scope,
                'reportsService': reportsService
            });
        });
        done();
    });
    it('01. exporterPdfFooter function to be called', (done) => {
        expect(JSON.stringify(scope.batteryLifeOptions.exporterPdfFooter(12, 13)))
            .toEqual('{"text":"12 of 13","style":"footerStyle"}');
        let docDefinition = {
            styles: {
                headerStyle: {},
                footerStyle: {}
            }
        }
        expect(JSON.stringify(scope.batteryLifeOptions.exporterPdfCustomFormatter(docDefinition)))
            .toEqual('{"styles":{"headerStyle":{"fontSize":22,"bold":true},"footerStyle":{"fontSize":10,"bold":true}}}');
        let gridApi = {
            core: {
                refresh: function () {
                    return 0;
                }
            }
        };
        scope.batteryLifeOptions.onRegisterApi(gridApi);
        expect(scope.gridApi.core.refresh()).toEqual(0);
        done();
    });
    it('02.scope.dynamicPopover.open', (done) => {
        scope.dynamicPopover.open();
        expect(scope.dynamicPopover.isOpen).toBe(true);
        done();
    });
    it('02.scope.dynamicPopover.close', (done) => {
        scope.dynamicPopover.close();
        expect(scope.dynamicPopover.isOpen).toBe(false);
        done();
    });

});