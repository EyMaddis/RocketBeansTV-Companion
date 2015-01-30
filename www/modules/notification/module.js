angular.module('rbtv.notification', ['ionic'])

    // https://github.com/driftyco/ng-cordova/blob/master/src/plugins/push.js
    .factory('$cordovaPush', ['$q', '$window', '$rootScope', '$timeout', function ($q, $window, $rootScope, $timeout) {
        return {
            onNotification: function (notification) {
                $timeout(function () {
                    $rootScope.$broadcast('$cordovaPush:notificationReceived', notification);
                });
            },

            register: function (config) {
                var q = $q.defer();
                var injector;
                if (config !== undefined && config.ecb === undefined) {
                    if (document.querySelector('[ng-app]') == null) {
                        injector = "document.body";
                    }
                    else {
                        injector = "document.querySelector('[ng-app]')";
                    }
                    config.ecb = "angular.element(" + injector + ").injector().get('$cordovaPush').onNotification";
                }

                $window.plugins.pushNotification.register(function (token) {
                    q.resolve(token);
                }, function (error) {
                    q.reject(error);
                }, config);

                return q.promise;
            },

            unregister: function (options) {
                var q = $q.defer();
                $window.plugins.pushNotification.unregister(function (result) {
                    q.resolve(result);
                }, function (error) {
                    q.reject(error);
                }, options);

                return q.promise;
            },

            // iOS only
            setBadgeNumber: function (number) {
                var q = $q.defer();
                $window.plugins.pushNotification.setApplicationIconBadgeNumber(function (result) {
                    q.resolve(result);
                }, function (error) {
                    q.reject(error);
                }, number);
                return q.promise;
            }
        };
    }])
    .run(['$rootScope', '$cordovaPush', '$http', function($rootScope, $cordovaPush, $http) {

        if(!ionic.Platform.isAndroid() || !ionic.Platform.isWebView()){
            console.log('not android, disabling notifications ');
            return;
        }

        var androidConfig = {
            "senderID": "197900036928"
        };

        document.addEventListener("deviceready", function(){
            $cordovaPush.register(androidConfig).then(function(result) {
                console.log('push configuration:', result);
                //alert('Push configured!' +result);
            }, function(err) {
                console.log('could not configure push!', err);
            });


            var subscribe = function(regid){
                var req = {
                    method: 'POST',
                    url: 'http://192.168.178.25:8000/subscribe',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        user: 'user1',
                        type: 'android',
                        token: regid
                    }
                }

                $http(req).success(function(re){
                    console.log('subscribed!', re);
                }).error(function(re){
                    console.log('could not subscribed!', re);
                });
            };

            $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
                switch(notification.event) {
                    case 'registered':
                        console.log('push notification registration ', notification);
                        if (notification.regid.length > 0 ) {
                            console.log('push registration id:', notification.regid);
                        }
                        subscribe(notification.regid);
                        break;

                    case 'message':
                        // this is the actual push notification. its format depends on the data model from the push server
                        console.log('push notification message received', notification, notification.payload);
                        break;

                    case 'error':
                        console.log('push notification error', notification);
                        break;

                    default:
                        console.log('An unknown GCM event has occurred', notification);
                        break;
                }
            });




            // WARNING: dangerous to unregister (results in loss of tokenID)
            //$cordovaPush.unregister(androidConfig).then(function(result) {
            //    // Success!
            //}, function(err) {
            //    // Error
            //})

        }, false);
    }]);