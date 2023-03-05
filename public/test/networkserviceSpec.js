describe('Service: NetworkService', function () {
    var networkService;
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function (_NetworkService_, _$q_) {
            networkService = _NetworkService_;
            done();
        });
    });
    it('01. openURL should return value', (done) => {
        expect(JSON.stringify(networkService.openURL(null, null, null, null, 'e'))).toBe('{"$$state":{"status":0}}');
        done();
    });
});