angular.module('rbtv.schedule')
    .controller('ScheduleController', ['$scope', 'Restangular', '$state', function($scope, restangular, $state) {
        restangular.all('schedule').getList().then(function(rawSchedule){

            var schedule = {};

            var now = moment();
            rawSchedule.forEach(function(item){

                item.start = new Date(item.start);
                item.end = new Date(item.end);

                var relativeDay = moment(item.start).diff(now, 'days');

                var list = "Heute";
                if(relativeDay < 0) {
                    list = "Gestern";
                } else if(relativeDay > 0) {
                    list = "Morgen"
                    if(relativeDay > 1) return; //TODO
                }

                if(!schedule[list]) schedule[list] = [];
                schedule[list].push(item);

                switch (item.type){
                    case 'new':
                        item.icon = 'ion-plus-round';
                        break;
                    case 'live':
                        item.icon = 'ion-radio-waves';
                        break;
                    default:
                        item.icon = ''; //'ion-refresh';
                }

                if(moment().isBetween(item.start, item.end)){
                    item.class = 'now-live';
                }
            });

            $scope.schedule = schedule;
        });

        $scope.showDetail = function(item){
            if(!item || !item.showUrl) return;
            $state.go('rbtv.show', { show: item.showUrl });
        }
        //TODO empty and late response

    }]

);


