angular.module('rbtv.impressum', [])
.config(['$stateProvider', function($stateProvider){
    console.log('imp module!')
    $stateProvider.state('rbtv.impressum', {
       url: "/impressum",
       views: {
           'menuContent': {
               templateUrl: "modules/impressum/templates/impressum.html",
               controller: "ImpressumController"
           }
       }
   });
}]);