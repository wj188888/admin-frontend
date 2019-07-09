/**
 * Created by Administrator on 2017/1/5.
 */
app.controller('ticketGeneral',
    ["$scope","asset",
        function( $scope,asset) {
            var vm = $scope.vm = {};
            vm.findStatistic = function () {
                asset.findTicketStatistic().success(function (data) {
                    if (data.resultCode == 0) {
                        vm.statisticData = data.resultData;
                    }
                })
            }
            vm.init = function(){
                var date=new Date;
                var year=parseInt(date.getFullYear());
                var month = date.getMonth()+1+'';
                vm.nowMonth = year + '-' + month;
                vm.findStatistic();
            };
            vm.init();
        }
    ]);

