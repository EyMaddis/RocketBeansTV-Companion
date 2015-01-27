angular.module('rbtv.shows')
    .controller('ShowDetailController', ['$scope', 'shows', '$stateParams', function($scope, shows, $stateParams) {
        shows.getByURL($stateParams.show).then(function(show){
            $scope.show =  show;
            var background = tinycolor(show.background);

            console.log('colors: ', background.isDark())

            $scope.headerColor = background.isDark()? 'light' : 'dark';


            //$scope.headerColor = comp.toHexString();
        });
    }]);