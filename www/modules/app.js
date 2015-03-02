// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var getYoutubeID = function (url) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? RegExp.$1 : false;
};

angular.module('rbtv', [
    'ionic',
    'angular-data.DSCacheFactory',
    'ImgCache',
    'rbtv.main',
    'rbtv.home',
    'rbtv.schedule',
    'rbtv.stream',
    'rbtv.shows',
    'rbtv.redditbeans',
    'restangular',
    'rbtv.notification',
    'angularUtils.directives.dirDisqus',
    'xml'
])


.config(['RestangularProvider', 'ImgCacheProvider', '$urlRouterProvider', '$locationProvider', function(Restangular, ImgCacheProvider, $urlRouterProvider, $locationProvider){
    Restangular.setBaseUrl("http://localhost:5000/api/"); //TODO configurable for production

    // or more options at once
    ImgCacheProvider.setOptions({
        debug: true,
        usePersistentCache: true
    });

    ImgCacheProvider.manualInit = true;

    $urlRouterProvider.otherwise('/home');
    $locationProvider
        .hashPrefix('!');
}])
.run([
    '$ionicPlatform',
    '$rootScope',
    '$ionicHistory',
    '$http',
    'Restangular',
    'DSCacheFactory',
    'ImgCache',
    function($ionicPlatform, $rootScope, $ionicHistory, $http, Restangular, DSCacheFactory, ImgCache) {
        $ionicPlatform.ready(function() {


            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            if(ionic.Platform.isAndroid()){
                $ionicPlatform.registerBackButtonAction(function (event) {
                    if($ionicHistory.currentStateName() == "myiew"){
                        ionic.Platform.exitApp();
                        // or do nothing
                    }
                    else {
                        $ionicHistory.goBack();
                    }
                }, 100);
            }
            // TODO
            $rootScope.imageBaseURL = 'http://localhost:5000/images/show-logos/';

            DSCacheFactory('defaultCache', {
                maxAge: 900000, // Items added to this cache expire after 15 minutes.
                cacheFlushInterval: 6000000, // This cache will clear itself every hour.
                //deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
                storageMode: 'localStorage' // This cache will sync itself with `localStorage`.
            });
            $http.defaults.cache = DSCacheFactory.get('defaultCache');
            Restangular.setDefaultHttpFields({
                timeout: 5000,
                cache: DSCacheFactory.get('defaultCache')
            });
            ImgCache.$init(); // TODO does not work on devices
        });
    }]);