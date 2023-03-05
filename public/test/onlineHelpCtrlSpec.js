describe('Controller: onlineHelpCtrl', function () {
    var scope, dataSCAPEApp, state, onlineHelpService, spy, tabValue, spyTabChange;
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function ($injector, $rootScope, $controller, $state) {
            scope = $rootScope.$new();
            state = $injector.get('$state');
            onlineHelpService = $injector.get('onlineHelpService');
            dataSCAPEApp = $controller('onlineHelpCtrl', {
                '$scope': scope,
                '$state': state,
                'onlineHelpService': onlineHelpService,
            });
            done();
        });
        spy = jasmine.createSpyObj(onlineHelpService, ['tabSet']);
        tabValue = 'readingReport';
        spy.tabSet(tabValue)
    });
    it('01.showReport value to be true', (done) => {
        expect(scope.showReport).toBe(true);
        done();
    });
    it('02.showDashboard value to be true', (done) => {
        expect(scope.showDashboard).toBe(true);
        done();
    });
    it('03.showMapping value to be true', (done) => {
        expect(scope.showMapping).toBe(true);
        done();
    });
    it('04.showGraphing value to be true', (done) => {
        expect(scope.showGraphing).toBe(true);
        done();
    });
    it('05.tabs value to be object', (done) => {
        expect(JSON.stringify(scope.tabs)).toBe(JSON.stringify({ "readingReport": true }));
        done();
    });
    it('06.readingReport value to be true', (done) => {
        expect(scope.tabs.readingReport).toBe(true);
        done();
    });
    it('07.tabChange to be defined', (done) => {
        expect(scope.tabChange).toBeDefined();
        done();
    });
    it('08.tabSet to be called', (done) => {
        scope.tabChange(tabValue);
        expect(spy.tabSet).toHaveBeenCalled();
        expect(spy.tabSet).toHaveBeenCalledWith(tabValue);
        done();
    });
    it('09.homePage to be defined', (done) => {
        expect(scope.homePage).toBeDefined();
        done();
    });
    beforeEach(function () {
        spyTabChange = jasmine.createSpyObj(scope, ['tabChange']);
        spyTabChange.tabChange(tabValue);
    });
    it('10.tabSet to be called on click of homePage', (done) => {
        scope.homePage();
        expect(spyTabChange.tabChange).toHaveBeenCalled();
        expect(spyTabChange.tabChange).toHaveBeenCalledWith(tabValue);
        done();
    });
    it('11.displayDashboard to be defined', (done) => {
        expect(scope.displayDashboard).toBeDefined();
        done();
    });
    it('12.showDashboard to be false', (done) => {
        scope.displayDashboard();
        expect(scope.showDashboard).toBe(false);
        expect(spyTabChange.tabChange).toHaveBeenCalled();
        expect(spyTabChange.tabChange).toHaveBeenCalledWith(tabValue);
        done();
    });
    it('13.displayMapping to be defined', (done) => {
        expect(scope.displayMapping).toBeDefined();
        done();
    });
    it('14.showMapping to be false', (done) => {
        scope.displayMapping();
        expect(scope.showMapping).toBe(false);
        expect(spyTabChange.tabChange).toHaveBeenCalled();
        expect(spyTabChange.tabChange).toHaveBeenCalledWith(tabValue);
        done();
    });
    it('15.displayReports to be defined', (done) => {
        expect(scope.displayReports).toBeDefined();
        done();
    });
    it('16.showReport to be false', (done) => {
        scope.displayReports();
        expect(scope.showReport).toBe(false);
        expect(spyTabChange.tabChange).toHaveBeenCalled();
        expect(spyTabChange.tabChange).toHaveBeenCalledWith(tabValue);
        done();
    });
    it('21.displaySettings to be defined', (done) => {
        expect(scope.displaySettings).toBeDefined();
        done();
    });
    it('22.showMapping to be true', (done) => {
        scope.displaySettings();
        expect(scope.showMapping).toBe(true);
        expect(spyTabChange.tabChange).toHaveBeenCalled();
        expect(spyTabChange.tabChange).toHaveBeenCalledWith(tabValue);
        done();
    });


});