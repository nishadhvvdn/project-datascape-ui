describe('Controller: dataSCAPEController', function () {
    var state, rootScope, httpBackend;
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function ($injector, $rootScope, _$state_, $location, $templateCache, $httpBackend) {
            rootScope = $rootScope;
            state = _$state_;
            httpBackend = $httpBackend;

        });
        done();
    });
    function mockTemplate() {
        httpBackend.whenGET(/pages.*/).respond(200, {});
        httpBackend.flush();
    }
    function goTo(desiredState) {
        state.transitionTo(desiredState);
        rootScope.$apply();
    }
    describe('when url is pages/homePage.html', function () {
        beforeEach(function (done) {
            mockTemplate();
            done();
        });
        it('01.should go to the home state', (done) => {
            goTo('deviceManagement');
            expect(state.current.name).toEqual('deviceManagement');
            done();
        });
    });

});
