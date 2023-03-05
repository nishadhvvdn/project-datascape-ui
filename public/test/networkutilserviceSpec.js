var objCacheDetails;
describe('Service: NetworkUtilService', function () {
    var networkUtilService;
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function (_NetworkUtilService_, NetworkService, InitService) {
            objCacheDetails = {
                endpoints: {
                    MeterBillingUploadDisplay: {
                        data: {

                        }
                    }
                }
            }
            networkUtilService = _NetworkUtilService_;
            spyOn(InitService, 'initializeApp')
                .and.callFake(function () {
                    return new Promise(function (resolve, reject) {
                        resolve({});
                    });
                });
            spyOn(NetworkService, 'openURL')
                .and.callFake(function () {
                    return new Promise(function (resolve, reject) {
                        resolve({});
                    });
                });
            done();
        });
    });
    it('01.createHttpRequestAndGetResponse should return value', (done) => {
        expect(JSON.stringify(networkUtilService.createHttpRequestAndGetResponse('/fddffds', 'fggh')))
            .toBe('{"$$state":{"status":1,"value":false}}');
        done();
    });
    it('02.request should return value', (done) => {
        var des = {
            resolve: function () {
                return 'abc';
            }
        }
        expect(JSON.stringify(networkUtilService.request(des, 'MeterBillingUploadDisplay', 'fggh')))
            .toBe(undefined);
        done();
    });
    it('03.request should return value', (done) => {
        expect(JSON.stringify(networkUtilService.populateData('', [{}, {}], '')))
            .toBe('[{},{}]');
        done();
    });
    it('04.request should return value', (done) => {
        expect(JSON.stringify(networkUtilService.populateData('', ["abcd"], '')))
            .toBe('[null]');
        done();
    });
    it('05.request should return value', (done) => {
        expect(JSON.stringify(networkUtilService.populateData('', [[], []], '')))
            .toBe('[[],[]]');
        done();
    });
    it('06.request should return value', (done) => {
        expect(JSON.stringify(networkUtilService.populateData('', 'abcd', '')))
            .toBe('"abcd"');
        done();
    });


});

