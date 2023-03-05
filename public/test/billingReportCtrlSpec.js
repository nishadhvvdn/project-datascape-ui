describe('Controller: billingReportCtrl', function () {
    var rootScope, res, scope, uibModal, filter, deviceService, refreshservice, dataSCAPEApp;

    refreshservice = {
        refresh: function () {
            return {
                then: function () {
                }
            }
        }
    };
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function ($injector, $rootScope, $controller,
            $filter) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            uibModal = $injector.get('$uibModal');
            filter = $injector.get('$filter');
            deviceService = $injector.get('DeviceService');
            dataSCAPEApp = $controller('billingReportCtrl', {
                '$scope': scope,
                '$rootScope': rootScope,
                '$uibModal': uibModal,
                '$filter': filter,
                'deviceService': deviceService,
                'refreshservice': refreshservice,
            });
        });
        done();
    });

    it('01. billingReportGrid  to be defined', (done) => {
        expect(scope.billingReportGrid).toBeDefined();
        expect(scope.billingReportGrid.columnDefs[0].field).toBe('Unit');
        done();
    });
    it('02. exporterPdfFooter  to be defined', (done) => {
        expect(scope.billingReportGrid).toBeDefined();
        expect(JSON.stringify(scope.billingReportGrid.exporterPdfFooter(12, 13)))
            .toEqual('{"text":"12 of 13","style":"footerStyle"}');
        let docDefinition = {
            styles: {
                headerStyle: {},
                footerStyle: {}
            }
        }
        expect(JSON.stringify(scope.billingReportGrid.exporterPdfCustomFormatter(docDefinition)))
            .toEqual('{"styles":{"headerStyle":{"fontSize":22,"bold":true},"footerStyle":{"fontSize":10,"bold":true}}}');
        scope.billingReportGrid.onRegisterApi('abcd');
        expect(scope.gridApi).toBe('abcd');
        done();
    });
    it('03. billingReportGrid.data  to be empty', (done) => {
        expect(scope.billingReportGrid.data.length).toBe(0);
        done();
    });
    it('04. openUploadBillingReport  to be defined', (done) => {
        expect(scope.openUploadBillingReport).toBeDefined();
        expect(scope.openUploadBillingReport(12)).toEqual(0);
        done();
    });
    it('05. openExportBillingReport  to be defined', (done) => {
        expect(scope.openExportBillingReport).toBeDefined();
        expect(scope.openExportBillingReport(12)).toEqual(0);
        done();
    });
    it('06. gridDatas to be defined', (done) => {
        expect(dataSCAPEApp.gridDatas).toBeDefined();
        res = {
            data: [
                {
                    Latitude: '123',
                    Longitude: '12345',

                }]
        };
        dataSCAPEApp.gridDatas(res.data)
        expect(JSON.stringify(scope.billingReportGrid.data)).toEqual(JSON.stringify(res.data));
        done();
    });
    it('07. getDate  to be defined', (done) => {
        expect(dataSCAPEApp.getDate).toBeDefined();
        expect(dataSCAPEApp.getDate()).toBe('03/22/2019');
        done();
    });


});