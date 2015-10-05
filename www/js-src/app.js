(function () {
    var app = angular.module('App', [
        'Cordova',
        'Locale',
        'Route'
    ]);

    app.run(['$window', function ($window) {
            /* Prevent Safari opening links when viewing as a Mobile App */
            (function (a, b, c) {
                if (c in b && b[c]) {
                    var d, e = a.location,
                            f = /^(a|html)$/i;
                    a.addEventListener("click", function (a) {
                        d = a.target;
                        while (!f.test(d.nodeName))
                            d = d.parentNode;
                        "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
                    }, !1)
                }
            })(document, window.navigator, "standalone");

            // init Fastclick
            FastClick.attach(angular.element($window.document.body)[0]);

            var snapper = new Snap({
                element: $('.snap-content')[0],
                dragger: $('body')[0],
                disable: 'right',
                addBodyClasses: true,
                hyperextensible: true,
                resistance: 0.5,
                flickThreshold: 50,
                transitionSpeed: 0.3,
                easing: 'ease',
                maxPosition: 265,
                minPosition: -265,
                tapToClose: true,
                touchToDrag: true,
                slideIntent: 40,
                minDragDistance: 10
            });

            var appHeader = $('.app-header');
            var appContent = $('.app-content');
            var updateDimensions = function () {
                var appHeight = $(window).outerHeight();
                var headerHeight = appHeader.outerHeight();
                appContent.css({
                    top: headerHeight,
                    height: appHeight - headerHeight
                });
                console.log('updated');
            };
            $(window).resize(updateDimensions);
            updateDimensions();

            $(".scrollbar").scrollbar();
        }
    ]);

    app.controller('AppCtrl', ['$scope', 'CordovaService',
        function ($scope, CordovaService) {

            $scope.ready = false;

            // when cordova is ready
            CordovaService.ready.then(
                    function resolved(resp) {
                        $scope.ready = true;
                    },
                    function rejected(resp) {
                        throw new Error(resp);
                    }
            );
        }
    ]);
})();