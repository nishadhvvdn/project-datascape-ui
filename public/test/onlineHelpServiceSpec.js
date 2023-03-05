describe('Service: onlineHelpService', function () {
    var onlineHelpService, tab;
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function (_onlineHelpService_) {
            onlineHelpService = _onlineHelpService_;
            done();
        });
        tab = "readingReport";
    });
    it('01.tabSet should return value', (done) => {
        expect(onlineHelpService.tabSet).toBeDefined();
        expect(onlineHelpService.tabSet(tab)).toEqual({ readingReport: true, exportingReport: false, filterReport: false, printReport: false, sortReport: false, setReport: false, editReport: false, addReport: false })
        done();
    });
});