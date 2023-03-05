var objResponse;
describe('Service: InitService', function () {
    var initService;
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function (_InitService_, NetworkService) {
            initService = _InitService_;
            objResponse = {
                data: {}

            }
            spyOn(NetworkService, 'openURL')
                .and.callFake(function () {
                    return new Promise(function (resolve, reject) {
                        resolve({
                            data: {
                                webservicehost: "datavine"
                            }
                        });
                    });
                });
            done();
        });
    });
    it('01. initializeApp should return value', (done) => {
        expect(JSON.stringify(initService.initializeApp())).toBe('{"$$state":{"status":0}}');
        done();
    });
    it('01. loadConfigurations should return value', (done) => {
        expect(JSON.stringify(initService.loadConfigurations())).toBe('{"$$state":{"status":0}}');
        done();
    });


});
