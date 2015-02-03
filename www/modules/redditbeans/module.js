angular.module('rbtv.redditbeans',['btford.markdown']).config(['$stateProvider', function($stateProvider){
    $stateProvider
        .state('rbtv.redditbeans', {
            url: "/redditbeans",
            views: {
                'menuContent': {
                    templateUrl: 'modules/redditbeans/templates/list.html',
                    controller: 'RedditBeansController'
                }
            }
        }).state('rbtv.redditpost', {
            url: "/redditbeans/:post",
            views: {
                'menuContent': {
                    templateUrl: 'modules/redditbeans/templates/show.html',
                    controller: 'RedditBeansShowController'
                }
            }
        });
}]);