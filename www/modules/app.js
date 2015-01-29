// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('rbtv', ['ionic', 'rbtv.main', 'rbtv.home', 'rbtv.schedule', 'rbtv.stream', 'rbtv.shows', 'restangular'])

.run(['$ionicPlatform', '$rootScope', '$ionicHistory', function($ionicPlatform, $rootScope, $ionicHistory) {
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
    $rootScope.imageBaseURL = 'http://192.168.178.25:3001/images/show-logos/';


  });
}])

.config(['RestangularProvider', function(Restangular){
      Restangular.setBaseUrl("http://192.168.178.25:3001/api/"); //TODO configurable for production
      Restangular.setDefaultHttpFields({
        timeout: 5000,
        cache: true
      });
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
}]);
