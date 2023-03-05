describe('Service: csvparser', function () {
    var csvparser;
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function (_csvparser_) {
            csvparser = _csvparser_;
            done();
        });
    });
    it('01.validateFiles should return value as valid true', (done) => {
        let fileContent = {
            validData: 'abc'
        }
        expect(csvparser.validateFiles).toBeDefined();
        expect(csvparser.validateFiles(fileContent)).toEqual({ "valid": true, "message": 'Valid file' });
        done();
    });
    it('02.validateFiles should return value as valid false', (done) => {
        let fileContent = {
            validData: ''
        }
        expect(csvparser.validateFiles).toBeDefined();
        expect(csvparser.validateFiles(fileContent)).toEqual({ "valid": false, "message": 'Invalid file' });
        done();
    });
    it('03.validateFiles should return value as valid false', (done) => {
        let fileContent = null;
        expect(csvparser.validateFiles).toBeDefined();
        expect(csvparser.validateFiles(fileContent)).toEqual({ "valid": false, "message": 'Select a file to upload' });
        done();
    });
    it('01.parseCSVConent should return value', (done) => {
        let arrRows = [["123", "1234"], [["123", "1234"], ["123", "12345"]]];
        expect(csvparser.parseCSVConent).toBeDefined();
        expect(JSON.stringify(csvparser.parseCSVConent(arrRows))).toBe('{"123":[["123","1234"]],"1234":[["123","12345"]]}');
        done();
    });
});