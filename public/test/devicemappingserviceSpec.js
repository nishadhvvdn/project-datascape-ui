describe('Service: DeviceMappingService', function () {
    var DeviceMappingService;
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function (_DeviceMappingService_, _$q_, NetworkUtilService, InitService) {
            DeviceMappingService = _DeviceMappingService_;
            spyOn(NetworkUtilService, 'createHttpRequestAndGetResponse')
                .and.callFake(function () {
                    return new Promise(function (resolve, reject) {
                        resolve({});
                    });
                });
            return done();
        });
    });
    it('01.addTransformerToCircuit should return value', (done) => {
        expect(JSON.stringify(DeviceMappingService.addTransformerToCircuit(13, 1456)))
            .toBe('{"$$state":{"status":0}}');
        done();
    });
    it('02.removeTransformerFromCircuit should return value', (done) => {
        expect(JSON.stringify(DeviceMappingService.removeTransformerFromCircuit(13, 1456)))
            .toBe('{"$$state":{"status":0}}');
        done();
    });
    it('03.removeMeterFromTransformer should return value', (done) => {
        expect(JSON.stringify(DeviceMappingService.removeMeterFromTransformer(13, 1456)))
            .toBe('{"$$state":{"status":0}}');
        done();
    });
    it('04.addMeterToTransformer  should return value', (done) => {
        expect(JSON.stringify(DeviceMappingService.addMeterToTransformer(13, 1456)))
            .toBe('{"$$state":{"status":0}}');
        done();
    });
});