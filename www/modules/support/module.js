angular.module('rbtv.support', [])
.config(['$stateProvider', function($stateProvider){
    console.log('imp module!')
    $stateProvider.state('rbtv.support', {
       url: "/support",
       views: {
           'menuContent': {
               templateUrl: "modules/support/templates/support.html",
               controller: "SupportController"
           }
       }
   });
}]);