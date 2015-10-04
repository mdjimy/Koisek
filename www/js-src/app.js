(function () {
    var app = angular.module('App', ['Cordova']);

    app.run(['$window', function ($window) {
            // init Fastclick
            FastClick.attach(angular.element($window.document.body)[0]);
        }
    ]);

    app.controller('AppCtrl', ['$document', '$scope', 'CordovaService',
        function ($document, $scope, CordovaService) {

            $scope.ready = false;

            // when cordova is ready
            CordovaService.ready.then(
                    function resolved(resp) {
                        $scope.ready = true;

                        var id = 'deviceready';
                        var parentElement = angular.element($document)[0].getElementById(id);
                        var listeningElement = parentElement.querySelector('.listening');
                        var receivedElement = parentElement.querySelector('.received');

                        listeningElement.setAttribute('style', 'display:none;');
                        receivedElement.setAttribute('style', 'display:block;');
                    },
                    function rejected(resp) {
                        throw new Error(resp);
                    }
            );
        }
    ]);
})();