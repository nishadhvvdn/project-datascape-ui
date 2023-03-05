describe('Service: DeviceService', function () {
    var DeviceService;
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function (_DeviceService_, _$q_, NetworkUtilService, InitService) {
            DeviceService = _DeviceService_;
            spyOn(NetworkUtilService, 'createHttpRequestAndGetResponse')
                .and.callFake(function () {
                    return new Promise(function (resolve, reject) {
                        resolve({
                            details: '123',
                            type: 'sxc'
                        });
                    });
                });
        });
        done();
    });
    it("01.createCircuit should return value", (done) => {
        expect(JSON.stringify(DeviceService.createCircuit(123, 210, 12, 'Mysore', 'koramangla', 'India', 'Karnataka', 'Mysore',
            '570018', 123, 234, ''))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("02.editCircuit should return value", (done) => {
        expect(JSON.stringify(DeviceService.editCircuit(123, 210, 12, 'Mysore', 'koramangla', 'India', 'Karnataka', 'Mysore',
            '570018', 123, 234, ''))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("03.deleteCircuit should return value", (done) => {
        expect(JSON.stringify(DeviceService.deleteCircuit(123, 210, 12, 'Mysore', 'koramangla', 'India', 'Karnataka', 'Mysore',
            '570018', 123, 234, ''))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("04.getAllCircuits  should return value", (done) => {
        expect(JSON.stringify(DeviceService.getAllCircuits(123, 210, 12, 'Mysore', 'koramangla', 'India', 'Karnataka', 'Mysore',
            '570018', 123, 234, ''))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("05.createMeter should return value", (done) => {
        expect(JSON.stringify(DeviceService.createMeter(123, 210, 12, 'Mysore', 'koramangla', 'India', 'Karnataka', 'Mysore',
            '570018', 123, 234, ''))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("06.editMeter  should return value", (done) => {
        expect(JSON.stringify(DeviceService.editMeter(123, 210, 12, 'Mysore', 'koramangla', 'India', 'Karnataka', 'Mysore',
            '570018', 123, 234, ''))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("07.deleteMeters should return value", (done) => {
        expect(JSON.stringify(DeviceService.deleteMeters(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("08.getAllMeters should return value", (done) => {
        expect(JSON.stringify(DeviceService.getAllMeters(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("09.createTransformers should return value", (done) => {
        expect(JSON.stringify(DeviceService.createTransformers(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("10.getAllTransformers should return value", (done) => {
        expect(JSON.stringify(DeviceService.getAllTransformers(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("11.editTransformer should return value", (done) => {
        expect(JSON.stringify(DeviceService.editTransformer(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("12.deleteTransformers should return value", (done) => {
        expect(JSON.stringify(DeviceService.deleteTransformers(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("13.MeterBillingUploadDisplay should return value", (done) => {
        expect(JSON.stringify(DeviceService.MeterBillingUploadDisplay(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("14.DBStatistics should return value", (done) => {
        expect(JSON.stringify(DeviceService.DBStatistics(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("15.SolarPanelReturn should return value", (done) => {
        expect(JSON.stringify(DeviceService.SolarPanelReturn(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("16.DataQualityReturns  should return value", (done) => {
        expect(JSON.stringify(DeviceService.DataQualityReturns(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("17.Outagereport  should return value", (done) => {
        expect(JSON.stringify(DeviceService.Outagereport(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("18.DelayResponseReport should return value", (done) => {
        expect(JSON.stringify(DeviceService.DelayResponseReport(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("19.DeviceErrorReports  should return value", (done) => {
        expect(JSON.stringify(DeviceService.DeviceErrorReports(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("20.NetworkStatisticsMeter should return value", (done) => {
        expect(JSON.stringify(DeviceService.NetworkStatisticsMeter(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("21.BatteryLifeReport   should return value", (done) => {
        expect(JSON.stringify(DeviceService.BatteryLifeReport(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("22.UniqueFileNameandTimeStamp  should return value", (done) => {
        expect(JSON.stringify(DeviceService.UniqueFileNameandTimeStamp(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("23.DeleteMeterBilling   should return value", (done) => {
        expect(JSON.stringify(DeviceService.DeleteMeterBilling(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("24.ViewBillingData  should return value", (done) => {
        expect(JSON.stringify(DeviceService.ViewBillingData(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
    it("25.NonTechnicalLossReport   should return value", (done) => {
        expect(JSON.stringify(DeviceService.NonTechnicalLossReport(123))).toBe('{"$$state":{"status":0}}');
        done();
    });
});