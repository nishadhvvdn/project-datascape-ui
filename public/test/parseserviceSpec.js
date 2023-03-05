describe('Service: ParseService', function () {
    var parseService;
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function (_ParseService_) {
            parseService = _ParseService_;
            done();
        });
    });
    it('01.should getParsedTransformerData return value', (done) => {
        expect(JSON.stringify(parseService.getParsedTransformerData({
            HypersproutDetailsSelected: [{
                HypersproutID: 123,
                CircuitID: 234
            }],
            TransformerDetailSelected: [{
                HypersproutID: 123,
                CircuitID: 234,
                TransformerID: '',
            }]
        }, null, false))).toBe('[{"TransformerID":"","HypersproutID":"","hvlv":"HV"}]');
        done();
    });
    it('02.should getParsedMeterData  return value', (done) => {
        expect(JSON.stringify(parseService.getParsedMeterData([{
            TransformerID: ''
        }], null, false))).toBe('[{"applicationType":"","installationLocation":"","MeasurementClass":"","MeterVersion":"","ctRatioMeter":"","ptRatioMeter":"","ratedVoltageMeter":"","phasesMeter":"","ratedFrequencyMeter":"","nominalCurrent":"","maximumCurrent":"","complaintStandardMeter":"","wifiMacIdMeter":"","wifiIpAddMeter":"","wifiAccessPwdMeter":"","meterAdminPwd":"","latitudeMeter":"","longitudeMeter":"","consumerNumber":"","consumerName":"","contactNumber":"","consumerAddress":"","consumerCountry":"","consumerState":"","consumerCity":"","consumerZipcode":"","billingDate":"","billingTime":"","demandResetDate":"","ImpulseCountperKWh":"","ImpulseCountPerKVARh":"","meterMake":"","meterDisconnector":""}]');
        done();
    });
});